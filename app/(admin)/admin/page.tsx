"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

const AdminPage = () => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            router.replace("/");
        }
    }, [user, router]);

    if (!user || !user.isAdmin) {
        return null; 
    }

    return (
        <div>
            test 123123123
            Welcome admin: {user.username}
        </div>
    );
};

export default AdminPage;