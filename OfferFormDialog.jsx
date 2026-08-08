import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { usePlacement } from "@/lib/PlacementContext";
import { useToast } from "@/components/ui/use-toast";
import { fmtDate } from "@/lib/placementAnalytics";

export default function OfferFormDialog({ open, onClose, onSaved, initialOffer = null, defaultStudentId = null }) {
  const { students, drives, getCompany, getDrive, createOffer, updateOffer } = usePlacement();
  const { toast } = useToast();
  const isEdit = !!initialOffer;
  const [form, setForm] = useState(
    initialOffer
      ? { ...initialOffer }
      : {
          student_id: defaultStudentId || "",
          drive_id: "",
          ctc: "",
          offer_date: "",
          joining_status: "Pending",
          placement_status: "Not Placed",
        }
  );

  const selectedStudent = students.find((s) => s.id === form.student_id);
  const selectedDrive = getDrive(form.drive_id);
  const selectedCompany = selectedDrive ? getCompany(selectedDrive.company_id) : null;

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    try {
      const payload = { ...form, ctc: Number(form.ctc) };
      if (isEdit) {
        await updateOffer(initialOffer.id, payload);
        toast({ title: "Offer updated successfully." });
      } else {
        await createOffer(payload);
        toast({ title: "Offer added successfully." });
      }
      onSaved && onSaved();
      onClose();
    } catch (e) {
      toast({ title: "Could not save offer", description: e.message, variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Placement Offer" : "Add Placement Offer"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground">Student Information</h4>
            <div>
              <Label>Student</Label>
              <Select value={form.student_id} onValueChange={(v) => set("student_id", v)} disabled={isEdit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name} ({s.un_number})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>UN Number</Label>
                <div className="py-2 text-sm">{selectedStudent?.un_number || "—"}</div>
              </div>
              <div>
                <Label>Program</Label>
                <div className="py-2 text-sm">{selectedStudent?.program || "—"}</div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground">Drive Information</h4>
            <div>
              <Label>Placement Drive</Label>
              <Select value={form.drive_id} onValueChange={(v) => set("drive_id", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Placement Drive" />
                </SelectTrigger>
                <SelectContent>
                  {drives.map((d) => {
                    const c = getCompany(d.company_id);
                    return (
                      <SelectItem key={d.id} value={d.id}>
                        {d.drive_name} — {c?.company_name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>Company</Label>
                <div className="py-2 text-sm">{selectedCompany?.company_name || "—"}</div>
              </div>
              <div>
                <Label>Drive Date</Label>
                <div className="py-2 text-sm">{selectedDrive ? fmtDate(selectedDrive.drive_date, "dd MMM yyyy") : "—"}</div>
              </div>
              <div>
                <Label>Mode</Label>
                <div className="py-2 text-sm">{selectedDrive?.mode || "—"}</div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground">Offer Information</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>CTC (LPA)</Label>
                <Input type="number" step="0.1" value={form.ctc} onChange={(e) => set("ctc", e.target.value)} placeholder="6.0" />
              </div>
              <div>
                <Label>Offer Date</Label>
                <Input type="date" value={form.offer_date} onChange={(e) => set("offer_date", e.target.value)} />
              </div>
              <div>
                <Label>Joining Status</Label>
                <Select value={form.joining_status} onValueChange={(v) => set("joining_status", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Pending", "Joined", "Not Joined"].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Placement Status</Label>
                <Select value={form.placement_status} onValueChange={(v) => set("placement_status", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Not Placed", "Placed"].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save}>{isEdit ? "Update Offer" : "Save Offer"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}