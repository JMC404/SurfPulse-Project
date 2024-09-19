'use server'

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { IsAdmin } from "./auth"





const DeleteReview = async  (formData: FormData) => {

    const id = formData.get('id')
    const jwtToken = cookies().get('token')?.value
    const cid = formData.get('cid')
       
        
    
        await fetch(`http://localhost:5000/api/v1.0/surfspots/${id}/reviews/${cid}`, {
            method: 'DELETE',
            headers: {Authorization : `Bearer ${jwtToken}`}
        })
        revalidatePath(`/surfspots/${id}`)
        console.log(formData)
        return(console.log('Review deleted'))
       
    

}

export default DeleteReview