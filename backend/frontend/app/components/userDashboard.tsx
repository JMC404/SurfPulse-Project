
import { cookies } from "next/headers";
import Link from "next/link";



async function getFavouriteSurfspots() {

    const userId = cookies().get('id')?.value
    const jwtToken = cookies().get('token')?.value


    const res = await fetch(`http://localhost:5000/api/v1.0/profile/${userId}/favourites`, {
        method: 'GET',
        cache: 'no-store',
        headers: {Authorization : `Bearer ${jwtToken}`}
    });
    const data = await res.json();
    return data as any[];
    
    
}


async function getRecommendedSurfspots() {

    const skill_level = cookies().get('skill_level')?.value
    const jwtToken = cookies().get('token')?.value

    const res = await fetch(`http://localhost:5000/api/v1.0/surfspots/recommended?skill_level=${skill_level}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {Authorization : `Bearer ${jwtToken}`}
    })
    const data = await res.json()
    return data as any[];
    
}


async function getArticles() {
    const res = await fetch('http://localhost:5000/api/v1.0/articles?pn=1&ps=6', {
        method: 'get',
        cache: 'no-store'

    });
    const data = await res.json();
    return data as any[];
    
}


function ArticleCard( {article}: any) {
    const { _id, title, thumbnail, journalist, date_published } = article || {};
    
    return (
        <Link href={`/articles/${_id}`}>
        <article className="max-w-sm mx-auto bg-neutral-500 text-black rounded-md shadow-md m-2 flex-none hover:bg-neutral-700">
            <img src={thumbnail} alt={title} className="mb-4 w-full h-52 object-cover object-center rounded-t-md" />
            <div className="p-4">
                <h1 className="text-xl font-bold">{title}</h1>
                <p className="text-sm text-black">By: {journalist} - {date_published}</p>
            </div>
        </article>
        </Link>
    );
}


function SurfspotCard( {surfspot}: any ) {
    const { _id, spot_name, thumbnail, break_type, rating} = surfspot || {};

    return (
     <Link href={`/surfspots/${_id}`}>
        <article className='max-w-sm mx-auto bg-neutral-500 text-black rounded-md shadow-md m-2 flex-none hover:bg-neutral-700'>
                <img  src={thumbnail} alt={spot_name} className='mb-4 w-full h-52 object-cover object-center rounded' /> 
                <h2 className='text-center font-bold'>{spot_name}</h2>
                <h3 className='text-center'>{break_type}</h3>
                <p className='text-center'>{rating}</p>
        </article>
     </Link> 
    );
}




 const UserDashboard = async () => {

    const surfspots = await getFavouriteSurfspots()

    const recommended_surfspots = await getRecommendedSurfspots()

    const articles = await getArticles()


    return(

        
        <>
            
            <div className='text-center  text-black'>
                <h1 className="text-xl text-center my-4">Welcome to surf pulse for all your surf report needs</h1>
                <h1 className="text-xl">Your favourite surf spots</h1>
                <div className='grid grid-cols-3 gap-4 my-5'>
                    {surfspots?.map((surfspot) => {
                        return <SurfspotCard key={surfspot._id} surfspot={surfspot} />;
                    })}
                </div>
            </div>

            <div className='text-center  text-black'>
                <h1 className="text-xl">These surf spots were recommended to you based on your skill level</h1>
                <div className='grid grid-cols-3 gap-4 my-5'>
                    {recommended_surfspots?.map((surfspot) => {
                        return <SurfspotCard key={surfspot._id} surfspot={surfspot} />;
                    })}
                </div>
            </div>


            <div className="my-10" id="articles">
                    <h1 className="text-center text-xl my-5">Some articles you may like</h1>
                    <div className='grid grid-cols-3 gap-2 my-5'>
                        {articles?.map((article) => {
                            return <ArticleCard key={article._id} article={article} />;
                        })}
                    </div>
            </div>
        </>
    );

    

}


export default UserDashboard