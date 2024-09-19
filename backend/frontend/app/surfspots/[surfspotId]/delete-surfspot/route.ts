import { cookies } from "next/headers";


export async function DELETE(request: Request) {

    const {id} =  await request.json()
    const jwtToken = cookies().get('token')?.value
    console.log({id})

    const response = await fetch(`http://localhost:5000/api/v1.0/surfspots/${id}` , {
        method: 'DELETE',
        headers: {Authorization : `Bearer ${jwtToken}`}
        
    })
    

    if (response.ok) {
        console.log(response)
        return response
        
    }
}