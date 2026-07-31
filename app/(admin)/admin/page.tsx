"use client"
import { useAuth } from "@/lib/context/AuthContext";
import { useEffect } from "react";



const AdminPage = () => {
const { user } = useAuth();
    if(!user || !user.isAdmin){
        alert("Bạn ko phải admin or chưa login")
    }
    
    useEffect (()=> {

    })


    return(
        <div>Admin page</div>
    )
}

export default AdminPage