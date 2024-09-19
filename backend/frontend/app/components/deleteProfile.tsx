'use client'

import { useRouter} from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";




export default function DeleteProfile({profile} : {profile : any}) {

    const router = useRouter()

    
    let [isOpen, setIsOpen] = useState(false)

    const DeleteUserProfile = async  () => {
        await fetch('http://localhost:3000/profile/delete-profile', {
            method: 'DELETE'
        })
        console.log(DeleteUserProfile)
        router.replace('/')
        toast.success('Profile sucessfully deleted')
        router.refresh()
        

    }

    return(
        <>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full my-10" onClick={() => setIsOpen(true)}>Deactivate Account</button>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
                <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Deactivate account</h2>
                    <p className="mb-4">This will permanently deactivate your account.</p>
                    <p className="mb-4">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                    <div className="flex justify-end">
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={DeleteUserProfile}>Deactivate</button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )}
        </>
    
    )
}
