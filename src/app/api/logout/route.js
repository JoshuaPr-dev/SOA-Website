import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const nextCookies = await cookies();
    const supabase = createRouteHandlerClient({ cookies: () => nextCookies });

    await supabase.auth.signOut();

    return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
  } catch (err) {
    console.error("Erreur de déconnexion", err);
    return NextResponse.json({ error: "Echec de la deconnexion" }, { status: 500 });
  }
}
