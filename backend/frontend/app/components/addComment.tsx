'use client'

import AddComment from "./addCommentAction"
import { useState } from "react";





export default function AddCommentInput({article} : {article : any}) {
    const [comment, setComment] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);

    };

    
    return (
        <div className="mt-8">
            <form action={AddComment} className="flex flex-col space-y-4">
                <input type="hidden" name="id" id="id" value={article._id} />
                <div className="flex flex-col">
                    <label htmlFor="comment" className="text-gray-600 mb-1">Add a comment:</label>
                    <input type="text" id="comment" name="comment" value={comment} onChange={handleInputChange} placeholder="Write your comment here" className="border border-gray-300 rounded-md px-3 py-2" />
                </div>
                {comment && (
                    <button type="submit" className="bg-white text-black outline font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">Comment</button>
                )}
            </form>
        </div>
    );
    
    
}