"use client"
import supabase from "@/services/supabaseClient";
import React, { useContext, useEffect, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { UserDetail, UserContextType } from "@/types/user";

export default function Provider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<UserDetail | null>(null);

    const createNewUser = async () => {
        supabase.auth.getUser().then(async({data:{user}}) => {
            let {data:Users, error} = await supabase.from('Users')
                .select('*')
                .eq('email', user?.email);
            
            if(!Users || Users.length === 0){
                console.log("Creating new user");
                let {data, error} = await supabase.from('Users').insert([{
                    email: user?.email,
                    name: user?.user_metadata?.name,
                    picture: user?.user_metadata?.picture,
                    credits: 0  // Setting default credits to 0 for new users
                }]).select().single();
                
                if(error){
                    console.log(error);
                }
                else if(data){
                    console.log(data);
                    setUser(data as UserDetail);
                }
            }
            else{
                console.log("User already exists");
                setUser(Users[0] as UserDetail);
            }
        })
    }
    useEffect(()=>{
        createNewUser();
    },[])

    return (
        <UserDetailContext.Provider value={{user, setUser}}>{children}</UserDetailContext.Provider>
    )
}

export function useUserDetail(): UserContextType {
    const context = useContext(UserDetailContext) as UserContextType;
    if (!context) {
        throw new Error('useUserDetail must be used within a UserDetailProvider');
    }
    return context;
}
