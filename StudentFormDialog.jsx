import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { usePlacement } from "@/lib/PlacementContext";
import { useToast } from "@/components/ui/use-toast";
import { PROGRAMS, DEPARTMENTS } from "@/lib/placementAnalytics";

export default function StudentFormDialog({ open, onClose, onSaved }) {
  const { createStudent } = usePlacement();
  const { toast } = useToast();
  const [form, setForm] = useState({
    un_number: "",
    name: "",
    department: "CSE",
    program: "CSE-AIML",
    academic_year: "2026",
    semester: "Semester 6",
    eligible: true,
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.un_number || !form.name) {
      toast({ title: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    try {
      await createStudent(form);
      toast({ title: "Student added successfully." });
      onSaved && onSaved();
      onClose();
    } catch (e) {
      toast({ title: "Could not add student", description: e.message, variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>UN Number *</Label>
            <Input value={form.un_number} onChange={(e) => set("un_number", e.target.value)} placeholder="UN001" />
          </div>
          <div>
            <Label>Student Name *</Label>
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Full name" />
          </div>
          <div>
            <Label>Department</Label>
            <Select value={form.department} onValueChange={(v) => set("department", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Program</Label>
            <Select value={form.program} onValueChange={(v) => set("program", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROGRAMS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Academic Year</Label>
            <Input value={form.academic_year} onChange={(e) => set("academic_year", e.target.value)} placeholder="2026" />
          </div>
          <div>
            <Label>Semester</Label>
            <Input value={form.semester} onChange={(e) => set("semester", e.target.value)} placeholder="Semester 6" />
          </div>
          <div className="col-span-2 flex items-center gap-3 pt-1">
            <Switch checked={form.eligible} onCheckedChange={(v) => set("eligible", v)} id="elig" />
            <Label htmlFor="elig" className="cursor-pointer">
              Eligible for placement
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save}>Save Student</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}