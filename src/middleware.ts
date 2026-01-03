import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path=request.nextUrl.pathname;
  
  const isPublic=path=="/login" || path=="/signup" || path=="/verifyemail";

  const token=request.cookies.get('token')?.value || '';

  if(isPublic && token){
    return NextResponse.redirect(new URL('/profile',request.nextUrl));
  }

  if(!isPublic && !token){
   return NextResponse.redirect(new URL('/login',request.nextUrl));
  }

  
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/", "/profile", "/login", "/signup","/verifyemail"],
};
 