'use server'

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"





const EditComment = async  (formData: FormData) => {

       
       const cid = formData.get('cid')
       const id = formData.get('id')
       const jwtToken = cookies().get('token')?.value
        
        
    await fetch(`http://localhost:5000/api/v1.0/articles/${id}/comments/${cid}`, {
        method: 'PUT',
        body: formData,
        headers: {Authorization : `Bearer ${jwtToken}`}
    })
    revalidatePath(`/articles/${id}`)
    

}

export default EditComment