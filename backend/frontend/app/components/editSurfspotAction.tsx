'use server'

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"





const EditSurfspot = async  (formData: FormData) => {

        const id = formData.get('id')
        const jwtToken = cookies().get('token')?.value

        const latitude = formData.get('latitude')
        const longitude = formData.get('longitude') 
        
        
        const location = `${latitude} ${longitude}`
        formData.append('location', location)
        formData.delete('longitude')
        formData.delete('latitude')
        
    await fetch(`http://localhost:5000/api/v1.0/surfspots/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {Authorization : `Bearer ${jwtToken}`}
    })
    revalidatePath(`/surfspots/${id}`)
    

}

export default EditSurfspot