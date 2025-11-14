"use client";

import AdminGuard from "../AdminGuard";
import AdminLogout from "../../../../components/AdminLogout";

export default function ProtectedAdminLayout({ children }) {
  return (
    <AdminGuard>
      <div className="divAdmin">
        <div className="divAdminFlex">
          <h2 className="h2">ADMIN</h2>
          <AdminLogout />
        </div>

        <main>{children}</main>
      </div>
    </AdminGuard>
  );
}
