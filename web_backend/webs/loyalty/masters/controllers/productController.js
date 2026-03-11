import softDelete from "@shared/common/softDelete.js";
import prisma from "@shared/dbConfig/database.js";
import { config } from "@shared/utils/env.js";
import buildPrismaFilters from "@shared/common/buildPrismaFilters.js";

export const createpointCatgeory = async (req, res, next) => {
    try {
        const { point_category_name, contractor_point, painter_point } = req.body;
        const { id, name } = req.user;

        const createdData = await prisma.point_category_master.create({
            data: {
                point_category_name,
                contractor_point,
                painter_point,
                date_created: new Date(),
                created_by_id: id,
                created_by_name: name
            },
        },
        )
        console.log("Created Data:", createdData);
        return res.status(201).json({ status: true, message: "Successfully Created!", data: createdData })
    } catch (error) {
        next(error)
    }
}
export const getAllPointCategory = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, filters = {} } = req.body;
        const data = await prisma.point_category_master.findMany({
            where: { ...filters, del: false },
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit),
            orderBy: { date_created: 'desc' },
        });
        const totalCount = await prisma.point_category_master.count({ where: { del: false } });
        return res.status(201).json({ status: true, message: "Successfully Fetched !", count: totalCount, data: data });
    } catch (error) {
        next(error)
    }
}

export const updatePointCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { point_category_name, contractor_point, painter_point } = req.body;
        const UpdatedData = await prisma.point_category_master.update({
            where: {
                id: Number(id),
            },
            data: {
                point_category_name,
                contractor_point,
                painter_point,
                last_updated_by: req.user.id,
                last_updated_by_name: req.user.name,
                last_updated_on: new Date()
            }
        })
        return res.status(200).json({ status: true, message: "Successfully Updated !", data: UpdatedData });
    } catch (error) {
        next(error);
    }

}
export const deletePointCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        await softDelete('point_category_master', 'id', Number(id))
        return res.status(200).json({ status: true, message: "Successfully Deleted !" });
    } catch (error) {
        next(error);
    }
}
// creating product
export const upsertProduct = async (req, res, next) => {
    const {
        product_name,
        product_code,
        mrp,
        brand,
        uom,
        product_size,
        master_packing_size,
        small_packing_size,
        product_scan,
        description,
        qty,
        point_category_name,
        category_name,
        sub_category_name
    } = req.body;

    const image = req.file?.key
        ? `${config.s3.publicUrl}/${req.file.key}`
        : null;
    const { id, name } = req.user
    try {
        const existingProduct = await prisma.master_product.findUnique({
            where: { product_code },
        });
        if (existingProduct) {
            return res.status(400).json({ success: false, message: "Product already exists" });
        }
        const existingPointCategory = await prisma.point_category_master.findFirst({
            where: { point_category_name }
        })
        if (!existingPointCategory) {
            return res.status(404).json({ message: 'Point Category name not found!' })
        }
        const existingCategory = await prisma.master_category.findFirst({
            where: { category: category_name }
        })
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category name not found!' })
        }
        const existingSubCategory = await prisma.master_sub_category.findFirst({
            where: { sub_category_name }
        })
        if (!existingSubCategory) {
            return res.status(404).json({ message: 'Sub-Category name not found!' })
        }
        // 1. Upsert Product
        const product = await prisma.master_product.create({
            data: {
                product_name,
                product_code,
                mrp,
                brand,
                uom: uom ? uom : null,
                product_size,
                master_packing_size,
                small_packing_size,
                product_scan,
                description,
                point_category_id: Number(existingPointCategory.id),
                point_category_name,
                qty,
                category_id: Number(existingCategory.id),
                category_name,
                sub_category_id: Number(existingSubCategory.id),
                sub_category_name,
                date_created: new Date(),
                created_by_id: id,
                created_by_name: name,
            }
        })

        // 2. Upload image to master_product_images
        if (image) {
            await prisma.master_product_images.create({
                data: {
                    product_id: product.id,
                    image,
                    created_by_id: id,
                    created_by_name: name,
                    date_created: new Date(),
                }
            },
            );
        }

        res.status(201).json({ success: true, message: "Successfully Created!", data: product });


    } catch (error) {
        console.error("Upsert Error:", error);
        next(error);
    }
};
export const getProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await prisma.master_product.findUnique({
            where: { id: Number(id) },
            include: {
                images: {
                    select: {
                        image: true,
                    }
                },
                category: true,
                subCategory: true,
                pointCatgory: true

            }
        });
        if (!product || product.del) {
            return res.status(404).json({ success: false, message: "Product not found or deleted" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};
export const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const {
        product_name,
        product_code,
        mrp,
        brand,
        uom,
        product_size,
        master_packing_size,
        small_packing_size,
        product_scan,
        description,
        qty,
        point_category_id,
        point_category_name,
        category_id,
        category_name,
        sub_category_id,
        sub_category_name
    } = req.body;
    const image = req.file?.key
        ? `${config.s3.publicUrl}/${req.file.key}`
        : null;
    try {
        // Check if product exists
        const existing = await prisma.master_product.findUnique({
            where: { id: Number(id), del: false },
        });
        if (!existing) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }
        const updatedProduct = await prisma.master_product.update({
            where: { id: Number(id) },
            data: {
                last_update_date: new Date(),
                last_update_by: req.user.id,
                last_updated_by_name: req.user.name,

                ...(product_name !== undefined && { product_name }),
                ...(product_code !== undefined && { product_code }),
                ...(mrp !== undefined && { mrp: Number(mrp) }),
                ...(brand !== undefined && { brand }),
                ...(uom !== undefined && { uom }),
                ...(product_size !== undefined && { product_size }),
                ...(master_packing_size !== undefined && { master_packing_size: Number(master_packing_size) }),
                ...(small_packing_size !== undefined && { small_packing_size: Number(small_packing_size) }),
                ...(product_scan !== undefined && { product_scan }),
                ...(description !== undefined && { description }),
                ...(qty !== undefined && { qty: Number(qty) }),

                ...(point_category_id !== undefined && {
                    point_category_id: point_category_id ? Number(point_category_id) : null
                }),

                ...(point_category_name !== undefined && { point_category_name }),

                ...(category_id !== undefined && {
                    category_id: category_id ? Number(category_id) : null
                }),

                ...(category_name !== undefined && { category_name }),

                ...(sub_category_id !== undefined && {
                    sub_category_id: sub_category_id ? Number(sub_category_id) : null
                }),

                ...(sub_category_name !== undefined && { sub_category_name }),
            },
            include: {
                images: {
                    select: {
                        image: true,
                    }
                }
            }
        });
        if (image) {
            const existingImage = await prisma.master_product_images.findFirst({
                where: { product_id: Number(updatedProduct.id) },
            });

            if (existingImage) {
                await prisma.master_product_images.update({
                    where: { id: existingImage.id },
                    data: {
                        image,
                        last_updated_on: new Date(),
                        last_updated_by: req.user.id,
                        last_updated_by_name: req.user.name,
                    },
                });
            } else {
                await prisma.master_product_images.create({
                    data: {
                        product_id: updatedProduct.id,
                        image,
                        created_by_id: req.user.id,
                        created_by_name: req.user.name,
                        date_created: new Date(),
                    },
                });
            }
        }

        res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        next(error);
    }
};

