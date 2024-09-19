'use client'


import { useState } from "react"
import EditSurfspot from "./editSurfspotAction"



export default function EditSurfspotModal({surfspot} : {'surfspot' : any}) {
    


    let [isOpen, setIsOpen] = useState(false)

    

    return(
        <>

        <button className=" mx-10  hover:bg-yellow-600 text-black outline font-bold rounded-full w-52 my-10" onClick={() => setIsOpen(true)}>Edit surf spot</button>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
                <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Edit surf spot</h2>
                    <p className="mb-4">Make any changes you like and hit save changes</p>
                    <form action={EditSurfspot}>
                        <input type="hidden" id="id" name="id" value={surfspot._id}></input>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                             Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="spot_name" type="text"                   defaultValue={surfspot.spot_name} name="spot_name" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="break_type">
                             Break type
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  id="break_type" type="text" defaultValue={surfspot.break_type} name="break_type" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
                             Latitiude
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" step="0.0001" id="latitude" type="number" defaultValue={surfspot.location[0]} name="latitude" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
                            Longitude
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" step="0.0001" id="longitude" type="number" placeholder="longitude" defaultValue={surfspot.location[1]} name="longitude" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
                             Thumbnail
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="thumbnail" type="text" defaultValue={surfspot.thumbnail} name="thumbnail" required />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guide">
                        Guide
                    </label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="guide" placeholder="Enter the guide" name="guide" defaultValue={surfspot.guide} required></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skill_level">
                             Skill Level
                        </label>
                        <select className="text-black text-lg rounded " name="skill_level" id="skill_level" defaultValue={surfspot.skill_level}>
                        <option value="">Please Select</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-green-500 hover:bg-geen-600 text-white font-bold py-2 px-4 rounded mr-2">Save changes</button>
                    </form>
                    <div className="flex justify-end">
                        
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setIsOpen(false)}>Close</button>
                    </div>
                </div>
            </div>
        )}
        </>

    )
    
    
}