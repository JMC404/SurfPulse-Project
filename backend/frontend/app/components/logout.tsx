'use client'

import { useRouter} from "next/navigation";
import { toast } from "sonner";





export default function LogoutButton() {

    const router = useRouter()

    
    

    const Logout = async  () => {
        await fetch('http://localhost:3000/sign-out', {
            method: 'GET'
            
        })
        console.log(Logout)
        router.replace('/')
        toast.success('successfully signed out')
        router.refresh()
        

    }

    return(
        <>
        <button onClick={Logout}>Sign out</button>
        
        </>
    
    )
}
