"use client"

import FormRegister from "@/components/forms/formRegister";
import { usePathname } from "next/navigation";

export default function RegisterPage() {
    const pathname = usePathname();
    const role = pathname.split('/').pop() || "Usuario";
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
          <div className="relative hidden bg-muted lg:block">
            {/* <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            /> */}
          </div>
          <div className="flex flex-col gap-4 p-6 md:p-10">
            
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-xs">
              <FormRegister role={role} />
              </div>
            </div>
          </div>
          
        </div>
      )
        
}
