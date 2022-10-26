import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

const Messages = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  if (method === "POST") {
    // connect conversation to users

    try {
      const message = await prisma.message.create({
        data: {
          content: body.content,
          image: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
        },
        include: {
          conversation: true,
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
