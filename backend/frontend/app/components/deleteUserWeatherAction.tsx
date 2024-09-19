'use server'

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"






const DeleteUserWeather = async  (formData: FormData) => {

    const id = formData.get('id')
    const jwtToken = cookies().get('token')?.value
    const cid = formData.get('cid')
       
        
    
        await fetch(`http://localhost:5000/api/v1.0/surfspots/${id}/user-weather/${cid}`, {
            method: 'DELETE',
            headers: {Authorization : `Bearer ${jwtToken}`}
        })
        revalidatePath(`/surfspots/${id}`)
        console.log(formData)
        return(console.log('User weather report deleted'))
       
    

}

export default DeleteUserWeather