


import React from "react"
import { IsLoggedIn} from "./auth"
import Link from "next/link"
import { cookies } from "next/headers"
import LogoutButton from "./logout"





const Profile = async () => {



    if ( await IsLoggedIn()) {
        return (
            <>

            <Link className="mx-3" href={'/profile'}>Profile</Link>
            < LogoutButton />

            </>
            
        )
       
    }
    else {
        return (
            <Link href={'/sign-in'}>Sign in</Link>
        )
    }

}

export default Profile