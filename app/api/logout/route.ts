import { NextResponse } from "next/server";

export async function GET(){
    try{
        const response = NextResponse.json({message: "Logout Successfully", success: true})

        response.cookies.set("adminToken", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        
        return response
    
    }catch(err: unknown){
        return NextResponse.json({error: err}, {status: 500})
    }
}