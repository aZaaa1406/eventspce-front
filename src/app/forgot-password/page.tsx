import React from 'react'
import ForgotPassword from '@/components/forms/forgotPassword'


function forgoPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPassword/>
      </div>
    </div>
  )
}

export default forgoPage