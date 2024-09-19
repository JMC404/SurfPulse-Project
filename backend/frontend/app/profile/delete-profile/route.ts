import { cookies } from "next/headers";





export async function DELETE(request: Request) {
    const id = cookies().get('id')?.value
    const token = cookies().get('token')?.value

    const response = await fetch(`http://localhost:5000/api/v1.0/profile/${id}` , {
        method: 'DELETE',
        headers: {'Authorization' : `Bearer ${token}`}
    })

    if (response.ok) {
        cookies().delete('admin')
        cookies().delete('user')
        cookies().delete('id')
        cookies().delete('token')
        console.log(response)
        return response
        
    }
}