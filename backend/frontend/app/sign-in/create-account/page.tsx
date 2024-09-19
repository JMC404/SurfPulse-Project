"use client"

import addProfileAction from "@/app/components/addProfileAction";
import { FormEvent } from "react";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";




const intialState = {
    message: ''
}

export default function signUp() {
    const [formState, FormAction] = useFormState(addProfileAction, intialState);

    
    return(
        <main>
            <div className="text-center my-2" id="Create-account">
                <h1 className="text-4xl">Please enter your details</h1>
                <form className="space-y-3 group" method="POST" action={FormAction}>
                    
                    <div>
                        <label htmlFor="firstname">
                        <h2>First name</h2>
                        <input 
                            type="text"
                            name="firstname"
                            id="firstname"
                            className="peer outline rounded"
                            placeholder=" "
                            required
                        />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="lastname">
                        <h2>Last name</h2>
                        <input 
                            type="text"
                            name="lastname"
                            id="lastname"
                            className="peer outline rounded"
                            placeholder=" "
                            required
                        />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="username">
                        <h2>Username</h2>
                        <input 
                            type="text"
                            name="username"
                            id="username"
                            className="peer outline rounded"
                            placeholder=" "
                            required
                        />
                        </label>
                    </div>

                    <div>
                        <label htmlFor="email">
                        <h2>Email</h2>
                        <input
                        type="email"
                        name="email"
                        id="email"
                        className="peer outline rounded"
                        placeholder=" "
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        />
                        <span className="mt-2 hidden text-sm peer-[&:not(:placeholder-shown):not(:focus):invalid]:block text-red-500">
                            Please enter a valid email address 
                        </span>
                        </label>
                        
                    </div>
                    
                    <div>
                        <label htmlFor="password">
                        <h2>Password</h2>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            className="peer rounded outline"
                            placeholder=" "
                            required
                            pattern=".{7,}"
                        />
                        <span className="mt-2 hidden text-sm peer-[&:not(:placeholder-shown):not(:focus):invalid]:block text-red-500">
                            Password must be 7 characters long
                        </span>
                        </label>
                    </div>
                    
                    <h2> What would your skill level be as a surfer?</h2>
                    <div className="space-y-5" id="select_skill">
                    <select className="text-black text-lg rounded " name="skill_level">
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                    </select>
                    </div>
                    {formState?.message && (
                        <p className="text-red-500 text-m text-center mt-4">{formState.message}</p>
                    )}
                    
                
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full group-invalid:pointer-events-none group-invalid:opacity-30" type="submit">Create Account</button>
                </form>
            </div>
        </main>
        
    )
    
}