import { useState } from "react";
import { Outlet, NavLink, useLocation, Navigate, Link } from "react-router-dom";
import { useFaculty } from "@/lib/FacultyContext";
import { formatAcademicYear } from "@/lib/placementAnalytics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  GraduationCap,
  Building2,
  CalendarDays,
  FileText,
  BarChart3,
  RefreshCw,
  Menu,
} from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Class Dashboard", icon: LayoutDashboard },
  { to: "/students", label: "Students", icon: GraduationCap },
  { to: "/companies", label: "Companies", icon: Building2 },
  { to: "/drives", label: "Placement Drives", icon: CalendarDays },
  { to: "/offers", label: "Offers", icon: FileText },
  { to: "/reports", label: "Reports & Analytics", icon: BarChart3 },
];

export default function FacultyLayout() {
  const { selection } = useFaculty();
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  if (!selection) return <Navigate to="/faculty" replace />;

  const active = nav.find((n) => loc.pathname === n.to || loc.pathname.startsWith(n.to + "/"));
  const title = active ? active.label : "Faculty Space";
  const breadcrumb = `${formatAcademicYear(selection.academicYear)} / ${selection.department} / ${selection.program}`;

  const Sidebar = (
    <aside className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center gap-2 border-b px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">Faculty Space</div>
          <div className="text-xs text-muted-foreground">Placement Management</div>
        </div>
      </div>
      <div className="px-3 pt-3">
        <Link to="/faculty">
          <button className="flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
            <RefreshCw className="h-4 w-4" /> Change Class
          </button>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-3">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t px-3 py-3">
        <Link to="/" className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
          ← Back to Welcome
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-slate-50">
      <div className="hidden md:block">{Sidebar}</div>
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full">{Sidebar}</div>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <div className="text-lg font-semibold leading-tight">{title}</div>
              <div className="text-xs font-medium text-primary">{breadcrumb}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              F
            </div>
            <span className="hidden text-sm font-medium sm:block">Faculty</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}