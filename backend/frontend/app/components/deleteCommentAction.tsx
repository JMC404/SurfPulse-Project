'use server'

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { IsAdmin } from "./auth"





const DeleteComment = async  (formData: FormData) => {

    const id = formData.get('id')
    const jwtToken = cookies().get('token')?.value
    const cid = formData.get('cid')
       
        
    
        await fetch(`http://localhost:5000/api/v1.0/articles/${id}/comments/${cid}`, {
            method: 'DELETE',
            body: formData,
            headers: {Authorization : `Bearer ${jwtToken}`}
        })
        revalidatePath(`/articles/${id}`)
        console.log(formData)
        return(console.log('comment deleted'))
       
    

}

export default DeleteComment