import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { secret } from "./config";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    console.log(secret);
    // Permitir acceso libre a la ruta "/"
    if (pathname === "/") {
        return NextResponse.next();
    }

    // Obtener el token de las cookies
    const token = request.cookies.get("access_token");
    const tokenValue = token?.value || ""; // Si no existe el token, usar cadena vacía
    console.log("token:", tokenValue);

    // Si no hay token y la ruta no es "/", redirigir al login
    if (!tokenValue) {
        console.log("No hay token");
        return NextResponse.redirect(new URL('/formsAuth/login', request.url));
    }

    try {
        // Verificar y decodificar el JWT
        const secretJWT = new TextEncoder().encode(secret);
        console.log(secretJWT);
        const { payload } = await jwtVerify(tokenValue, secretJWT);
        console.log("payload:", payload);
        const role = payload.rol as string | undefined;

        //Definir permisos por rol
        const rolePermissions: Record<string, string[]> = {
            propietario: ["/propietario"],
            cliente: ["/cliente"],
            admin: ["/admin", "/propietario", "/cliente"]
        };

        //Si el usuario no tiene rol definido, redirigir a unauthorized
        if (!role || !rolePermissions[role]?.some(path => pathname.startsWith(path))) {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }

        //Si pasa la validación, permitir el acceso
        return NextResponse.next();
    } catch (error) {
        // Si el token no es válido o ocurre un error, redirigir al login
        console.error("Error en la verificación del token:", error);
        return NextResponse.redirect(new URL('/formsAuth/login', request.url));
    }
}

// Configuración de las rutas que deben pasar por este middleware
export const config = {
    matcher: ['/cliente/:path*', '/propietario/:path*', '/admin/:path*']
};
