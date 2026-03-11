
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";

// function ModuleRightsDialog({ open, onClose, role }) {

//   // if (isLoading) return null;
//   // if (isError) return <p className="text-red-500">Error loading modules</p>;

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-5xl">
//         <DialogHeader>
//           <DialogTitle>Update Module Rights - {role?.role_name}</DialogTitle>
//         </DialogHeader>

//         <div className="overflow-x-auto max-h-[400px]">
//           <table className="w-full border text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2 border">S.No</th>
//                 <th className="p-2 border">Module Name</th>
//                 <th className="p-2 border">View</th>
//                 <th className="p-2 border">Edit</th>
//                 <th className="p-2 border">Delete</th>
//                 <th className="p-2 border">Add</th>
//                 <th className="p-2 border">Download Excel</th>
//                 <th className="p-2 border">Upload Excel</th>
//                 <th className="p-2 border">Approval</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data?.data?.map((mod, index) => (
//                 <tr key={mod.id} className="text-center">
//                   <td className="border p-2">{index + 1}</td>
//                   <td className="border p-2 text-left">{mod.module_name}</td>
//                   <td className="border p-2">
//                     <input type="checkbox" defaultChecked={mod.view} />
//                   </td>
//                   <td className="border p-2">
//                     <input type="checkbox" defaultChecked={mod.edit} />
//                   </td>
//                   <td className="border p-2">
//                     <input type="checkbox" defaultChecked={mod.delete} />
//                   </td>
//                   <td className="border p-2">
//                     <input type="checkbox" defaultChecked={mod.add} />
//                   </td>
//                   <td className="border p-2">
//                     <input type="checkbox" defaultChecked={mod.export} />
//                   </td>
//                   <td className="border p-2">
//                     <input type="checkbox" defaultChecked={mod.import} />
//                   </td>
//                   <td className="border p-2">
//                     <input type="checkbox" defaultChecked={mod.approval} />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <DialogFooter>
//           <Button variant="ghost" onClick={onClose}>Cancel</Button>
//           <Button onClick={() => console.log("Update rights API here")}>
//             Update
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default ModuleRightsDialog;
