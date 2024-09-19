import { cookies } from "next/headers"




export async function PUT(request: Request ) {

    const pid = cookies().get('id')?.value;
    const {id} = await request.json()
    const jwtToken = cookies().get('token')?.value
    


    const response = await fetch(`http://localhost:5000/api/v1.0/profile/${pid}/${id}`, {
      method: 'PUT',
      headers: {Authorization : `Bearer ${jwtToken}`}

    })


    return(
        response
    )
  
  }


  export async function DELETE(request: Request) {
    const pid = cookies().get('id')?.value;
    const {id} = await request.json()
    const jwtToken = cookies().get('token')?.value

    const response = await fetch(`http://localhost:5000/api/v1.0/profile/${pid}/${id}`, {
      method: 'DELETE',
      headers: {Authorization : `Bearer ${jwtToken}`}

    })


    return(
        response
    )
    
  }