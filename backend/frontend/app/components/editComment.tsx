'use client'


import { useState } from "react"
import EditComment from "./editCommentAction"




export default function EditCommentModal({comment, article} : {comment : any, article: any}) {
    


    let [isOpen, setIsOpen] = useState(false)

    

    return(
        <>
        <button className=" mx-10  outline hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full my-10" onClick={() => setIsOpen(true)}>Edit comment</button>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
                <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Edit comment</h2>
                    <p className="mb-4">Make any changes you like and hit save changes</p>
                    <form action={EditComment}>
                        <input type="hidden" name="id" id="id" value={article._id} />
                        <input type="hidden" name="cid" id="cid" value={comment._id} />
                        <input type="hidden" name="username" id="username" value={comment.username} />
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                             Comment
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="comment" type="text" defaultValue={comment.comment} name="comment" required />
                    </div>
                    <button type="submit" className="bg-green-500 hover:bg-geen-600 text-white font-bold py-2 px-4 rounded mr-2">Save changes</button>
                    </form>
                    <div className="flex justify-end">
                        
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )}
        </>
    
    )
    
    
}