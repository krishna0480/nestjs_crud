"use client"
import { useCookies } from 'next-client-cookies';
import { cookies } from 'next/headers';
import { redirect, usePathname } from 'next/navigation';
import React from 'react';

function Private({children}:{children:React.ReactNode}) {
    const pathName = usePathname()
    const cookiesStore = useCookies()
    const logged = cookiesStore.get("logged")
    if (pathName == "/product" && logged !== "true") {
        redirect("/login")
    } else if ((pathName == "/login" || pathName == "/signup")&& logged == "true" ) {
        redirect("/product")
    }
  return (
        <>
            {children}
        </>
  );
}

export default Private;
