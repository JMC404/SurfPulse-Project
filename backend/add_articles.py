from pymongo import MongoClient
import datetime

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.SurfPulseDB
articles = db.articles

Article_list = [
    {
        "title": "best surfer in world?",
        "date_published": "09/03/2024",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel dolor at lacus maximus tempor ac tincidunt libero. Morbi molestie consectetur. Sed at sem pulvinar, gravida risus sed, rutrum mi. Integer vitae nisi ut sapien scelerisque aliquam. Proin dignissim consectetur mi, sit amet sodales eros tincidunt ut. Sed bibendum vehicula odio vitae dapibus. Proin id augue pharetra, condimentum ligula at, ultrices libero. Vivamus vitae velit ac elit congue pulvinar id quis eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus gravida aliquam odio a commodo. Sed vel nulla elit. Fusce nec risus et lorem interdum posuere. Donec et fermentum dui, at laoreet quam. Donec posuere dapibus mi a mattis. Donec laoreet nulla in feugiat ultricies.",
        "thumbnail": "https://cms.accuweather.com/wp-content/uploads/2018/06/surf-4.jpg",
        "journalist": "mark newman"
    },
    {
        "title": "surfing adventures",
        "date_published": "10/15/2023",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut elit nec risus malesuada finibus eget vel nunc. Nam sit amet bibendum elit. Duis id vestibulum nisi, eget tincidunt neque. Quisque vel felis nec tortor fermentum vehicula vitae ac ligula. Duis pharetra arcu sed consequat ultrices. Donec congue, nulla eget consequat sagittis, metus orci vestibulum mi, et iaculis felis leo vel felis. Maecenas maximus fermentum augue, vitae eleifend ex bibendum ut. Integer nec diam felis. Donec tristique fermentum libero, eu tincidunt ligula.",
        "thumbnail": "https://cms.accuweather.com/wp-content/uploads/2018/06/surf-4.jpg",
        "journalist": "Sara Johnson"
    },
    {
        "title": "surfing techniques for beginners",
        "date_published": "05/20/2022",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim nulla eu sapien lobortis, sed placerat felis egestas. Suspendisse non est risus. Sed in condimentum tortor. Cras venenatis purus nec eros efficitur, non volutpat nulla hendrerit. Integer nec risus convallis, viverra mauris id, pharetra ex. In hac habitasse platea dictumst. Proin faucibus felis eget lacus tempus, vitae auctor est bibendum. Duis eget accumsan dui. Integer nec felis nec nulla tincidunt bibendum. Vivamus consectetur arcu ac ligula sodales, id ultrices magna sollicitudin. Nulla facilisi. In hac habitasse platea dictumst. Fusce bibendum auctor tortor id egestas. Nullam laoreet, mi in mattis tincidunt, sapien sapien vulputate justo, ut euismod nulla mauris a orci. In sollicitudin gravida risus, quis tincidunt velit mattis a. Nulla facilisi.",
        "thumbnail": "https://cms.accuweather.com/wp-content/uploads/2018/06/surf-4.jpg",
        "journalist": "John Smith"
    },
    {
        "title": "surfing competitions around the globe",
        "date_published": "02/28/2021",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet dolor id est ultricies accumsan. Mauris sed ex ut justo fringilla consequat. In ut metus leo. Fusce euismod mauris ut eros tempus, eget tristique odio pharetra. Fusce efficitur, mauris nec vestibulum ultricies, eros ligula euismod ante, sit amet vehicula elit magna vel lacus. Maecenas ut fringilla purus. Ut condimentum, enim in varius vulputate, ligula justo fermentum mi, nec finibus orci libero vitae est. Nullam et risus turpis. In volutpat sit amet quam nec hendrerit. Suspendisse congue justo tortor, nec vulputate risus facilisis quis. Pellentesque ut dapibus ex. Integer nec convallis dolor. Phasellus semper bibendum libero eget consectetur. Sed in malesuada mi. In id dictum urna.",
        "thumbnail": "https://cms.accuweather.com/wp-content/uploads/2018/06/surf-4.jpg",
        "journalist": "Emily Brown"
    },
    {
        "title": "tips for catching the perfect wave",
        "date_published": "11/10/2020",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis, ligula non viverra convallis, neque ex fermentum elit, in sagittis turpis ligula nec tortor. Nam at sapien et sem malesuada varius. Sed nec vestibulum justo. Nulla volutpat pretium mi non tincidunt. Cras condimentum dolor quis odio laoreet, nec ultrices odio consectetur. Vivamus dictum, dolor sit amet mattis dapibus, justo nisi eleifend ligula, vitae dignissim lacus orci at mi. Ut aliquam, velit quis mattis posuere, justo enim semper turpis, nec sagittis justo arcu ac ipsum. Morbi vestibulum, lacus nec feugiat faucibus, nisi elit congue ligula, eget rutrum quam lorem ac odio. Curabitur quis augue non purus efficitur cursus. Vivamus tempor arcu nec magna tristique, vitae tristique ligula tristique.",
        "thumbnail": "https://cms.accuweather.com/wp-content/uploads/2018/06/surf-4.jpg",
        "journalist": "David Wilson"
    },
    {
        "title": "interview with a professional surfer",
        "date_published": "08/05/2019",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id tortor nec ligula hendrerit auctor. Donec tempus metus nec aliquet vehicula. Nulla sed dictum velit. Vestibulum volutpat elit ut metus dapibus tristique. Vivamus fermentum est non elit mollis ultrices. Maecenas tristique sodales erat, eget eleifend turpis aliquet non. Vestibulum aliquam faucibus arcu nec egestas. Nullam id tellus euismod, consequat nunc non, commodo urna. Phasellus in bibendum magna, sed tempus velit. Morbi nec sapien eu purus varius sollicitudin eu sit amet justo. Nulla in convallis odio. Maecenas eu felis nec risus ultrices pharetra. Mauris laoreet eu elit a molestie. Cras tincidunt leo arcu, nec dignissim velit convallis sit amet. Maecenas eget ante volutpat, lacinia nibh nec, ultricies lorem. Sed at ipsum vitae velit scelerisque dictum. Donec tempus metus a mi vestibulum sollicitudin.",
        "thumbnail": "https://cms.accuweather.com/wp-content/uploads/2018/06/surf-4.jpg",
        "journalist": "Sophia Roberts"
    },
    {
        "title": "surfing equipment essentials",
        "date_published": "04/18/2018",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla turpis nec ante ultricies, non rhoncus orci sollicitudin. Nulla facilisi. Nam efficitur nunc nec eros dignissim venenatis. Ut convallis ante ex, quis eleifend neque dignissim nec. Vestibulum accumsan condimentum metus, quis mollis enim finibus vel. Integer rutrum ex sit amet sem lobortis, quis tempor ex pellentesque. In quis ex nec lectus efficitur ultrices vel eget nisi. Sed fermentum vehicula tortor, sit amet luctus magna consectetur in. Cras eu sapien nec magna auctor feugiat vel id odio. Sed auctor magna sed odio fermentum dignissim. Phasellus vel aliquet sapien, eget aliquet ex. Sed quis ex quis odio eleifend consequat. Curabitur hendrerit metus vel purus faucibus, nec condimentum mauris efficitur. Aenean ac sapien consectetur, viverra quam nec, fermentum lacus. Fusce ornare orci eget ipsum tempor, vitae facilisis felis consectetur.",
        "thumbnail": "https://cms.accuweather.com/wp-content/uploads/2018/06/surf-4.jpg",
        "journalist": "Michael Johnson"
    },
    {
        "title": "the history of surfing",
        "date_published": "01/22/2017",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Integer vitae luctus nisi. Vestibulum condimentum turpis at enim vestibulum, et faucibus ex viverra. Sed feugiat consequat felis, id fringilla eros dapibus vel. Sed id diam arcu. Fusce sollicitudin, metus ac venenatis gravida, urna nunc convallis elit, vel dictum est mauris et dui. Integer at hendrerit enim. Sed at est id sapien congue suscipit. Curabitur lacinia mi sit amet lectus consequat, et auctor sem tempor. In sed nulla eget est convallis tempus. Nullam vulputate congue fringilla. Fusce quis condimentum odio, at eleifend erat. Curabitur nec ipsum vitae velit tristique placerat. Mauris finibus fermentum tellus, sed elementum nunc vulputate eget. Vestibulum ornare euismod fermentum. In laoreet, magna ac dictum malesuada, ex tellus interdum nulla, eu sodales sem eros quis ipsum. Phasellus nec urna eu elit volutpat facilisis. In hac habitasse platea dictumst.",
        "thumbnail": "https://cms.accuweather.com/wp-content/uploads/2018/06/surf-4.jpg",
        "journalist": "Emma Davis"
    },
    {
        "title": "surfing spots in California",
        "date_published": "07/07/2016",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et nisi non enim venenatis tincidunt. Sed et tristique ipsum. Integer id ultrices leo. Fusce et elit vitae nisi viverra euismod id nec ligula. Fusce id nulla nec dui varius dapibus. Maecenas efficitur massa nec arcu volutpat, eget malesuada leo tristique. Proin euismod in lectus sed tincidunt. Nam et fermentum justo, in bibendum lectus. Integer nec nunc non lorem sagittis fermentum. Pellentesque in felis consectetur, eleifend est nec, molestie est. Curabitur laoreet eros nec justo sodales feugiat. Donec vitae risus nec ipsum viverra laoreet. Fusce sagittis nisi sed magna tempor, ac luctus neque tempor. Integer eget orci vel neque feugiat tincidunt non nec ex. Duis ultrices ligula at nisi aliquam, et varius quam scelerisque. Duis ac varius metus, eget condimentum nisi. Cras vel metus et urna auctor feugiat sit amet ac metus. Maecenas eleifend ex sit amet ex faucibus, ac venenatis purus venenatis.",
        "thumbnail": "https://cms.accuweather.com/wp-content/uploads/2018/06/surf-4.jpg",
        "journalist": "Christopher Harris"
    },
    {
        "title": "surfing safety tips",
        "date_published": "03/14/2015",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae consequat odio. In hac habitasse platea dictumst. Vivamus nec bibendum elit. Nam ut ullamcorper nibh, in bibendum velit. Duis lacinia luctus dui non lobortis. Sed eu volutpat lectus. Praesent nec sapien vel ligula maximus fringilla. Sed in est quam. Proin viverra fermentum sem, et aliquet tortor. Mauris sollicitudin, mauris nec auctor convallis, turpis sapien elementum velit, ac iaculis neque purus a eros. Aenean feugiat tellus et turpis lacinia, eget tempus sapien tempor. Fusce dapibus sodales sapien eget vehicula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec et tellus arcu. Donec rhoncus tortor odio, nec auctor metus tempor id. Duis facilisis nunc ac ante posuere bibendum. Fusce vitae est lorem.",
        "thumbnail": "https://cms.accuweather.com/wp-content/uploads/2018/06/surf-4.jpg",
        "journalist": "Jessica Miller"
    }
]


for new_article in Article_list:
    articles.insert_one(new_article)