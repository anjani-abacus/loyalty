import { prisma } from "@shared/config/database.js";
import { config } from "@shared/config/env.js";
import { QueryType } from "@prisma/client";


export const ticketQuerytype = async (req, res, next) => {
  try {
    const result = Object.values(QueryType); 

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Ticket query type not found" });
    }

   return res.status(200).json({
      message: "Ticket query type found successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


export const createTicket = async (req, res,next) => {
  const { query_type, remark } = req.body;
  const { id, name } = req.user;
  const image = req.file?.key
    ? `${config.s3.publicUrl}/${req.file.key}`
    : null; 
    try{

    const result = await prisma.tickets.create({
        data:{
            ticket_query_type :query_type,
            remark,
            ...(image ? { image } : {}),
            created_by_id:id,
            created_by_name:name
        }
    })
    
  return  res.status(201).json({message:"Ticket created successfully",data:result})

}catch(error){
   next(error)
}
}

export const getTicketById = async(req,res,next)=>{
    try{
  const{id}=req.user;
  const result=await prisma.tickets.findMany({
    where:{
       created_by_id: id
    },
    orderBy:{
      date_created:"desc"
    }
  })
  if(!result){
    return res.status(404).json({message:"Ticket not found"})

  }
 return res.status(200).json({message:"Ticket found successfully",data:result})

}catch(error){
        next(error)
    
    }
}