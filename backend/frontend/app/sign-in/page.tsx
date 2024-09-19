'use client'


import Link from "next/link"
import React from "react"
import { useFormState } from "react-dom"
import authenticate from "../components/auth"

const intialState = {
    message: ''
}

export default function LoginPage() {
    

    const [formState, FormAction] = useFormState(authenticate, intialState);

    return(
        <main>
            <div id="sign-in">
                <h1 className=" text-center font-bold text-xl mt-9">Sign in to Surf pulse</h1>
                <h3 className="text-center">Don't have an account? {''}
                    <span className="text-blue-500">
                    <Link href={'sign-in/create-account'}>Sign up</Link> 
                    </span>
                </h3>
                <form className="text-center my-8" action={FormAction}>
                    <h2>Username</h2>
                    <input className="text-black rounded" type="username" name="username" placeholder="Username" required />
                    <h2>Password</h2>
                    <input className="text-black rounded" type='password' name="password" placeholder="password"  required />
                    <div>
                    {formState?.message && (
                        <p className="text-red-500 text-m text-center mt-4">{formState.message}</p>
                    )}
                    <button className="outline my-10 rounded-full w-16 hover:bg-blue-700" type="submit">Login</button>
                    </div>
                </form>

            </div>
        </main>

    )

    
    
}