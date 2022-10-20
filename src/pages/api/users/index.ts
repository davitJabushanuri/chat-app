// nextjs api route
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default Users;
