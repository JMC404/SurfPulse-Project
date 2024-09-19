'use server'

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"





const AddUserWeather = async  (formData: FormData) => {

    const id = formData.get('id')
    const username = cookies().get('user')?.value
    const jwtToken = cookies().get('token')?.value
    formData.append('username', `${username}`)
       
        
        
    await fetch(`http://localhost:5000/api/v1.0/surfspots/${id}/user-weather`, {
        method: 'POST',
        body: formData,
        headers: {Authorization : `Bearer ${jwtToken}`}
    })
    revalidatePath(`/surfspots/${id}`)
    console.log(formData)
    

}

export default AddUserWeather