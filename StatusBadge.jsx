export function JoiningBadge({ status }) {
  const map = {
    Joined: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    "Not Joined": "bg-rose-100 text-rose-700",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

export function PlacementBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        status === "Placed" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
      }`}
    >
      {status}
    </span>
  );
}

export function EligibleBadge({ eligible }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        eligible ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
      }`}
    >
      {eligible ? "Eligible" : "Not Eligible"}
    </span>
  );
}

export function DriveStatusBadge({ status }) {
  const map = {
    Completed: "bg-emerald-100 text-emerald-700",
    Scheduled: "bg-blue-100 text-blue-700",
    Cancelled: "bg-rose-100 text-rose-700",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}