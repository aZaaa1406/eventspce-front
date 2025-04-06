import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Las variables de entorno en Edge Runtime (middleware) se manejan de forma diferente
const SECRET_KEY = process.env.SECRET_KEY || '';

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    console.log("Accediendo a ruta:", pathname);

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
        // Comprobar si tenemos un secret válido
        if (!SECRET_KEY) {
            console.error("Error: SECRET_KEY no está definido en las variables de entorno");
            return NextResponse.redirect(new URL('/error?message=config_error', request.url));
        }
        
        console.log("Secret disponible:", SECRET_KEY ? "Sí" : "No");
        
        // Verificar y decodificar el JWT
        const secretJWT = new TextEncoder().encode(SECRET_KEY);
        const { payload } = await jwtVerify(tokenValue, secretJWT);
        console.log("payload:", payload);
        const role = payload.rol as string | undefined;

        // Definir permisos por rol
        const rolePermissions: Record<string, string[]> = {
            propietario: ["/propietario"],
            cliente: ["/cliente"],
            admin: ["/admin", "/propietario", "/cliente"]
        };

        // Si el usuario no tiene rol definido, redirigir a unauthorized
        if (!role) {
            console.log("Usuario sin rol definido");
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
        
        // Si el rol no está en nuestras definiciones
        if (!rolePermissions[role]) {
            console.log("Rol no reconocido:", role);
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
        
        // Verificar si el usuario tiene acceso a esta ruta
        const hasAccess = rolePermissions[role].some(path => 
            pathname === path || pathname.startsWith(`${path}/`)
        );
        
        if (!hasAccess) {
            console.log(`El rol ${role} no tiene acceso a ${pathname}`);
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }

        // Si pasa la validación, permitir el acceso
        console.log("Acceso permitido para rol:", role);
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