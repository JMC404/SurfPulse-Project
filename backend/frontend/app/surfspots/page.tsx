

import Link from 'next/link'
import { IsLoggedIn } from '../components/auth';








async function getSurfspots(searchParams : any) {

    const pageNum = searchParams['page'] ?? 1
    
    const res = await fetch(`http://127.0.0.1:5000/api/v1.0/surfspots?pn=${pageNum}`, {
        method: 'GET',
        cache: 'no-store'
    });
    const data = await res.json();
    return data as any[];
    
    
}


export default async function surfspotsPage({searchParams}: {
    searchParams: { [key: string]: string | string[] | undefined}
}) {
    console.log(searchParams)
    
    const surfspots = await getSurfspots(searchParams);
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
        return(
            <>
        <div className='text-center'>
            <h1 className='text-xl'>Surf Spots</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {surfspots?.map((surfspot) => {
                    return <SurfspotCard key={surfspot._id} surfspot={surfspot} />;
                })}
            </div>
        </div>
        <div className='text-center my-10'>
            <Link href={'/surfspots/add-surfspot'}>
            {  await IsLoggedIn()  && <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 outline px-4 rounded-full transition duration-300">
                Add surf spot
                </button>
            }

            </Link>
        </div>
        <div>
        <div className="flex justify-center">
          <div className="flex space-x-4">
            <Link href={`/surfspots?page=${page > 1 ? page -1 : 1}`}>
                <button className="bg-white hover:bg-blue-700 text-black font-bold outline h-10 w-36  rounded-full transition duration-300 mb-5">
                Previous page
                </button>
                
            </Link>
            <Link href={`/surfspots?page=${page + 1}`}>
                <button className="bg-white hover:bg-blue-700 text-black font-bold outline h-10 w-36 rounded-full transition duration-300 text-center mb-5">
                Next page
                </button>
                
            </Link>
          </div>
        </div>

        </div>
        </>
        )
        
}

function SurfspotCard( {surfspot}: any ) {
    const { _id, spot_name, thumbnail, break_type, rating} = surfspot || {};

    return (
     <Link href={`/surfspots/${_id}`}>
        <article className='max-w-sm mx-auto bg-neutral-500 text-black rounded-md shadow-md m-2 flex-none hover:bg-neutral-700'>
                <img src={thumbnail} alt={spot_name} className='mb-4 w-full h-52 object-cover object-center rounded' /> {/* surf spot thumbnail */}
                <div className='p-1 pb-3'>
                    <h2 className='text-center font-bold'>{spot_name}</h2>
                    <h3 className='text-center'>{break_type}</h3>
                    <p className='text-center'>{rating}</p>
                </div>
        </article>
     </Link> 
    );
}