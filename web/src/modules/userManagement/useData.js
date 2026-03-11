import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment/moment";
import { createUser, fetchUserDetail, fetchUsers, updateUser } from "../../reactQuery/services/user/userApi";
import { copyContent } from "../../utils";
import { Copy, Edit } from "lucide-react";
 
export const useUsers = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (params) => fetchUsers(params)
  })
  return { 
    fetchUsersData:mutate, 
    mutateAsync, 
    userData:data?.data, 
    totalCount:data?.count, 
    error, isPending, isSuccess, reset }
};


export const useCreateUser = () =>
  useMutation({
    mutationFn: (payload) => createUser(payload),
  });

export const useUpdateUser = () =>
  useMutation({
    mutationFn: (payload) => updateUser(payload),
  });

export const useUserDetail = (id) => {
  const { isLoading, refetch, data, isFetching } = useQuery({
    queryKey: ["UserDetail", id],
    queryFn: () => fetchUserDetail(id),
  });

  const user = data?.date; // ✅ your API returns { message, date: {...userData} }

  const basicDetail = {
    designation: { label: "Designation", value: user?.designation_name },

    name: { label: "Name", value: user?.name },

    employeeCode: { label: "Employee Code", value: user?.employee_id },

    mobile: {
      label: "Mobile Number",
      value: user?.contact_01,
      // action: { label: "Edit" },
    },

    email: { label: "Email ID", value: user?.email },

    birthDate: {
      label: "Date of Birth",
      value:
        user?.date_of_birth &&
        moment(user.date_of_birth).format("MMM D, YYYY"),
    },

    joiningDate: {
      label: "Date of Joining",
      value:
        user?.date_of_joining &&
        moment(user.date_of_joining).format("MMM D, YYYY"),
    },

    weeklyOff: { label: "Weekly Off", value: user?.weekly_off },

    status: { label: "Status", value: user?.status ? "Active" : "Inactive" },

    lastUpdatedBy: {
      label: "Last Updated By",
      value: user?.last_updated_by_name,
    },

    address: {
      label: "Address",
      value: `${user?.address || ""}, ${user?.area || ""}, ${
        user?.city || ""
      }, ${user?.district_name || ""}, ${user?.state_name || ""} - ${
        user?.pincode || ""
      }`
        .replace(/(, )+/g, ", ")
        .replace(/^, |, $/g, ""),
      action: {
        icon: Copy,
        onClick: () => copyContent(user?.address),
      },
    },

    lastUpdatedOn: {
      label: "Last Updated On",
      value:
        user?.last_updated_on &&
        moment(user.last_updated_on).format("MMM D, YYYY, h:mm:ss A"),
    },

    workingState: {
      label: "Working State",
      value: user?.working_state_name,
    },
  };

  const loginCredential = {
    username: { label: "Username", value: user?.username },
    password: { label: "Password", value: user?.password },
    loginType: { label: "Login Type", value: user?.login_type },
  };

  const assignedUsers = {
    assignUnit: { label: "Assigned Unit", value: user?.assign_unit },
    assignCompany: { label: "Assigned Company", value: user?.assign_company },
    warehouseId: { label: "Warehouse ID", value: user?.warehouse_id },
  };

  return {detail:user, isLoading, refetch, basicDetail, loginCredential, assignedUsers, isFetching };
};

