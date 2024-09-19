'use client'


import { useState } from "react"
import EditUserProfile from "./editProfileAction"




export default function EditProfile({profile} : {'profile' : any}) {
    


    let [isOpen, setIsOpen] = useState(false)

    

    return(
        <>
        <button className=" mx-10 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full my-10" onClick={() => setIsOpen(true)}>Edit profile</button>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
                <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Edit profile</h2>
                    <p className="mb-4">Make any changes you like and hit save changes</p>
                    <form action={EditUserProfile}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                             First name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" defaultValue={profile.firstname} name="firstname" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                             Last name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" defaultValue={profile.lastname} name="lastname" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                             User name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" defaultValue={profile.username} name="username" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                             password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="password" placeholder="password" name="password" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                             email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" defaultValue={profile.email} name="email" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skill_level">
                             Skill Level
                        </label>
                        <select className="text-black text-lg rounded " name="skill_level" defaultValue={profile.skill_level}>
                        <option value="">Please Select</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                        </select>
                    </div>
                    <button type="submit"  className="bg-green-500 hover:bg-geen-600 text-white font-bold py-2 px-4 rounded mr-2">Save changes</button>
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