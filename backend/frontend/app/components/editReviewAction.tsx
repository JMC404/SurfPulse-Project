'use server'

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"





const EditReview = async  (formData: FormData) => {

       
       const rid = formData.get('rid')
       const id = formData.get('id')
       const jwtToken = cookies().get('token')?.value
        
        
    await fetch(`http://localhost:5000/api/v1.0/surfspots/${id}/reviews/${rid}`, {
        method: 'PUT',
        body: formData,
        headers: {Authorization : `Bearer ${jwtToken}`}
    })
    revalidatePath(`/surfspots/${id}`)
    

}

export default EditReview