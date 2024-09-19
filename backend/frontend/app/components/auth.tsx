'use server'

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";




const authenticate = async (currentState: {message: string}, formData: FormData) => {
    

    const day = 24 * 60 * 60 * 1000
    const username = formData.get("username")
    const password = formData.get("password")

    const response = await fetch("http://localhost:5000/api/v1.1/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
        
    })

    if (response.ok) {
        console.log('Sign in Sucessful')

         const data = await response.json()
         const token = data.token
         const admin = data.user.admin
         const user = data.user.user
         const id = data.user.id
         const skill_level = data.user.skill_level
         

         cookies().set({
            name: 'token',
            value: token,
            expires: Date.now() + day,
            sameSite: 'lax',
            httpOnly: true,
         
         })
         cookies().set({
            name: 'admin',
            value: admin,
            httpOnly: true,
            expires: Date.now() + day,
            sameSite: 'lax'
         })
         cookies().set({
            name: 'user',
            value: user,
            httpOnly: true,
            expires: Date.now() + day,
            sameSite: 'lax'
         })
         cookies().set({
            name: 'id',
            value: id,
            httpOnly: true,
            expires: Date.now() + day,
            sameSite: 'lax'
         })
         cookies().set({
            name: 'skill_level',
            value: skill_level,
            httpOnly: true,
            expires: Date.now() + day,
            sameSite: "lax"
         })
         redirect('/')
         
    }
    else {
      const errorMessage = await response.json();
      return {
         message: errorMessage.error || 'An error occurred while signing in'
      };
    }

}



 export const IsLoggedIn = async () => {

    const token = cookies().get('token')
    return !!token
   
}

export const IsAdmin = async () => {

   const admin = cookies().get('admin')?.value
   if (admin === 'true') {
      return true
   }
   else {
      return false
   }
}





export default authenticate