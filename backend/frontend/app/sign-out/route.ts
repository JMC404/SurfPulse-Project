

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";


export async function GET() {

    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value


    

    const res = await fetch('http://localhost:5000/api/v1.0/logout' ,{
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`},
        credentials: 'include',
        mode: 'cors',
        referrer: 'http://localhost:3000',
        

        
    }) 
    
    
    if (res.ok) {
        
        console.log('sign out sucessful')
        cookies().delete('token')
        cookies().delete('user')
        cookies().delete('admin')
        cookies().delete('id')
        redirect('/')
        
    }
    else {
        return (
            console.log('error occured')
        )
    }

    
}