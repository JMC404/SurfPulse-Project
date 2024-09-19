'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import EditUserProfile from "./editProfileAction"
import addUserWeatherAction from "./addUserWeatherAction"
import AddUserWeather from "./addUserWeatherAction"
import React from "react"




export default function AddUserWeatherButton({surfspot} : {surfspot : any}) {
    const router = useRouter()


    let [isOpen, setIsOpen] = useState(false)

    

    return(
        <>
        <button className=" mx-10 bg-white hover:bg-blue-700 text-black font-bold outline py-2 px-4 rounded-full my-10" onClick={() => setIsOpen(true)}>Add weather report</button>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
                <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Weather report</h2>
                    <p className="mb-4">Write up a weather report and hit submit</p>
                    <form action={AddUserWeather}>
                        <input type="hidden" name="id" value={surfspot._id}></input>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="waveheight">
                             Wave height
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="waveheight" type="text" placeholder="3-4ft"  name="waveheight" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                             Rating
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rating" type="text" placeholder="Great" name="rating"  required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weather">
                             Weather
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="weather" type="text" placeholder="Cloudy"  name="weather" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recommended_board">
                             Recommended Board
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="recommended_board" type="text" placeholder="Long baord" name="recommended_board" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                             Comment
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="comment" rows={5} placeholder="Waves look pretty good" name="comment">

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