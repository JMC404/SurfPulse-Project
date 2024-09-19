'use client'

import { useRouter} from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";




export default function DeleteSurfspotModal({surfspot} : {surfspot : any}) {

    const router = useRouter()

    
    let [isOpen, setIsOpen] = useState(false)

    const DeleteSurfspot = async  () => {
        await fetch(`http://localhost:3000/surfspots/${surfspot._id}/delete-surfspot`, {
            method: 'DELETE',
            body: JSON.stringify({id: surfspot._id})
        })
        console.log(DeleteSurfspot)
        router.replace('/surfspots')
        toast.success('Surf spot deleted successfully')
        router.refresh()
        

    }

    return(
        <>
        <button className="mx-10  hover:bg-red-600 text-black outline font-bold rounded-full w-52 my-10" onClick={() => setIsOpen(true)}>Delete surf spot</button>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
                <div className="bg-white p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Delete surfspot</h2>
                    <p className="mb-4">This will permanently delete this surfspot.</p>
                    <p className="mb-4">Are you sure you want to delete this surfspot? All of it's data will be permanently removed. This action cannot be undone.</p>
                    <div className="flex justify-end">
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={DeleteSurfspot}>Delete</button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )}
        </>
    
    )
}