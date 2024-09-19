
import Link from "next/link";


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



async function getSearchResults(searchParams : any) {

    const name = searchParams['name'] ?? ''
    const skill_level = searchParams['skill_level'] ?? ''
    
    const res = await fetch(`http://localhost:5000/api/v1.0/surfspots/search?name=${name}&skill_level=${skill_level}`, {
        method: 'GET',
        cache: 'no-store'
    });
    const data = await res.json();
    return data as any[];
    
    
}


export default async function searchResultsPage({searchParams}: {
    searchParams: { [key: string]: string | string[] | undefined}
}) {
    const surfspots = await getSearchResults(searchParams)


    return(
        <div className='text-center'>
            <h1 className='text-xl'>Search results</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {surfspots?.map((surfspot) => {
                    return <SurfspotCard key={surfspot._id} surfspot={surfspot} />;
                })}
            </div>
        </div>
    )
    
}