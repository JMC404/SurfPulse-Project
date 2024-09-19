'use client'

import { useRouter} from "next/navigation";
import { toast } from "sonner";


export default function AddToFavourites({surfspot}: {surfspot : any}) {

    const router = useRouter()
    
    

    const addToFav = async () => {
        await fetch(`http://localhost:3000/favourites`, {
            method: 'PUT',
            body: JSON.stringify({id: surfspot._id})
        });
        console.log(addToFav)
        toast.success('added to favourites')
        router.refresh()

    };
    return <button className="outline rounded-full w-52 font-bold hover:bg-blue-700" onClick={addToFav}>favourite</button>
  
  }