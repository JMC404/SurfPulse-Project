'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";



const addSurfSpot = async(formData: FormData) => {

    
    const jwtToken = cookies().get('token')?.value
    
    


    const response = await fetch('http://localhost:5000/api/v1.0/surfspots', {
        method: 'POST',
        body: formData,
        headers: {Authorization : `Bearer ${jwtToken}`}
    })

    if (response.ok) {
        redirect('/surfspots')
    }
    else {
        console.log(response.json())
    }
    
}


export default addSurfSpot