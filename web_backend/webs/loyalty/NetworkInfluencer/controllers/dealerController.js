import prisma from "@shared/dbConfig/database.js";

export const createdealer = async (req, res, next) => {
  const { dealer_code, dealer_name, dealer_mobile } = req.body;
  const { id, name } = req.user;
  try {
    if (!dealer_code || !dealer_name || !dealer_mobile) {
      return res.status(400).json({ error: 'dealer_code, dealer_name, and dealer_mobile are required' });
    }
    const existing = await prisma.dealer_list.findFirst({
      where: { dealer_code, del: false }
    });
    if (existing) {
      return res.status(400).json({ error: 'Dealer code already exists' });
    }
    const dealer = await prisma.dealer_list.create({
      data: {
        dealer_code,
        dealer_name,
        dealer_mobile,
        created_by_id: id,
        created_by_name: name
      }
    });
    return res.status(201).json({ message: 'Dealer created successfully', dealer });
  } catch (error) {
    next(error);
  }
};

export const getdealerByCode = async (req, res, next) => {
  const { dealer_code } = req.params;
  try {
    const dealer = await prisma.dealer_list.findFirst({
      where: { dealer_code, del: false }
    });
    if (!dealer) {
      return res.status(404).json({ error: 'Dealer not found' });
    }
    return res.status(200).json({ dealer });
  } catch (error) {
    next(error);
  }
};

export const getALLdealerCode = async (req, res, next) => {
  const { page = 1, limit = 50, filters = {} } = req.body;
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const where = { del: false };
  if (filters.dealer_code) {
    where.dealer_code = { contains: filters.dealer_code };
  }
  if (filters.dealer_name) {
    where.dealer_name = { contains: filters.dealer_name };
  }
  if (filters.dealer_mobile) {
    where.dealer_mobile = { contains: filters.dealer_mobile };
  }

  try {
    const [dealer, total] = await prisma.$transaction([
      prisma.dealer_list.findMany({
        where,
        skip,
        take,
        orderBy: { date_created: 'desc' }
      }),
      prisma.dealer_list.count({ where })
    ]);
    return res.status(200).json({ dealer, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    next(error);
  }
};

export const updateDealer = async (req, res, next) => {
  const { id } = req.params;
  const { dealer_code, dealer_name, dealer_mobile } = req.body;
  try {
    const existing = await prisma.dealer_list.findFirst({
      where: { id: Number(id), del: false }
    });
    if (!existing) {
      return res.status(404).json({ error: 'Dealer not found' });
    }

    if (dealer_code && dealer_code !== existing.dealer_code) {
      const codeConflict = await prisma.dealer_list.findFirst({
        where: { dealer_code, del: false, id: { not: Number(id) } }
      });
      if (codeConflict) {
        return res.status(400).json({ error: 'Dealer code already exists' });
      }
    }

    const updated = await prisma.dealer_list.update({
      where: { id: Number(id) },
      data: {
        ...(dealer_code && { dealer_code }),
        ...(dealer_name && { dealer_name }),
        ...(dealer_mobile && { dealer_mobile })
      }
    });
    return res.status(200).json({ message: 'Dealer updated successfully', dealer: updated });
  } catch (error) {
    next(error);
  }
};

export const softDeleteDealer = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existing = await prisma.dealer_list.findFirst({
      where: { id: Number(id), del: false }
    });
    if (!existing) {
      return res.status(404).json({ error: 'Dealer not found' });
    }
    await prisma.dealer_list.update({
      where: { id: Number(id) },
      data: { del: true }
    });
    return res.status(200).json({ message: 'Dealer deleted successfully' });
  } catch (error) {
    next(error);
  }
};
