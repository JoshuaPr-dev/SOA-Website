"use client";
import { SupabaseProvider } from "@/context/supabase-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
