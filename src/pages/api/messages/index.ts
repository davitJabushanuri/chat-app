import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

const Messages = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const message = await prisma.message.create({
        data: {
          content: req.body.content,
          image: req.body.image,
          authorId: req.body.userId,
          roomId: req.body.roomId,
        },
      });
      res
        .status(200)
        .json({ message: "Message created successfully", content: message });
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(405).send("Method not allowed");
  }
};

export default Messages;
