'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";



const addArticle = async(formData: FormData) => {


    console.log(formData)
    const jwtToken = cookies().get('token')?.value
    

    const response = await fetch('http://localhost:5000/api/v1.0/articles', {
        method: 'POST',
        body: formData,
        headers: {Authorization: `Bearer ${jwtToken}`}
    })

    if (response.ok) {
        redirect('/articles')
    }
    else {
        console.log(response.json())
    }
    
}


export default addArticle