import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

const Messages = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  if (method === "POST") {
    const conversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          {
            users: {
              some: {
                id: body.senderId,
              },
            },
          },
          {
            users: {
              some: {
                id: body.receiverId,
              },
            },
          },
        ],
      },
    });

    if (conversation) {
      try {
        const message = await prisma.message.create({
          data: {
            text: body.text,
            image: body.image,
            senderId: body.senderId,
            receiverId: body.receiverId,
            conversationId: conversation.id,
          },
        });
        res
          .status(200)
          .json({ message: "Message created successfully", content: message });
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      const newConversation = await prisma.conversation.create({
        data: {
          users: {
            connect: [
              {
                id: body.senderId,
              },
              {
                id: body.receiverId,
              },
            ],
          },
        },
      });

      try {
        const message = await prisma.message.create({
          data: {
            text: body.text,
            image: body.image,
            conversationId: newConversation.id,
            senderId: body.senderId,
            receiverId: body.receiverId,
          },
        });

        return res.status(200).json(message);
      } catch (error) {
        return res.status(500).send(error);
      }
    }
  } else {
    res.status(405).send("Method not allowed");
  }
};

export default Messages;
