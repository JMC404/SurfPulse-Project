from flask import Flask, request, jsonify, make_response
from pymongo import MongoClient
import string
from bson import ObjectId
import datetime
import requests
from functools import wraps
import jwt
import bcrypt
import arrow
import what3words
from flask_cors import CORS



start = arrow.now().floor('day')
end = arrow.now().floor('day')
forecast_start = arrow.now().floor('day') #start of current day
forecast_end = forecast_start.shift(days=7).ceil('day')
current_time = arrow.now().to('local')
formatted_time = current_time.format('HH:mm')
current_date = arrow.now().to('local').format('DD/MM/YYYY')

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['http://localhost:3000'])

app.config[''] = ''

client = MongoClient("")
db = client.SurfPulseDB
users = db.users
surfSpots = db.surf_spots
blacklist = db.blacklist
articles = db.articles

geocoder = what3words.Geocoder('')


def jwt_required(func):
    @wraps(func)
    def jwt_required_wrapper(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth = request.headers['Authorization']
            if auth.startswith('Bearer'): # this and line above check if bearer is there and gets rid of it
                token = auth.split(' ')[1]
        bl_token = blacklist.find_one({'token':token})
        if bl_token is not None:
            return make_response(jsonify({'message' : 'Token has been cancelled'}), 401)
        
        if not token:
            return jsonify( \
                {'message' : 'Token is missing'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({'message' : 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify( \
                {'message' : 'Token is invalid'}), 401
        return func(*args, **kwargs)
    
    return jwt_required_wrapper


def admin_required(func):
    @wraps(func)
    def admin_required_wrapper(*args, **kwargs):
        token = None

        auth = request.headers['Authorization']
        if auth.startswith('Bearer'): # this and line above check if bearer is there and gets rid of it
            token = auth.split(' ')[1]
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])

        if data['admin']:
            return func(*args, **kwargs)
        else:
            return make_response(jsonify({'message' : 'admin required'}), 401)
    return admin_required_wrapper





################################### Surfspot related endpoints ####################################

@app.route("/api/v1.0/surfspots/<string:id>", methods=["GET"])
def show_one_surfspot(id):
    data_to_return = []
    surfspot = surfSpots.find_one({'_id':ObjectId(id)})
    if len(id) !=24 or not all(c in string.hexdigits for c in id):
        return make_response(jsonify( {"error" : "invalid Surfspot ID"} ), 404)
    if surfspot is not None:
        response = requests.get('https://api.stormglass.io/v2/weather/point',
                                params={
                                    'lat' : surfspot['location'][1],
                                    'lng' : surfspot['location'][0],
                                    'params' : ','.join(['waveHeight','windSpeed', 'windDirection', 'swellHeight', 'swellPeriod', 'waterTemperature']),
                                    'start' : arrow.now().to('local').timestamp(),
                                    'end' : arrow.now().to('local').timestamp(),
                                    'source' : 'sg'
                                
                                },
                                headers={
                                    'Authorization' : 'd7747b10-cf63-11ee-ae7b-0242ac130002-d7747b74-cf63-11ee-ae7b-0242ac130002'
                                }
                              )
        surfspot['_id'] = str(surfspot['_id'])
        for user_weather in surfspot['user_weather']:
            user_weather['_id'] = str(user_weather['_id'])
        for review in surfspot['reviews']:
            review['_id'] = str(review['_id'])
        data_to_return.append(response.json())
        data_to_return.append(surfspot)
        return make_response( data_to_return, 200)
       
    else:
        return make_response(jsonify( {"error" : "invalid surfspot ID"} ), 404)
    
@app.route("/api/v1.0/surfspots", methods=["GET"])
def show_all_surfspots():
    page_num, page_size = 1, 12
    if request.args.get('pn'):
        page_num = int(request.args.get('pn'))
    if request.args.get("ps"):
        page_size = int(request.args.get('ps'))
    page_start = (page_size * (page_num -1))

    data_to_return = []
    for surfspot in surfSpots.find().skip(page_start).limit(page_size):
        surfspot['_id'] = str(surfspot['_id'])
        for user_weather in surfspot['user_weather']:
            user_weather['_id'] = str(user_weather['_id'])
        for review in surfspot['reviews']:
            review['_id'] = str(review['_id'])
        data_to_return.append(surfspot)

    return make_response(jsonify(data_to_return), 200)
    
@app.route('/api/v1.0/surfspots', methods=["POST"])
@jwt_required
def add_new_surfspot():

    if  "spot_name" in request.form and \
        "location" in request.form and \
        "break_type" in request.form and \
        "guide" in request.form and \
        "skill_level" in request.form and \
        "thumbnail" in request.form:


        coordinates = geocoder.convert_to_coordinates(request.form['location'])
        latitude = coordinates['coordinates']['lat']
        longitude = coordinates['coordinates']['lng']
    

        new_surfspot = {
            "spot_name" : request.form["spot_name"],
            "break_type" : request.form["break_type"],
            "location" :  [latitude, longitude],
            "guide" : request.form["guide"],
            "rating" : 0,
            "thumbnail" : request.form["thumbnail"],
            "skill_level" : request.form["skill_level"],
            "user_weather" : [],
            "reviews" : []
        }
        new_surfspot_id = surfSpots.insert_one(new_surfspot)
        new_surfspot_link = "http://localhost:5000/api/v1.0/surfspots/"+ str(new_surfspot_id.inserted_id)
        return make_response(jsonify({"url" : new_surfspot_link}), 201)
    else:
        print(request.data)
        return make_response(jsonify({"error" : "missing form data"}), 404)
    


@app.route('/api/v1.0/surfspots/<string:id>', methods=['PUT'])
@jwt_required
@admin_required
def edit_surfspot(id):
    if  "spot_name" in request.form and \
        "location" in request.form and \
        "break_type" in request.form and \
        "thumbnail" in request.form and \
        "skill_level" in request.form and \
        "guide" in request.form:
    

        coordinates = request.form["location"]
        latitude, longitude = coordinates.split(' ') #splits up the cordinates recieved from post request so they can be added to the array as two seprate parts

        result = surfSpots.update_one( {'_id' : ObjectId(id) }, {
            '$set' : { 'spot_name' : request.form['spot_name'],
                       'location' : [latitude , longitude],
                       'break_type' : request.form['break_type'],
                       'guide' : request.form['guide'],
                       'thumbnail' : request.form['thumbnail'],
                       'skill_level' : request.form['skill_level']

                     }
        })
        if result.modified_count == 1:
            edited_surfspot_link = 'http://localhost:5000/api/v1.0/surfspots/' + id
            return make_response(jsonify({'url' : edited_surfspot_link}), 200)
        else:
            return make_response(jsonify({'error' : 'Invalid surfspot ID'}), 404)
    else:
        return make_response(jsonify({'error' : 'missing form data'}), 404)
    



@app.route('/api/v1.0/surfspots/<string:id>', methods=['DELETE'])
@jwt_required
@admin_required
def delete_surfspot(id):
    result = surfSpots.delete_one({'_id' : ObjectId(id)})
    if result.deleted_count == 1:
        return make_response(jsonify({}), 204) 
    
    else: 
        return make_response(jsonify({'error' : 'Invalid surfspot ID'}), 404)
    


@app.route('/api/v1.0/surfspots/<string:id>/forecast', methods=['GET'])      #gets a surfspot's current weather 
def get_surfspot_forecast(id):
    data_to_return = []
    surfspot = surfSpots.find_one({'_id':ObjectId(id)})
    surfspot['_id'] = str(surfspot['_id'])
    response = requests.get('https://api.stormglass.io/v2/weather/point',
                                params={
                                    'lat' : surfspot['location'][1],
                                    'lng' : surfspot['location'][0],
                                    'params' : ','.join(['waveHeight','windSpeed', 'windDirection', 'swellHeight', 'swellPeriod', 'waterTemperature']),
                                    'start' : forecast_start.to('utc').timestamp(),
                                    'end' : forecast_end.to('utc').timestamp(),
                                    'source' : 'sg'
                                
                                },
                                headers={
                                    'Authorization' : 'd7747b10-cf63-11ee-ae7b-0242ac130002-d7747b74-cf63-11ee-ae7b-0242ac130002'
                                }
                              )
    data_to_return.append(response.json())
    return make_response(data_to_return)


@app.route('/api/v1.0/surfspots/<string:id>/user-weather', methods=['POST'])
@jwt_required
def add_user_weather(id):

    if  "username" in request.form and \
        "waveheight" in request.form and \
        "rating" in request.form and \
        "weather" in request.form and \
        "recommended_board" in request.form:

        new_user_weather = {
            "_id" : ObjectId(),
            "username" : request.form["username"],
            "waveheight" : request.form["waveheight"],
            "rating" : request.form["rating"],
            "weather" : request.form['weather'],
            "time_published" : formatted_time,
            "recommended_board" : request.form['recommended_board'],
            "comment" : request.form['comment']
        }
        surfSpots.update_one({ '_id' : ObjectId(id)}, {'$push' : {'user_weather' : new_user_weather}})
        new_user_weather_link = "http://localhost:5000/api/v1.0/surfspots/" + id +"/user-weather/" + str(new_user_weather['_id'])
        return make_response( jsonify({ 'url' : new_user_weather_link} ), 201)
    else:
        return make_response(jsonify({'error' : 'missing form data'}), 404)
    



@app.route('/api/v1.0/surfspots/<sid>/user-weather/<uid>', methods=['DELETE'])
@jwt_required
def delete_user_weather(sid, uid):
    result = surfSpots.update_one( {'_id' : ObjectId(sid)}, { "$pull" : {'user_weather' : {'_id' : ObjectId(uid)}}})
    if result.modified_count == 1:
        return make_response(jsonify( {}), 204)
    else:    
        return make_response(jsonify({'error' : 'Invalid review ID'}), 404)




    

@app.route('/api/v1.0/surfspots/<string:id>/reviews', methods=['POST'])
@jwt_required
def add_surfspot_review(id):

    if  "username" in request.form and \
        "rating" in request.form and \
        "review" in request.form:

        new_review = {
            "_id" : ObjectId(),
            "username" : request.form["username"],
            "rating" : request.form["rating"],
            "review" : request.form["review"],
            "date_published" : current_date,
        }
        surfSpots.update_one({ '_id' : ObjectId(id)}, {'$push' : {'reviews' : new_review}})
        new_review_link = "http://localhost:5000/api/v1.0/surfspots/" + id +"/reviews/" + str(new_review['_id'])
        return make_response( jsonify({ 'url' : new_review_link} ), 201)
    else:
        return make_response(jsonify({'error' : 'missing form data'}), 404)


@app.route('/api/v1.0/surfspots/<sid>/reviews/<rid>', methods=['DELETE'])
@jwt_required
def delete_review(sid, rid):
    result = surfSpots.update_one( {'_id' : ObjectId(sid)}, { "$pull" : {'reviews' : {'_id' : ObjectId(rid)}}})
    if result.modified_count == 1:
        return make_response(jsonify( {}), 204)
    else:    
        return make_response(jsonify({'error' : 'Invalid review ID'}), 404)
    



@app.route('/api/v1.0/surfspots/<sid>/reviews/<rid>', methods=['PUT'])
@jwt_required
def edit_review(sid, rid):
    if 'username' in request.form and \
       'rating' in request.form and \
       'review' in request.form:
        
        edited_review = {
            "reviews.$.username" : request.form["username"],
            "reviews.$.rating" : request.form["rating"],
            "reviews.$.review" : request.form["review"]
        }
        result = surfSpots.update_one({"reviews._id" : ObjectId(rid) }, {"$set" : edited_review} )

        if result.modified_count == 1:
            edit_review_url ="http://localhost:5000/api/v1.0/surfspots/" + sid + "/reviews/" + rid
            return make_response( jsonify({"url" : edit_review_url}) , 200)
        else:
            return make_response(jsonify({'erorr' : 'Invalid Review ID'}), 404)
        
    else:
        return make_response(jsonify({'error' : 'Missing form data'}), 404)


@app.route('/api/v1.0/profile/<pid>/<sid>', methods=['PUT'])
@jwt_required
def add_favourite(pid, sid):

    surfspot = surfSpots.find_one({'_id' : ObjectId(sid)})
    if len(sid) !=24 or not all(c in string.hexdigits for c in sid):
        return make_response(jsonify( {"Error" : "invalid Surfspot ID"} ), 404)
    user = users.find_one({'_id' : ObjectId(pid)})

    if len(pid) !=24 or not all(c in string.hexdigits for c in pid):
        return make_response(jsonify( {"Error" : "Invalid profile ID"} ), 404)
    
    if surfspot is None:
        return make_response(jsonify({"Error" : "Surf spot not Found"} ) , 404)

    if sid in user.get('favourites', []):
        return make_response(jsonify({"Error": "Surf spot already in favourites"}))
    surfspot['_id'] = str(surfspot['_id'])
    users.update_one(
        {'_id' : ObjectId(pid)},
        {'$push' : {"favourites": sid}}
    )
    return make_response(jsonify({'message': 'Surf spot added to favourites'}))
    
    
        

@app.route('/api/v1.0/profile/<pid>/<sid>', methods=['DELETE'])
@jwt_required   
def delete_favourite(pid, sid):

    surfspot = surfSpots.find_one({'_id' : ObjectId(sid)})
    if len(sid) !=24 or not all(c in string.hexdigits for c in sid):
        return make_response(jsonify( {"error" : "invalid Surfspot ID"} ), 404)
    user = users.find_one({'_id' : ObjectId(pid)})
    if len(pid) !=24 or not all(c in string.hexdigits for c in pid):
        return make_response(jsonify( {"error" : "Invalid profile ID"} ), 404)
    if surfspot is not None:
        surfspot['_id'] = str(surfspot['_id'])
        users.update_one(
            {'_id' : ObjectId(pid)},
            {'$pull' : {"favourites": sid}}
        )
        return make_response(jsonify({}), 204)
    else:
        return make_response(jsonify({'error': 'Invalid surfspot ID or Profile ID'}), 404)

         

    
@app.route('/api/v1.0/profile/<string:id>/favourites', methods=['GET'])
@jwt_required
def show_all_favourites(id):
    user = users.find_one({'_id': ObjectId(id)})
    if user is not  None:
        favourites = user.get('favourites', [])
        favourite_surfspots = []

        for sid in favourites:
            surfspot = surfSpots.find_one({'_id' : ObjectId(sid)})
            if surfspot:
                surfspot['_id'] = str(surfspot['_id'])
                for user_weather in surfspot['user_weather']:
                    user_weather['_id'] = str(user_weather['_id'])
                for review in surfspot['reviews']:
                    review['_id'] = str(review['_id'])
                favourite_surfspots.append(surfspot)
        return make_response(jsonify(favourite_surfspots), 200)
    else:
        return make_response(jsonify({"Error" : "profile not found"}), 404)
    




@app.route("/api/v1.0/surfspots/search", methods=['GET'])
def search_for_surfspots():
    spot_name = request.args.get('name')
    skill_level = request.args.get('skill_level')
    data_to_return = []

    search_criteria = {}
    if spot_name:
        search_criteria["spot_name"] = {"$regex": f".*{spot_name}.*", "$options": "i"}
    if skill_level:
        search_criteria['skill_level'] = skill_level

    pipeline = [{"$match": search_criteria}] if search_criteria else []
    
    
    results = surfSpots.aggregate(pipeline)
    
    
    filtered_results = [result for result in results]

    for surfspot in filtered_results:
        surfspot['_id'] = str(surfspot['_id'])
        for user_weather in surfspot['user_weather']:
            user_weather['_id'] = str(user_weather['_id'])
        for review in surfspot['reviews']:
            review['_id'] = str(review['_id'])
        data_to_return.append(surfspot)
    
    return make_response(jsonify(data_to_return), 200)


@app.route("/api/v1.0/surfspots/recommended", methods=['GET'])
def get_recommended_surfspots():
    skill_level = request.args.get('skill_level')
    data_to_return = []

    search_criteria = {}
    search_criteria["skill_level"] = {"$regex": f".*{skill_level}.*", "$options": "i"}

    pipeline = [{"$match": search_criteria}] if search_criteria else []
    pipeline.append({"$sample": {"size": 3}})
    
    results = surfSpots.aggregate(pipeline)
    
    
    filtered_results = [result for result in results]
    


    for surfspot in filtered_results:
        surfspot['_id'] = str(surfspot['_id'])
        for user_weather in surfspot['user_weather']:
            user_weather['_id'] = str(user_weather['_id'])
        for review in surfspot['reviews']:
            review['_id'] = str(review['_id'])
        data_to_return.append(surfspot)
    
    return make_response(jsonify(data_to_return), 200)







################################### Article related endpoints ####################################

@app.route("/api/v1.0/articles", methods=["GET"])
def show_all_articles():
    page_num, page_size = 1, 12
    if request.args.get('pn'):
        page_num = int(request.args.get('pn'))
    if request.args.get("ps"):
        page_size = int(request.args.get('ps'))
    page_start = (page_size * (page_num -1))

    data_to_return = []
    for article in articles.find().skip(page_start).limit(page_size):
        article['_id'] = str(article['_id'])
        for comment in article["comments"]:
            comment["_id"] = str(comment["_id"])
        data_to_return.append(article)


    return make_response(jsonify(data_to_return), 200)



@app.route("/api/v1.0/articles/<string:id>", methods=['GET'])
def show_one_article(id):
    article = articles.find_one({'_id':ObjectId(id)})
    if len(id) !=24 or not all(c in string.hexdigits for c in id):
        return make_response(jsonify( {"error" : "invalid Surfspot ID"} ), 404)
    if article is not None:
        article['_id'] = str(article['_id'])
        for comments in article['comments']:
            comments['_id'] = str(comments['_id'])
        return make_response( jsonify([article]), 200)
    else:
        return make_response(jsonify({'error': 'Invalid article ID'}), 404)
    


@app.route('/api/v1.0/articles', methods=["POST"])
@jwt_required
@admin_required
def add_new_article():
    if  "title" in request.form and \
        "content" in request.form and \
        "thumbnail" in request.form and \
        "journalist" in  request.form:

        new_article = {
            "title" : request.form["title"],
            "content" : request.form["content"],
            "thumbnail" : request.form["thumbnail"],
            "journalist" : request.form["journalist"],
            "date_published" : current_date,
            "comments" : []
        }
        new_article_id = articles.insert_one(new_article)
        new_article_link = "http://localhost:5000/api/v1.0/articles/"+ str(new_article_id.inserted_id)
        return make_response(jsonify({"url" : new_article_link}), 201)
    else:
        print(request.data)
        return make_response(jsonify({"error" : "missing form data"}), 404)



@app.route('/api/v1.0/articles/<string:id>/comments', methods=['POST'])
@jwt_required
def add_new_comment(id):
    new_comment= {
        "_id" : ObjectId(),
        "username" : request.form["username"],
        "comment" : request.form["comment"]
    }
    articles.update_one( { "_id" : ObjectId(id)}, { "$push": {"comments" : new_comment } } )
    new_comment_link ="http://localhost:5000/api/v1.0/articles/" + id + "/comments/" + str(new_comment["_id"])
    return make_response( jsonify( {"url": new_comment_link } ), 201 )




@app.route('/api/v1.0/articles/<aid>/comments/<cid>', methods=['PUT'])
@jwt_required
def edit_comment(aid, cid):
    if 'username' in request.form and \
       'comment' in request.form:
        edited_comment = {
            "comments.$.username" : request.form["username"],
            "comments.$.comment" : request.form["comment"]
        }
        
        result = articles.update_one({"comments._id" : ObjectId(cid) }, {"$set" : edited_comment} )
        if result.modified_count == 1:
            edit_comment_url ="http://localhost:5000/api/v1.0/articles/" + aid + "/comments/" + cid
            return make_response( jsonify({"url" : edit_comment_url}) , 200)
        else:
             return make_response(jsonify({'error' : 'Invalid comment ID'}), 404)
            
    else:
        return make_response(jsonify({'error' : 'Missing form data'}), 404)
    




@app.route('/api/v1.0/articles/<aid>/comments/<cid>', methods=['DELETE'])
@jwt_required
def delete_comment(aid, cid):
    result = articles.update_one( {'_id' : ObjectId(aid)}, { "$pull" : {'comments' : {'_id' : ObjectId(cid)}}})
    if result.modified_count == 1:
        return make_response(jsonify( {}), 204)
    else:    
        return make_response(jsonify({'error' : 'Invalid comment ID'}), 404)
    
     




###################################   USER RELATED ENDPOINTS #####################################

@app.route('/api/v1.0/signup', methods=['POST'])
def signup():
    if 'firstname' in request.form and \
       'lastname' in request.form and \
       'username' in request.form and \
       'email' in request.form and \
       'password' in request.form and \
       'skill_level' in request.form:
        

        new_user ={
            "firstname" : request.form["firstname"],
            "lastname" : request.form["lastname"],
            "username" : request.form["username"],
            "password" : request.form["password"].encode('utf-8'),
            "email" : request.form["email"],
            "skill_level" : request.form["skill_level"],
            "admin" : False,
            "favourites" : []
        }
        already_exists = users.find_one({'username' : new_user['username']})
        if  not already_exists:
            new_user["password"] = bcrypt.hashpw(new_user["password"], bcrypt.gensalt())
            new_user_id = users.insert_one(new_user)
            new_user_link = "http://localhost:5000/api/v1.0/profile/" + str(new_user_id.inserted_id)
            return make_response(jsonify({"url" : new_user_link}), 201)
        else:
            return make_response(jsonify({'error' : 'username is taken'}), 404)
    else:
        return make_response(jsonify({"error" : "missing form data"}), 404)

    


@app.route('/api/v1.1/login', methods=['POST'])
def login():
    
    data = request.json


    auth = {
        "username" : data['username'],
        "password" : data["password"]
    }
    
    if auth:
        user = users.find_one({'username':auth['username']})
        if user is not None:
            if bcrypt.checkpw(bytes(auth['password'], 'UTF-8'), user['password']):
                token =jwt.encode({'user' : auth['username'], \
                                   'id' : str(user['_id']),
                                   'admin' : user['admin'],
                                   'skill_level' : user['skill_level'],
                                   'exp' : datetime.datetime.utcnow() + datetime.timedelta(days=1)} ,app.config['SECRET_KEY'] )
                return  make_response(jsonify({'token' : token, 'user': jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])} ),  200)
            else:
                return make_response(jsonify({'error':'password incorrect'}), 401)
        else:
            return make_response(jsonify({'error':'No account found'}), 401)
        
    return make_response(jsonify({'error':'authentication required'}), 401)


@app.route('/api/v1.0/profile/<string:id>', methods=['GET'])
@jwt_required
def get_Profile(id):    
    user = users.find_one({'_id':ObjectId(id)},{'firstname' : 1, 'lastname' : 1, 'skill_level' : 1, 'email' : 1, 'username' : 1})
    if user is not None:
        user['_id'] = str(user['_id'])
        return make_response( jsonify( [user]), 200)
    else:
        return make_response(jsonify({'error': 'Invalid user ID'}), 404)


@app.route('/api/v1.0/profile/<string:id>', methods=['PUT'])
@jwt_required
def edit_profile(id):

    if 'firstname' in request.form and \
       'lastname' in request.form and \
       'username' in request.form and \
       'password' in request.form and \
       'email' in request.form and \
       'skill_level' in request.form:
        
        username = request.form['username']
        already_exists = users.find_one({'username' : username})
        if not already_exists:
            password = bcrypt.hashpw(request.form["password"].encode('utf-8'), bcrypt.gensalt())
            edit_result = users.update_one( \
                {"_id" : ObjectId(id)} ,
                {"$set" : {
                    "firstname" : request.form["firstname"],
                    "lastname" : request.form["lastname"],
                    "username" : request.form["username"],
                    "password" : password,
                    "email" : request.form['email'],
                    "skill_level" : request.form["skill_level"]
                }
            })
            if edit_result.matched_count == 1:
                data_to_return = {
                    "username": request.form["username"],
                    "skill_level": request.form["skill_level"]
                }
                return make_response(jsonify(data_to_return), 200)
            else:
                return make_response(jsonify({"error" : "Invalid user ID"}), 404)
        else:
            return make_response(jsonify({'error' : 'username already taken'}), 404)
    else:
        return make_response(jsonify({"error" : "missing form data"}), 404)
    

@app.route('/api/v1.0/profile/<string:id>', methods=['DELETE'])
@jwt_required
def delete_profile(id):

    token = request.headers.get('Authorization')

    delete_result = users.delete_one({'_id' : ObjectId(id)})
    if delete_result.deleted_count == 1:
        blacklist.insert_one({"token" : token})
        return make_response(jsonify({}), 204)
    else:
        return make_response(jsonify({"error" : "Invalid user ID" }), 404)
   



@app.route('/api/v1.0/logout', methods=["GET"])
@jwt_required
def logout():
    
    auth = request.headers.get('Authorization') 
    token = auth.split(' ')[1] #gets rid of bearer
    
    
    if token is not None:
        blacklist.insert_one({"token":token})
        return make_response(jsonify({'message' : 'Logout successful'}), 200)
    else:
        return make_response(jsonify({'error' 'Invalid token'}))



    





if __name__=="__main__":
    app.run(debug=True)

