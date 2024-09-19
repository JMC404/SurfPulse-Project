
import AddCommentInput from "@/app/components/addComment";
import { IsAdmin, IsLoggedIn } from "@/app/components/auth";
import DeleteCommentModal from "@/app/components/deleteComment";
import EditCommentModal from "@/app/components/editComment";
import { cookies } from "next/headers";
import Link from "next/link";


export async function generateStaticParams() {
    const articles = await fetch('http://localhost:5000/api/v1.0/articles').then((res) => res.json())
   
    return articles.map((article: any) => ({
      ArticleId: article._id
    }));
  }
  






export default async function  articlePage({ params }: any) {

    const response = await fetch(`http://localhost:5000/api/v1.0/articles/${params.ArticleId}`, {
        method: 'GET',
        cache: 'no-store'
    })

    const article  = await response.json()
    const firstArticle = article[0];
    const admin = await IsAdmin()


    return (
        <>
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">{firstArticle.title}</h1>
            <p className="text-gray-700 mb-4">{firstArticle.journalist}</p>
            <p className="text-gray-600 mb-4">{firstArticle.date_published}</p>
            <img src={firstArticle.thumbnail} alt={firstArticle.title} className="h-auto mb-6 w-full rounded-lg shadow-lg" />
            <p className="text-gray-800 leading-relaxed mb-8">{firstArticle.content}</p>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                <div>
                    {await IsLoggedIn() && <AddCommentInput article={firstArticle} />}
                </div>
                {Array.isArray(firstArticle.comments) && firstArticle.comments.length > 0 ? (
                    firstArticle.comments.map((comment : any, index: any) => (
                        <div key={index} className="bg-gray-100 rounded-md p-4 mb-4">
                            <p className="font-semibold mb-2">{comment.username}</p>
                            <p className="text-gray-800">{comment.comment}</p>
                            {( admin || cookies().get('user')?.value == comment.username) && <DeleteCommentModal article={firstArticle} comment={comment}/>}
                            {( admin || cookies().get('user')?.value == comment.username) && <EditCommentModal article={firstArticle} comment={comment}/>}
                        </div>
                    ))
                ) : (
                    <p>No comments available</p>
                )}
            </div>
        </div>
        </>
            
        );
}