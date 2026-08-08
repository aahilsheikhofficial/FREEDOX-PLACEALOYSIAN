import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePlacement } from "@/lib/PlacementContext";
import { useToast } from "@/components/ui/use-toast";

export default function CompanyFormDialog({ open, onClose, onSaved, initial = null }) {
  const { createCompany, updateCompany } = usePlacement();
  const { toast } = useToast();
  const isEdit = !!initial;
  const [form, setForm] = useState(
    initial ? { ...initial } : { company_name: "", industry: "", location: "" }
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.company_name || !form.industry) {
      toast({ title: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    try {
      if (isEdit) {
        await updateCompany(initial.id, form);
        toast({ title: "Company updated successfully." });
      } else {
        await createCompany(form);
        toast({ title: "Company added successfully." });
      }
      onSaved && onSaved();
      onClose();
    } catch (e) {
      toast({ title: "Could not save company", description: e.message, variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Company" : "Add Company"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label>Company Name *</Label>
            <Input value={form.company_name} onChange={(e) => set("company_name", e.target.value)} />
          </div>
          <div>
            <Label>Industry *</Label>
            <Input value={form.industry} onChange={(e) => set("industry", e.target.value)} placeholder="IT / Consulting / Core" />
          </div>
          <div>
            <Label>Location</Label>
            <Input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Bengaluru" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save}>{isEdit ? "Update Company" : "Save Company"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}