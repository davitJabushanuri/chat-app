import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

const Messages = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  if (method === "POST") {
    const conversationId = body.conversationId
      ? body.conversationId
      : await prisma.conversation.create({
          data: {
            id: body.receiverId + body.senderId,
          },
        });

    console.log(conversationId);

    // create message
    try {
      const message = await prisma.message.create({
        data: {
          content: body.content,
          image: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: conversationId.id,
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
