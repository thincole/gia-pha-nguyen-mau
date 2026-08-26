import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export async function updateSession(request: NextRequest) {
  // If env vars are missing, we cannot create a supabase client
  if (!supabaseUrl || !supabaseKey) {
    if (request.nextUrl.pathname !== "/missing-db-config") {
      const url = request.nextUrl.clone();
      url.pathname = "/missing-db-config";
      return NextResponse.redirect(url);
    }
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with cross-browser cookies across mobile browsers.
  // https://supabase.com/docs/guides/auth/server-side/nextjs

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes (Chỉ các trang quản trị nhạy cảm mới yêu cầu đăng nhập)
  const pathname = request.nextUrl.pathname;
  const isProtectedPath =
    pathname.startsWith("/dashboard/data") ||
    pathname.startsWith("/dashboard/users") ||
    pathname.startsWith("/dashboard/lineage") ||
    pathname.startsWith("/dashboard/members/new") ||
    pathname.includes("/edit");

  const isLoginPage = pathname.startsWith("/login");

  // Check if DB schema is initialized by checking if profiles table exists
  if (isProtectedPath || isLoginPage) {
    const { error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .limit(1);

    if (
      profileError &&
      (profileError.code === "PGRST205" || profileError.code === "42P01")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/setup";
      return NextResponse.redirect(url);
    }
  }

  if (isProtectedPath && !user) {
    // no user, redirect to login page with return url
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirect users who are already logged in away from the login page
  if (isLoginPage && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
