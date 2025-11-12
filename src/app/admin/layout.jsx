import AdminGuard from "./AdminGuard";
import AdminLogout from "../../../components/AdminLogout";

export default function AdminLayout({ children }) {
  console.log("✅ AdminLayout monté");
  return (
    <div className="divAdmin">
      <div className="divAdminFlex">
        <h2 className="h2">ADMIN</h2>
        <AdminLogout />
      </div>
      <main>
        <AdminGuard>{children}</AdminGuard>
      </main>
    </div>
  );
}
