import { prisma } from "@shared/config/database.js";
export const getSpinWin = async (req, res, next) => {
    try {
        const spinWin = await prisma.spin_win_user_record.findMany({
            where: {
                del: false,
            },
            select: {
                id: true,
                point_section: true,
                slab_point: true,
            },
          orderBy: { date_created: 'desc' },
        });

        res.status(200).json({
            status: true,
            message: "Spin win fetched successfully",
            data: spinWin,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const sendSpinWinPoints = async (req, res, next) => {
  try {
    const { slab_point, spin_id } = req.body;
    const { id, name, influencer_type_name } = req.user;

    const spinRecord = await prisma.spin_win_user_record.findFirst({
      where: { id: spin_id,  del: false },
      orderBy: { id: "desc" },
    });

    if (!spinRecord) {
      return res.status(404).json({ status: false, message: "Invalid spin record" });
    }

    const user = await prisma.influencer_customer.findUnique({
      where: { id: Number(id) },
      select: {
        current_wallet_balnc: true,
        total_spins_used: true,
      },
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });


    const totalEarnedSpins = 1 + Math.floor(user.current_wallet_balnc / 5000);
    const availableSpins = totalEarnedSpins - (user.total_spins_used || 0);
    if (availableSpins <= 0) {
      return res.status(400).json({ message: "No spins left" });
    }

    const result = await prisma.$transaction(async (tx) => {
      const prevBalRecord = await tx.influencer_customer.findFirst({
        where: { id },
        select: { current_wallet_balnc: true },
      });

        if (!prevBalRecord || prevBalRecord?.current_wallet_balnc === null || prevBalRecord?.current_wallet_balnc === undefined)   throw new Error('PREV_BALANCE_NOT_FOUND');

      const prevBal = prevBalRecord?.current_wallet_balnc || 0;

      const ledgerEntry = await tx.influencer_ledger.create({
        data: {
          date_created: new Date(),
          influencer_id: id,
          influencer_name: name,
          influencer_type: influencer_type_name,
          transaction_type_name: "BONUS",
          credit: slab_point,
          debit: 0,
          balance: prevBal + slab_point,
          transaction_remark: `Bonus against Spin & Win ${slab_point.toFixed(2)}`,
          type: "credit",
        },
      });

      const updatedCustomer = await tx.influencer_customer.update({
        where: { id },
        data: {
          current_wallet_balnc: prevBal + slab_point,
          last_wallet_update: new Date(),
          last_spin_date: new Date(),
          last_spin_point: String(slab_point),
          last_spin_id: spin_id,
          total_spins_used: { increment: 1 }
        },
      });

      return { ledgerEntry, updatedCustomer };
    });

    return res.status(200).json({
      status: true,
      message: `${slab_point} points added successfully!`,
      totalPoint: result.updatedCustomer.current_wallet_balnc,
    });

  } catch (error) {
    if (error instanceof Error && error.message === 'PREV_BALANCE_NOT_FOUND') {
      return res.status(400).json({ status: false, message: 'Previous wallet balance not found!' });
    }
    next(error);
  }
};


export const checkSpinEligibility= async (req, res) => {
  try {
    const { id } = req.user;

    if (!id)
      return res.status(400).json({ message: "userId  required" });

    const user = await prisma.influencer_customer.findUnique({
      where: { id: Number(id) },
      select: {
        current_wallet_balnc: true,
        total_spins_used: true,
      },
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const totalEarnedSpins = 1 + Math.floor(user.current_wallet_balnc / 5000);
    const availableSpins = totalEarnedSpins - (user.total_spins_used || 0);

      return res.json({
        total_points: user.current_wallet_balnc,
        totalEarnedSpins,
        usedSpins: user.total_spins_used || 0,
        availableSpins,
      });
    
  } catch (error) {
    console.error("Error in spin API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

