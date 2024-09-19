'use client'

import { useRouter} from "next/navigation";
import { toast } from "sonner";


export default function RemoveFromFavourites({surfspot}: {surfspot : any}) {

    const router = useRouter()
    
    

    const addToFav = async () => {
        await fetch(`http://localhost:3000/favourites`, {
            method: 'DELETE',
            body: JSON.stringify({id : surfspot._id})
        });
        console.log(addToFav)
        toast.success('removed from favourites')
        router.refresh()

    };
   

    return <button className="outline rounded-full w-52 font-bold hover:bg-red-700" onClick={addToFav}>Remove favourite</button>
  
  }