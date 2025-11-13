import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: () => cookieStore }
  );

  try {
    await supabase.auth.signOut();

    const redirectTo =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.NODE_ENV === "production"
        ? "https://strengthoptimizationacademy.com"
        : "http://localhost:3000");

    return NextResponse.redirect(new URL("/", redirectTo));
  } catch (err) {
    console.error("Erreur de déconnexion :", err);
    return NextResponse.json(
      { error: "Échec de la déconnexion" },
      { status: 500 }
    );
  }
}
