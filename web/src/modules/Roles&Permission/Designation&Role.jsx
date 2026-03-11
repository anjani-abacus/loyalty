import { useState } from "react";
import { Eye, Pencil, Plus } from "lucide-react";
import { DataTable } from "../../layouts/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // shadcn ui dialog

import ModuleRightsDialog from "./Module"
const designationColumns = [
  {
    accessorKey: "id",
    header: "S.No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "created_at",
    header: "Date Created",
    cell: ({ row }) => (
      <Badge variant="outline">
        {new Date(row.original.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </Badge>
    ),
  },
  { accessorKey: "created_by_name", header: "Created By" },
  { accessorKey: "role_name", header: "Name" },
  {
    accessorKey: "actions",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            setSelectedRole(row.original);
            setOpenRights(true);
          }}
        >
          <Eye className="h-4 w-4 text-gray-600" />
        </Button>
        <Button size="icon" variant="ghost">
          <Pencil className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
    ),
  }

];

const DesignationndRole= () => {
  const [open, setOpen] = useState(false);
  const [openRights, setOpenRights] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const [formData, setFormData] = useState({ role_name: "", user_type: "System" });

  
  const handleSubmit = async () => {
    try {
      await createRole(formData).unwrap();
      setOpen(false);
      refetch();
    } catch (err) {
      console.error("Error creating role:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Error fetching roles</p>;

  return (
    <div>
      <DataTable
        pageTitle="Designation and Role"
        userData={data?.data || []}
        columns={designationColumns}
        buttonNavigation="/add-designation-and-role"
        onAddNew={() => setOpen(true)}
      />

      {/* Popup */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Role Name"
              value={formData.role_name}
              onChange={(e) => setFormData({ ...formData, role_name: e.target.value })}
              className="w-full border rounded p-2"
            />
            <input
              type="text"
              value={formData.user_type}
              disabled
              className="w-full border rounded p-2 bg-gray-100 text-gray-500"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogFooter>
          <ModuleRightsDialog
            open={openRights}
            onClose={() => setOpenRights(false)}
            role={selectedRole}
          />

        </DialogContent>
      </Dialog>
    </div>
  );
}
export default DesignationndRole;