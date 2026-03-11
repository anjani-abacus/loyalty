import softDelete from "@shared/common/softDelete.js";
import prisma from "@shared/dbConfig/database.js";


const parseFlag = (val) => {
    if (val === 'true' || val === 1 || val === true || val === '1') return true;
    if (val === 'false' || val === 0 || val === false || val === '0') return false;
    return false; 
};

 export const createModule = async (req, res, next) => {
    try {
        const { id, name } = req.user;
        const { module_name, 
            department_name, 
            add,
            view,
            edit,
            delete: del,
            import: imp,
            export: exp,
            approval
         } = req.body;
        const accessFields = {
            add: parseFlag(add),
            view: parseFlag(view),
            edit: parseFlag(edit),
            delete: parseFlag(del),
            import: parseFlag(imp),
            export: parseFlag(exp),
            approval: parseFlag(approval)
        };
        const existingModule = await prisma.module_master.findFirst({
            where: {
                module_name: module_name,
                department_name: department_name,
                created_by_id: id ,
                created_by_name: name
            },
        });

        if (existingModule) {
            return res.status(409).json({
                success: false,
                message: "Module already exists in this department",
                data: null,
            });
        }

        const newModule = await prisma.module_master.create({
            data: { module_name,
                 department_name,
              ...accessFields,
                  created_by_id:id, 
                  created_by_name:name },
        },      
    );

        res.status(201).json({
            success: true,
            message: "Module created successfully",
            data: newModule,
        });
    } catch (err) {
        next(err);
    }
};
export const updateModule = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { module_name, department_name } = req.body;

        const updatedModule = await prisma.module_master.update({
            where: { id: Number(id) },
            data: { module_name, department_name },
        });
        res.status(200).json({ message: 'Module Master updated successfully', data: updatedModule });
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    const { page = 1, limit = 20, filters={} } = req.body;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    try {
        const modulesCount = await prisma.module_master.count({ where: { del: false } });
        const modules = await prisma.module_master.findMany(
            { where: { ...filters, del: false },
            skip,
            take,
        });
        res.status(200).json({message:'Successfully Fetched',count:modulesCount, data: modules });
    } catch (err) {
        next(err);
    }
};

export const softDeleteModule = async (req, res, next) => {
    try {
        const { id } = req.params;
        await softDelete('module_master', 'id', Number(id));
        res.status(200).json({ message: 'Module Master deleted successfully' });
    } catch (error) {
        next(error);
    }
}

export const createRole= async (req, res, next) => {
    try {
        const { id, name } = req.user;
        const { role_name ,  user_type} = req.body;

        const upsert = await prisma.roles.create({
            data: { role_name,
                 user_type,
                  created_at: new Date(),
                    created_by_id: id,
                     created_by_name: name },
                     
        },
    );
        res.status(200).json({ message: ' Role created successfully', data: upsert });
    } catch (error) {
        next(error);
    }
}

export const getAllRole = async (req, res, next) => {
    const { page = 1, limit = 20, filters={} } = req.body;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    try {
        const [rolesCount, roles] = await Promise.all([
            prisma.roles.count({ where: { del: false } }),
           prisma.roles.findMany({
            where: {...filters, del: false },
            skip,
            take,
               orderBy: { created_at: 'desc' },
        })
    ]);
        res.status(200).json({message:"Successfully Fetched!",count:rolesCount, data: roles });
    } catch (err) {
        next(err);
    }   
};

export const updateRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role_name, user_type } = req.body;
        const updatedRole = await prisma.roles.update({
            where: { id: Number(id) },
            data: { role_name, user_type },
        });
        res.status(200).json({ message: 'Designation and Role updated successfully', data: updatedRole });
    } catch (error) {
        next(error);
    }
};

export const softDeleteRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        await softDelete('roles', 'id', Number(id));
        res.status(200).json({ message: 'Designation and Role deleted successfully' });
    } catch (error) {
        next(error);
    }
};
// assigned v/s available
export const getModuleByDesignationId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const assignedModules = await prisma.assign_designation_module.findMany({
            where: {
                designation_id: Number(id),
                del: false
            },
            include: {
                module_master: {
                    select: {
                        sequence: true,
                        module_name:true,
                        module_url: true,
                        module_icon_keyword: true,
                        sequence:true,
                        group:true
                    }
                }
            },
            // orderBy: {
            //     module_master: {
            //         sequence: 'asc',
            //     },
            // },
        });

        if (assignedModules.length > 0) {
            return res.status(200).json({
                status: true,
                message: 'Fetched assigned modules successfully',
                data: assignedModules
            });
        }

        const allModules = await prisma.module_master.findMany({
            // orderBy: { sequence : 'asc' }
        });

        return res.status(200).json({
            status: true,
            message: 'No modules assigned yet — showing all modules',
            data: allModules
        });
    } catch (error) {
        next(error);
    }
};
export const upsertAssignDesignationModule = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { modules } = req.body;
        const { id: userId, name } = req.user;

        if (!Array.isArray(modules) || modules.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Modules should be a non-empty array.",
            });
        }


        const designation = await prisma.roles.findUnique({
            where: { id: Number(id) },
        });

        if (!designation) {
            return res.status(404).json({
                success: false,
                message: "Designation not found.",
            });
        }


        const results = await Promise.all(
            modules.map(async (mod) => {
                const accessFields = {
                    add: parseFlag(mod.add),
                    view: parseFlag(mod.view),
                    edit: parseFlag(mod.edit),
                    delete: parseFlag(mod.delete),
                    import: parseFlag(mod.import),
                    export: parseFlag(mod.export),
                    approval: parseFlag(mod.approval),
                    last_updated_by: userId,
                    last_updated_name: name,
                    last_updated: new Date(),
                };

                return await prisma.assign_designation_module.upsert({
                    where: {
                        designation_id_module_id: {
                            designation_id: Number(id),
                            module_id: Number(mod.module_id),
                        },
                    },
                    update: accessFields,
                    create: {
                        date_created: new Date(),
                        created_by_id: userId,
                        created_by_name: name,
                        designation_id: Number(id),
                        designation_name: designation.role_name,
                        module_id: Number(mod.module_id),
                        ...accessFields,
                    },
                });
            })
        );

        return res.status(200).json({
            success: true,
            message: "Modules upserted successfully.",
            count: results.length,
            data: results,
        });
    } catch (error) {
        console.error("Error in upsertAssignDesignationModule:", error);
        next(error);
    }
};

