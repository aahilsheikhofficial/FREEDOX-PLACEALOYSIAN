import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { PlacementProvider } from "@/lib/PlacementContext";
import {
  LayoutDashboard,
  GraduationCap,
  Building2,
  CalendarDays,
  FileText,
  BarChart3,
  Settings,
  User,
  Bell,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/students", label: "Students", icon: GraduationCap },
  { to: "/companies", label: "Companies", icon: Building2 },
  { to: "/drives", label: "Placement Drives", icon: CalendarDays },
  { to: "/offers", label: "Offers", icon: FileText },
  { to: "/reports", label: "Reports & Insights", icon: BarChart3 },
];

export default function PlacementLayout() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const active = nav.find((n) =>
    n.end ? loc.pathname === n.to : loc.pathname === n.to || loc.pathname.startsWith(n.to + "/")
  );
  const title = active ? active.label : "Placement Management";

  const Sidebar = (
    <aside className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center gap-2 border-b px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">Placement</div>
          <div className="text-xs text-muted-foreground">Management System</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
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
      <div className="space-y-1 border-t px-3 py-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted cursor-pointer">
          <Settings className="h-4 w-4" /> Settings
        </div>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted cursor-pointer">
          <User className="h-4 w-4" /> Admin Profile
        </div>
      </div>
    </aside>
  );

  return (
    <PlacementProvider>
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
                <div className="text-xs text-muted-foreground">Placement Management System</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative rounded-full p-2 hover:bg-muted">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
              </button>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                  PA
                </div>
                <span className="hidden text-sm font-medium sm:block">Placement Admin</span>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </PlacementProvider>
  );
}