import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

const Messages = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  if (method === "POST") {
    // check if conversation exists
    try {
      const conversation = await prisma.conversation.findFirst({
        where: {
          OR: [
            {
              id: {
                equals: body.conversationId,
              },
            },
            {
              id: {
                equals: body.conversationIdReverse,
              },
            },
          ],
        },
      });

      // create conversation if it doesn't exist
      if (!conversation) {
        await prisma.userConversation.create({
          data: {
            userId: body.userId,
            conversation: {
              create: {
                id: body.conversationId,
              },
              connectOrCreate: {
                where: {
                  id: body.conversationIdReverse,
                },
              },
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    // create message
    try {
      const message = await prisma.message.create({
        data: {
          content: body.content,
          image: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: body.conversationId,
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
