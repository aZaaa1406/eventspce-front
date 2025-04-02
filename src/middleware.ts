import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { secret } from "./config";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Permitir acceso libre a la ruta "/"
    if (pathname === "/") {
        return NextResponse.next();
    }

    const token = request.cookies.get("access_token")?.value;

    // Si no hay token y la ruta no es "/", redirigir al login
    if (!token) {
        return NextResponse.redirect(new URL('/formsAuth/login', request.url));
    }

    try {
        const secretJWT = new TextEncoder().encode(secret);
        const { payload } = await jwtVerify(token, secretJWT);
        const role = payload.rol as string | undefined;
        // Definir permisos por rol
        const rolePermissions: Record<string, string[]> = {
            propietario: ["/propietario"],
            cliente: ["/cliente"],
            admin: ["/admin", "/propietario", "/cliente"]
        };


        // Si el usuario no tiene rol definido, redirigir a unauthorized
        if (!role || !rolePermissions[role]?.some(path => pathname.startsWith(path))) {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error(error);
        return NextResponse.redirect(new URL('/formsAuth/login', request.url));
    }
}

export const config = {
    matcher: ['/cliente/:path*', '/propietario/:path*', '/admin/:path*']
};