// PUT /designation/update-role
// export const assignDesignationModule = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const {
//             module_id,
//             module_name,
//             designation_name,
//             add,
//             view,
//             edit,
//             delete: del,
//             import: imp,
//             export: exp,
//             approval
//         } = req.body;
//         const accessFields = {
//             add: parseFlag(add),
//             view: parseFlag(view),
//             edit: parseFlag(edit),
//             delete: parseFlag(del),
//             import: parseFlag(imp),
//             export: parseFlag(exp),
//             approval: parseFlag(approval)
//         };

//         const existing = await prisma.assign_designation_module.findFirst({
//             where: {
//                 module_id: Number(module_id),
//                 designation_id: Number(id),
//                 designation_name
//             }
//         });

//         if (existing) {
//             return res.status(409).json({
//                 success: false,
//                 message: "This module is already assigned to this designation",
//                 data: null,
//             });
//         }
//         await prisma.assign_designation_module.create({
//             data: {
//                 module_id: Number(module_id),
//                 module_name,
//                 designation_id: Number(id),
//                 designation_name,
//                 date_created: new Date(),
//                 ...accessFields,
//                 created_by_id: req.user.id,
//                 created_by_name: req.user.name
//             }
//         },
//         );

//         return res.status(200).json({ message: 'Created Successfully', data: createdRecord });
//     } catch (error) {
//         next(error);
//     }
// };

// export const assignDesignationModule = async (req, res, next) => {
//     try {
//         const { id } = req.params;  
//         const { modules } = req.body; 
//         const { name, id: userId } = req.user;

//         if (!Array.isArray(modules) || modules.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Modules should be a non-empty array.",
//             });
//         }

        
//         const designation = await prisma.roles.findFirst({
//             where: { id: Number(id) },
//         });

//         if (!designation) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Designation not found.",
//             });
//         }

//         const formattedData = [];

//         for (const mod of modules) {
//             const {
//                 module_id,
//                 module_name,
//                 add,
//                 view,
//                 edit,
//                 delete: del,
//                 import: imp,
//                 export: exp,
//                 approval,
//             } = mod;

//             const existing = await prisma.assign_designation_module.findFirst({
//                 where: {
//                     module_id: Number(module_id),
//                     designation_id: Number(id),
//                 },
//             });

//             if (!existing) {
//                 formattedData.push({
//                     module_id: Number(module_id),
//                     module_name,
//                     designation_id: Number(id),
//                     designation_name: designation.designation_name,
//                     date_created: new Date(),
//                     add: parseFlag(add),
//                     view: parseFlag(view),
//                     edit: parseFlag(edit),
//                     delete: parseFlag(del),
//                     import: parseFlag(imp),
//                     export: parseFlag(exp),
//                     approval: parseFlag(approval),
//                     created_by_id: userId,
//                     created_by_name: name,
//                 });
//             }
//         }

//         if (formattedData.length === 0) {
//             return res.status(409).json({
//                 success: false,
//                 message: "All selected modules are already assigned.",
//             });
//         }

//         const createdRecords = await prisma.assign_designation_module.createMany({
//             data: formattedData,
//             skipDuplicates: true,
//         });

//         return res.status(200).json({
//             success: true,
//             message: "Modules assigned successfully.",
//             count: createdRecords.count,
//         });

//     } catch (error) {
//         next(error);
//     }
// };

// export const getAllAssignDesignationModule = async (req, res, next) => {
//     const { page = 1, limit = 20, filters = {} } = req.body;
//     const skip = (Number(page) - 1) * Number(limit);
//     const take = Number(limit);
//     try {
//         const assignedModulesCount = await prisma.assign_designation_module.count();
//         const assignedModules = await prisma.assign_designation_module.findMany({
//             where: { ...filters, del: false },
//             skip,
//             take,
//             orderBy: { date_created: 'asc' },
//             include: {
//                 module_master: true
//             }
//         });

//         res.status(200).json({ message: "Successfully Fetched!", count: assignedModulesCount, data: assignedModules });
//     } catch (err) {
//         next(err);
//     }
// };
// export const updateAssignDesignationModule = async (req, res, next) => {
//     try {
//         const { id } = req.params;  
//         const {
//             add,
//             view,   
//             edit,
//             delete: del,
//             import: imp,
//             export: exp,
//             approval
//         } = req.body;
//         const accessFields = {
//             add: parseFlag(add),
//             view: parseFlag(view),
//             edit: parseFlag(edit),
//             delete: parseFlag(del),
//             import: parseFlag(imp),
//             export: parseFlag(exp),
//             approval: parseFlag(approval)
//         };
//         const updatedAssignModule = await prisma.assign_designation_module.update({
//             where: { id: Number(id) },
//             data: { ...accessFields },
//         });
//         res.status(200).json({ message: 'Assigned Designation Module updated successfully', data: updatedAssignModule });
//     }
//     catch (error) {
//         next(error);
//     }
// };

// UPSERT FOR ASSIGNING

