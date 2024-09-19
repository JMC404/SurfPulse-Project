'use server'

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"





const EditUserProfile = async  (formData: FormData) => {

    const day = 24 * 60 * 60 * 1000

    const id = cookies().get('id')?.value 
    const jwtToken = cookies().get('token')?.value


        
        
    const res = await fetch(`http://localhost:5000/api/v1.0/profile/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {Authorization : `Bearer ${jwtToken}`}
    })
    if (res.ok) {
        const data = await res.json()
        const user = data.username
        const skill_level = data.skill_level
        cookies().set({
            name: 'skill_level',
            value: skill_level,
            httpOnly: true,
            expires: Date.now() + day,
            sameSite: 'none'
         })
         cookies().set({
            name: 'user',
            value: user,
            httpOnly: true,
            expires: Date.now() + day,
            sameSite: 'none'
         })
        revalidatePath('/profile')
    }
    else {
        console.log('an error occured')
    }
    
    

}

export default EditUserProfile