export const getAllProducts = async (req, res, next) => {
    const { page = 1, limit = 20, filters = {} } = req.body;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    try {
        const fieldTypes = {
            category_name: "string",
            sub_category_name: "string",
            product_name: "string",
            product_code: "string",
            brand: "string",
            status: "boolean",
            date_created: "date"
        };

        const where = buildPrismaFilters(filters, fieldTypes);
        const productsCount = await prisma.master_product.findMany();
        const products = await prisma.master_product.findMany({
            where,
            orderBy: { date_created: 'desc' },
            skip,
            take,
            include: {
                images: {
                    select: {
                        image: true,
                    }
                },
                category: true,
                subCategory: true,
                pointCatgory: true
            }
        });
        const totalActive = productsCount.filter(c => c.status === true || c.status === 'true').length;
        const totalInactive = productsCount.length - totalActive;
        res.status(200).json({
            success: true, count: productsCount.length,
            totalActive,
            totalInactive
            , data: products
        });
    } catch (error) {
        next(error)
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

export const deleteProduct = async (req, res, next) => {
    const { id } = req.params;

    try {

        await softDelete('master_product', 'id', Number(id))

        res.status(200).json({ success: true, message: "Product  deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const updateProductStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // check if product exists
        const existing = await prisma.master_product.findUnique({
            where: { id: Number(id) },
        });

        if (!existing || existing.del) {
            return res.status(404).json({ message: "Product not found or deleted" });
        }

        const updated = await prisma.master_product.update({
            where: { id: parseInt(id) },
            data: {
                status,
                last_update_date: new Date(),
                last_update_by: req.user.id,
                last_updated_by_name: req.user.name,
            },
        });

        res.status(200).json({
            success: true,
            message: "Product status updated successfully",
            data: updated,
        });
    } catch (error) {
        console.error("Update Product Status Error:", error);
        next(error);
    }
};
