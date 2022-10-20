import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

const Rooms = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const rooms = await prisma.room.findMany();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).send(error);
    }
  } else if (req.method === "POST") {
    try {
      const room = await prisma.room.create({
        data: {
          name: req.body.name,
          users: {
            connect: req.body.users,
          },
        },
      });
      res
        .status(200)
        .json({ message: "Room created successfully", content: room });
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(405).send("Method not allowed");
  }
};

export default Rooms;
