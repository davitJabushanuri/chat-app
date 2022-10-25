import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany({
        include: {
          userConvarsations: {
            include: {
              conversation: true,
            },
          },
        },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(405).send("Method not allowed");
  }
};

export default Users;
