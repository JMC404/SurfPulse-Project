import Link from "next/link";
import { IsAdmin, IsLoggedIn } from "../components/auth";



 export function ArticleCard( {article}: any) {
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


async function getArticles(searchParams : any) {

    const pageNum = searchParams['page'] ?? 1

    const res = await fetch(`http://localhost:5000/api/v1.0/articles?pn=${pageNum}`, {
        method: 'get',
        cache: 'no-store'

    });
    const data = await res.json();
    return data as any[];
    
}

export default async function   articlesPage({searchParams}: {
    searchParams: { [key: string]: string | string[] | undefined}
}) {

    const articles =  await getArticles(searchParams)
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1



    return(

        <>
        <div className='text-center'>
            <h1 className="text-xl my-2">Articles</h1>
            <div className='grid grid-cols-3 gap-4 my-7'>
                {articles?.map((article) => {
                    return <ArticleCard key={article._id} article={article} />;
                })}
            </div>
        </div>
        <div className='text-center my-10'>
            <Link href={'/articles/add-article'}>
            {  await IsLoggedIn()  && await IsAdmin() &&( <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 outline px-4 rounded-full transition duration-300">
                Add article
                </button>
            )}

            </Link>
        </div>
        <div className="flex justify-center">
            <div className="flex space-x-4">
                <Link href={`/articles?page=${page > 1 ? page -1 : 1}`}>
                    <button className="bg-white hover:bg-blue-700 text-black font-bold outline h-10 w-36  rounded-full transition duration-300 mb-5">
                    Previous page
                    </button>
                    
                </Link>
                <Link href={`/articles?page=${page + 1}`}>
                    <button className="bg-white hover:bg-blue-700 text-black font-bold outline h-10 w-36 rounded-full transition duration-300 text-center mb-5">
                    Next page
                    </button>
                    
                </Link>
            </div>
        </div>
        </>
        
    );

}