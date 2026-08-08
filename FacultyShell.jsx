import { Outlet } from "react-router-dom";
import { PlacementProvider } from "@/lib/PlacementContext";
import { FacultyProvider } from "@/lib/FacultyContext";

export default function FacultyShell() {
  return (
    <PlacementProvider>
      <FacultyProvider>
        <Outlet />
      </FacultyProvider>
    </PlacementProvider>
  );
}