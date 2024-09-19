'use client'

import { useState } from "react"
import React from "react"
import AddReview from "./addReviewAction"




export default function AddReviewModal({surfspot} : {surfspot : any}) {
    


    let [isOpen, setIsOpen] = useState(false)

    

    return(
        <>
        <button className=" mx-10 bg-white hover:bg-blue-700 text-black font-bold outline py-2 px-4 rounded-full my-10" onClick={() => setIsOpen(true)}>Add review</button>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
                <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Review</h2>
                    <p className="mb-4">Write your reivew and hit submit</p>
                    <form action={AddReview}>
                        <input type="hidden" name="id" value={surfspot._id}></input>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                             Rating
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rating" type="number" placeholder="0-5 stars"  name="rating" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
                             Review
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="comment" rows={6} placeholder="This surf spot is good however condtions are hard to predict etc" name="review">
                        </textarea>
                    </div>
                    <button type="submit" className="bg-white hover:bg-green-500 text-black outline font-bold py-2 px-4 rounded-full mr-2">Submit</button>
                    </form>
                    <div className="flex justify-end">
                        
                        <button className="bg-white hover:bg-gray-400 text-black outline font-bold py-2 px-4 rounded-full" onClick={() => setIsOpen(false)}>Close</button>
                    </div>
                </div>
            </div>
        )}
        </>
    
    )
    
    
}