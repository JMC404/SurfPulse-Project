from pymongo import MongoClient


client = MongoClient("mongodb://127.0.0.1:27017")
db = client.SurfPulseDB
surfSpots = db.surf_spots

SurfSpot_list = [
  {
    "name": "Bundoran",
    "break_type": "beach",
    "location": ["54.4789", "-8.2771"],
    "thumbnail": "https://en.wikipedia.org/wiki/Bundoran#/media/File:Bundoran_Strand_View_2007-08-17.jpg",
    "rating": 4,
    "guide": "Bundoran is a popular surfing destination in County Donegal, known for its consistent waves and vibrant surf culture. The town offers a variety of beach breaks suitable for surfers of all skill levels. Besides surfing, visitors can enjoy stunning coastal scenery, hiking trails, and local amenities.",
    "user_weather": []
  },
  {
    "name": "Lahinch",
    "break_type": "point_break",
    "location": ["52.9387", "-9.3492"],
    "thumbnail": "https://en.wikipedia.org/wiki/Lahinch#/media/File:Lahinch_Surfer_2006_08_14.jpg",
    "rating": 4,
    "guide": "Lahinch is a charming seaside village located in County Clare, renowned for its world-class surf conditions and lively atmosphere. The main attraction is the famous Aileen's Wave, a powerful reef break that attracts experienced surfers from around the globe. In addition to surfing, Lahinch offers sandy beaches, scenic cliffs, and a range of accommodations and dining options.",
    "user_weather": []
  },
  {
    "name": "Spanish Point",
    "break_type": "beach",
    "location": ["52.8603", "-9.4358"],
    "thumbnail": "https://en.wikipedia.org/wiki/Spanish_Point#/media/File:Spanish_Point_Beach_and_Lodge_-_geograph.org.uk_-_716016.jpg",
    "rating": 3,
    "guide": "Spanish Point is a picturesque coastal area in County Clare, characterized by its sandy beaches and consistent waves. While the surf breaks may not be as challenging as other spots, Spanish Point is ideal for beginners and intermediate surfers looking to enjoy the beauty of the Wild Atlantic Way. Visitors can also explore nearby attractions such as the Cliffs of Moher and the Burren National Park.",
    "user_weather": []
  },
  {
    "name": "Mullaghmore",
    "break_type": "reef",
    "location": ["54.4586", "-8.4515"],
    "thumbnail": "https://en.wikipedia.org/wiki/Mullaghmore#/media/File:Mullaghmore_1.jpg",
    "rating": 5,
    "guide": "Mullaghmore is a world-renowned big wave spot located in County Sligo, famous for its massive swells and challenging conditions. Surrounded by stunning coastal cliffs, Mullaghmore offers an adrenaline-fueled experience for experienced surfers seeking the ultimate thrill. It's important to note that Mullaghmore is best suited for advanced surfers due to its powerful waves and rocky coastline.",
    "user_weather": []
  },
  {
    "name": "Easkey",
    "break_type": "reef",
    "location": ["54.3144", "-8.9687"],
    "thumbnail": "https://en.wikipedia.org/wiki/Easkey#/media/File:Easkey_Wave.jpg",
    "rating": 4,
    "guide": "Easkey is a charming village located in County Sligo, renowned for its consistent surf breaks and laid-back atmosphere. The area offers a mix of reef and beach breaks suitable for surfers of all levels. Easkey is also known for its rich maritime heritage and scenic beauty, making it a popular destination for surfers and nature enthusiasts alike.",
    "user_weather": []
  },
  {
    "name": "Achill Island",
    "break_type": "beach",
    "location": ["53.9641", "-10.0495"],
    "thumbnail": "https://en.wikipedia.org/wiki/Achill_Island#/media/File:AchillIsland2.jpg",
    "rating": 3,
    "guide": "Achill Island is the largest island off the coast of Ireland, located in County Mayo. Known for its rugged landscapes and pristine beaches, Achill offers a variety of surf breaks suitable for all skill levels. In addition to surfing, visitors can explore ancient ruins, hike scenic trails, and experience traditional Irish culture.",
    "user_weather": []
  },
  {
    "name": "Rossnowlagh",
    "break_type": "beach",
    "location": ["54.5572", "-8.2071"],
    "thumbnail": "https://en.wikipedia.org/wiki/Rossnowlagh#/media/File:Rossnowlagh_Beach_-_geograph.org.uk_-_737177.jpg",
    "rating": 3,
    "guide": "Rossnowlagh is a picturesque beach town located in County Donegal, known for its long sandy beach and consistent surf breaks. With its mellow waves and welcoming atmosphere, Rossnowlagh is popular among surfers of all ages and abilities. Visitors can also enjoy beachside cafes, scenic walks, and stunning sunsets.",
    "user_weather": []
  },
  {
    "name": "Tramore",
    "break_type": "beach",
    "location": ["52.1631", "-7.1526"],
    "thumbnail": "https://en.wikipedia.org/wiki/Tramore#/media/File:Tramore_beach.jpg",
    "rating": 3,
    "guide": "Tramore is a vibrant seaside resort town located in County Waterford, renowned for its sandy beaches and family-friendly atmosphere. The main surf break, known as Tramore Strand, offers consistent waves suitable for all levels of surfers. In addition to surfing, visitors can enjoy amusement parks, water sports, and scenic coastal walks.",
    "user_weather": []
  },
  {
    "name": "Fanore",
    "break_type": "beach",
    "location": ["53.1226", "-9.2823"],
    "thumbnail": "https://en.wikipedia.org/wiki/Fanore#/media/File:Fanore_-_panoramio.jpg",
    "rating": 3,
    "guide": "Fanore is a charming coastal village located in County Clare, nestled between the Burren region and the Atlantic Ocean. The area offers a picturesque beach break with consistent waves suitable for all skill levels. Fanore is also known for its stunning natural scenery, including limestone cliffs, sandy beaches, and scenic walking trails.",
    "user_weather": []
  },
  {
    "name": "Ballybunion",
    "break_type": "beach",
    "location": ["52.5129", "-9.6794"],
    "thumbnail": "https://en.wikipedia.org/wiki/Ballybunion#/media/File:Ballybunion_Strand_Beach.jpg",
    "rating": 3,
    "guide": "Ballybunion is a seaside town located in County Kerry, renowned for its sandy beaches and historic castle ruins. The main surf break, known as Ballybunion Beach, offers consistent waves suitable for surfers of all levels. In addition to surfing, visitors can explore scenic coastal walks, play golf at world-class courses, and discover the town's rich history and culture.",
    "user_weather": []
  },
  {
    "name": "Inchydoney",
    "break_type": "beach",
    "location": ["51.5733", "-8.9465"],
    "thumbnail": "https://en.wikipedia.org/wiki/Inchydoney#/media/File:Inchydoney_Beach.jpg",
    "rating": 4,
    "guide": "Inchydoney is a stunning coastal area located in County Cork, known for its pristine beaches and excellent surf conditions. The main surf break, Inchydoney Beach, offers consistent waves suitable for surfers of all skill levels. Visitors can also enjoy scenic coastal walks, water sports, and relaxing spa treatments at the nearby Inchydoney Island Lodge & Spa.",
    "user_weather": []
  },
  {
    "name": "Strandhill",
    "break_type": "beach",
    "location": ["54.2695", "-8.5984"],
    "thumbnail": "https://en.wikipedia.org/wiki/Strandhill#/media/File:Strandhill_Beach_-_geograph.org.uk_-_1479862.jpg",
    "rating": 4,
    "guide": "Strandhill is a vibrant seaside village located in County Sligo, renowned for its stunning beaches and world-class surf breaks. The area offers a variety of breaks suitable for surfers of all levels, from beginners to experienced riders. Strandhill is also known for its lively atmosphere, with a range of cafes, restaurants, and surf shops lining the streets.",
    "user_weather": []
  },
  {
    "name": "Easky",
    "break_type": "point_break",
    "location": ["54.3049", "-9.1581"],
    "thumbnail": "https://en.wikipedia.org/wiki/Easky#/media/File:Easky_Wave.jpg",
    "rating": 4,
    "guide": "Easky is a small coastal village located in County Sligo, renowned for its world-class surf breaks and stunning natural scenery. The main attraction is Easky Left, a powerful left-hand point break that attracts experienced surfers from around the world. In addition to surfing, visitors can explore the nearby Easky Castle ruins, enjoy scenic coastal walks, and experience traditional Irish hospitality.",
    "user_weather": []
  },
  {
    "name": "Tullan Strand",
    "break_type": "beach",
    "location": ["54.4872", "-8.2632"],
    "thumbnail": "https://en.wikipedia.org/wiki/Bundoran#/media/File:Tullan_Strand_-_geograph.org.uk_-_1400823.jpg",
    "rating": 3,
    "guide": "Tullan Strand is a beautiful sandy beach located near the town of Bundoran in County Donegal. The beach offers a variety of surf breaks suitable for all levels of surfers, from beginners to advanced riders. Tullan Strand is known for its consistent waves and stunning coastal scenery, making it a popular destination for surfers and beachgoers alike.",
    "user_weather": []
  },
  {
    "name": "Doughmore Bay",
    "break_type": "beach",
    "location": ["52.7575", "-9.5115"],
    "thumbnail": "https://en.wikipedia.org/wiki/Doonbeg#/media/File:Doughmore_Bay_from_Clubhouse_-_geograph.org.uk_-_1306956.jpg",
    "rating": 3,
    "guide": "Doughmore Bay is a picturesque beach located near the village of Doonbeg in County Clare. The beach offers a consistent beach break with waves suitable for surfers of all levels. Doughmore Bay is known for its pristine sandy shores, dunes, and scenic views of the Atlantic Ocean. Visitors can enjoy surfing, beachcombing, and relaxing walks along the shore.",
    "user_weather": []
  }
]


for new_surfSpot in SurfSpot_list:
    surfSpots.insert_one(new_surfSpot)