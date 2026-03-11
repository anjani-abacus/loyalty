import prisma from "@shared/dbConfig/database.js";


export const createdealer = async (req, res, next) => {
  const { dealer_code, dealer_name, dealer_mobile } = req.body;
  const { id, name } = req.user;
  try {
    const exitising = await prisma.dealer_list.findUnique({
      where: {
        dealer_code
      }
    })
    if (exitising) {
      return res.status(400).json({ error: 'Dealer already exists' });
    }
    const dealer = await prisma.dealer_list.create({
      data: {
        dealer_code,
        dealer_name,
        dealer_mobile,
        created_by_id: id,
        created_by_name: name
      }
    })
    return res.status(201).json({ message: 'Dealer created successfully', dealer: dealer });
  } catch (error) {
    next(error)
  }
}

export const getdealerByCode = async (req, res, next) => {
  const { dealer_code } = req.params;
  try {
    const dealer = await prisma.dealer_list.findUnique({
      where: {
        dealer_code: dealer_code
      }
    })
    if (!dealer)
      return res.status(404).json({ error: 'Dealer not found' });

    return res.status(200).json({ dealer });

  } catch (error) {
    next(error)
  }
}

export const getALLdealerCode = async (req, res, next) => {

  try {
    const dealer = await prisma.dealer_list.findMany()

    return res.status(200).json({ dealer });

  } catch (error) {
    next(error)
  }
}