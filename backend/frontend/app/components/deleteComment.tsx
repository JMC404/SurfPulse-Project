'use client'

import { useState } from "react"
import React from "react"
import DeleteComment from "./deleteCommentAction"





export default function DeleteCommentModal({comment, article} : {comment : any, article: any}) {
    


    let [isOpen, setIsOpen] = useState(false)
    

    return(
        <>
        <button className="outline hover:bg-red-600 text-black font-bold py-2 px-4 rounded-full my-10" onClick={() => setIsOpen(true)}>Delete comment</button>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
                <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Delete Comment</h2>
                    <p className="mb-4">This will permanently delete this comment</p>
                    <p className="mb-4">Are you sure you want to delete this comment. This action cannot be undone.</p>
                    <div className="flex justify-end">
                        <form action={DeleteComment}>
                            <input type="hidden" id="id" name="id" value={article._id}></input>
                            <input type="hidden" id="cid" name="cid" value={comment._id}></input>
                            <input type="hidden" id="username" name="username" value={comment.username}></input>
                            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2">Delete</button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setIsOpen(false)}>Cancel</button>
                        </form>
                        
                    </div>
                </div>
            </div>
        )}
        </>
    
    )
    
    
}