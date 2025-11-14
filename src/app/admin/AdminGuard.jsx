"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/context/supabase-provider";

export default function AdminGuard({ children }) {
  const { session } = useSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session === null) {
      router.replace("/admin/login");
    } else {
      setLoading(false);
    }
  }, [session, router]);

  if (loading) return <p className="loading">Chargement...</p>;

  return children;
}
