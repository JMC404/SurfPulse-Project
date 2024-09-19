import { cookies } from "next/headers";
import DeleteProfile from "../components/deleteProfile";
import EditProfile from "../components/editProfile";




async function getUserDetails() {

    const user_id = cookies().get('id')?.value
    const jwtToken = cookies().get('token')?.value

    const response = await fetch(`http://localhost:5000/api/v1.0/profile/${user_id}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {Authorization : `Bearer ${jwtToken}`}
    })
    const data = await response.json()

    return data
}

export default async function userDetailsPage() {
    const userData = await getUserDetails()
    
    const user = userData[0]



    return (
        <>
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">User Information</h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">ID</dt>
                                <dd className="mt-1 text-lg font-semibold text-gray-900">{user._id}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Username</dt>
                                <dd className="mt-1 text-lg font-semibold text-gray-900">{user.username}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">First Name</dt>
                                <dd className="mt-1 text-lg font-semibold text-gray-900">{user.firstname}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                                <dd className="mt-1 text-lg font-semibold text-gray-900">{user.lastname}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-lg font-semibold text-gray-900">{user.email}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Skill Level</dt>
                                <dd className="mt-1 text-lg font-semibold text-gray-900">{user.skill_level}</dd>
                            </div>
                        </dl>
                        <DeleteProfile profile={user} />
                        <EditProfile profile={user} />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
    