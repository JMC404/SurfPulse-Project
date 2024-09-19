'use server'

import { redirect } from "next/navigation";




const addProfileAction = async(currentState: {message: string}, formData: FormData) => {

    
    
    
    console.log(formData)


    const response = await fetch('http://localhost:5000/api/v1.0/signup', {
        method: 'POST',
        body: formData,
    })

    if (response.ok) {
        redirect('/sign-in')
    }
    else {
    
        const errorMessage = await response.json();
        return {
            message: errorMessage.error || 'An error occurred while signing up',
        };
    }

    
}


export default addProfileAction