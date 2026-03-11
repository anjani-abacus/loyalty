import { useState, useEffect } from "react";
import { DataTable } from "../../../layouts/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { designationColumns, moduleColumns } from "./Columns";
import {
  useGetAllDesignationRole,
  useCreateRoleDesignation,
  useUpdateRoleDesignation,
  useGetAllModule,
  useGetModulesByDesignationId,
  useUpdateModulesByDesignationId
} from "./useData";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import EditModal from "../edit";
import TableSkeleton from "../../../skeleton/tableSkeleton";

const initialValues = [{
  id: '',
  module_name: '',
  view: false,
  edit: false,
  delete: false,
  add: false,
  export: false,
  import: false,
  approval: false
}];

const DesignationAndRole = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [formData, setFormData] = useState({ role_name: "", user_type: "System" });
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [modalType, setModalType] = useState("add");

  const handleAdd = () => {
    setShowEditDialog(true);
  };

  const onDesignation = (role) => {
    setSelectedRole(role);
    setOpenEdit(true);
  }



  const { fetchModules, moduleData } = useGetAllModule();
  const { roleData, total, fetchRolesAsync, isPending } = useGetAllDesignationRole();
  const { mutate: createRole } = useCreateRoleDesignation();
  const { updateRoleDesignation } = useUpdateRoleDesignation();


  const onRefresh = () => {
    fetchRolesAsync({ user_type: "System" });

  }
  const onSave = (data) => {

    modalType == 'add' ?
      createRole({ role_name: data?.role_name, user_type: data?.data?.value },
        {
          onSuccess: () => {
            setTimeout(() => {
              fetchRolesAsync({ user_type: "System" });
            });
            setShowEditDialog(false);
          }
        }

      )
      : updateRoleDesignation({ id: data?.id, modules: { role_name: data?.role_name, user_type: data?.data?.value } },
        {
          onSuccess: () => {
            setTimeout(() => { fetchRolesAsync({ user_type: "System" }); });
            setShowEditDialog(false);
          }
        });
  }

  const isLoading = isPending;
  const methods = useForm({
    defaultValues: { modules: initialValues },
  });

  const { control, handleSubmit, reset } = methods;

  useEffect(() => {
    fetchRolesAsync({ user_type: "System" });
    fetchModules({ filters: {} }, {
      onSuccess: (data) => {
        reset({ modules: data?.data || initialValues });
      }
    })
  }, []);

  const handleEdit = (role) => {
    setSelectedRole(role);
    setModalType("edit")
    setFormData({
      role_name: role.role_name,
      user_type: role.user_type
    });
    setShowEditDialog(true);
  };


  const handleUpdateAccess = async (data) => {
    updateRoleDesignation({ id: selectedRole.id, modules: data.modules }, { onSuccess: () => { setOpenEdit(false); setTimeout(() => { fetchRolesAsync({ user_type: "System" }); }) } });
  };

  const handleCreate = async () => { }

  return (
    <div>
      <DataTable
        isLoading={isPending}
        pageTitle="Designation and Role"
        userData={roleData}
        columns={designationColumns({ onDesignation, onAdd: handleAdd, onEdit: handleEdit, page, limit })}
        handleAdd={handleAdd}
        onRefresh={onRefresh}
        renderSkeleton={() => <TableSkeleton columns={designationColumns({})} rows={limit} />}

        page={1}
        limit={50}
        setPage={setPage}
        setLimit={setLimit}
        total={total}
      />

      {/* Add Modal */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
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
            <Button variant="ghost" onClick={() => setOpenAdd(false)}>Cancel</Button>
            <Button onClick={handleSubmit(handleCreate)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Module Access</DialogTitle>
          </DialogHeader>
          <ModuleAccessTable selectedRole={selectedRole} />
          {/* <FormProvider {...methods}>
          <DataTable
            disableHeader={true}
            disableTabs={true}
            disableFooter={true}
            userData={moduleData} // ✅ Pass static data here
            columns={moduleColumns({control, watch:methods.watch, setValue: methods.setValue, handleTypeChange: () => { }, limit: 50, page: 1 })} // ✅ Use columns
            isLoading={false} // ✅ No loader
            defaultValue="PENDING"
            setTabValue={() => { }}
            setFilter={() => { }}
            onRefresh={() => { }}
            startPoint={0}
            setStartPoint={() => { }}
            page={1}
            limit={50}
            setPage={() => { }}
            setLimit={() => { }}
            total={moduleData.length}
          />
          </FormProvider> */}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button onClick={handleSubmit(handleUpdateAccess)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EditModal
        modalType={modalType}
        open={showEditDialog}
        setOpen={setShowEditDialog}
        reloadData={onRefresh}
        isLoading={isLoading}
        onSave={onSave}
        data={selectedRole}
        setSelectedRole={setSelectedRole}
      />
    </div>
  );
};

export default DesignationAndRole;



export const ModuleAccessTable = ({ selectedRole, title = '', disableUpdates = false }) => {

  const initialValues = [
    {
      id: "",
      module_name: "",
      view: false,
      edit: false,
      delete: false,
      add: false,
      export: false,
      import: false,
      approval: false,
    },
  ];

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // 🔹 Local state and form
  const methods = useForm({
    defaultValues: { modules: initialValues },
  });
  const { control, reset, watch, setValue } = methods;

  // 🔹 Fetch data
  const { fetchModulesById, moduleData } = useGetModulesByDesignationId()
  const { updateModule } = useUpdateModulesByDesignationId()


  useEffect(() => {
    
    fetchModulesById(selectedRole?.id)
  }, [])

  useEffect(() => {
    fetchModulesById(selectedRole?.id,
      {
        onSuccess: (data) => {
          reset({ modules: data?.data || initialValues });
        },
      }
    );
  }, []);

  const onRefresh = () => {
    fetchModulesById(selectedRole?.id,
      {
        onSuccess: (data) => {
          reset({ modules: data?.data || initialValues });
        },
      }
    );
  }

  return (
    <FormProvider {...methods}>
      <DataTable
        title={title}
        disableHeader={true}
        disableTabs={!title}
        disableFooter={true}
        userData={moduleData}
        columns={moduleColumns({ control, disableUpdates, watch: methods.watch, setValue: methods.setValue, handleTypeChange: () => { }, limit: 50, page: 1 })} // ✅ Use columns
        isLoading={false} // ✅ No loader
        defaultValue="PENDING"
        setTabValue={() => { }}
        setFilter={() => { }}
        onRefresh={onRefresh}
        startPoint={0}
        setStartPoint={() => { }}
        page={1}
        limit={50}
        setPage={() => { }}
        setLimit={() => { }}
        total={moduleData.length}
      />
    </FormProvider>
  );
};