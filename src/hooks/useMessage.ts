import { IConversation, IUser } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IMessageMutation {
  text: string;
  image: string;
  senderId: string | undefined;
  receiverId: string | undefined;
}

const useMessage = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ text, image, senderId, receiverId }: IMessageMutation) =>
      sendMessage({ text, image, senderId, receiverId }),
    {
      /*     onMutate: async ({
        text,
        image,
        senderId,
        receiverId,
      }: IMessageMutation) => {
        await queryClient.cancelQueries(["users"]);

        const previousUsers = queryClient.getQueryData(["users"]);
        console.log(previousUsers);

        if (previousUsers)
          queryClient.setQueryData(["users"], () => {
            const user = [...previousUsers].find((user: IUser) => {
              return user.id === senderId;
            });

            const conversation = previousUsers.find(
              (conversation: IConversation) =>
                (conversation?.messages[0]?.senderId === senderId &&
                  conversation?.messages[0]?.receiverId === receiverId) ||
                (conversation?.messages[0]?.senderId === receiverId &&
                  conversation?.messages[0]?.receiverId === senderId)
            );
            return {
              ...previousUsers,

              [previousUsers.indexOf(conversation)]: {
                ...conversation,
                messages: [
                  ...conversation.messages,
                  { text, image, senderId, receiverId },
                ],
              },
            };
          });

        return { previousUsers };
      },
  */
      onSuccess: () => {
        console.log("Message sent successfully");
      },
      onError: (err, variables, context) => {
        console.log("Error:", err);
        // if (context?.previousUsers)
        //   queryClient.setQueryData(["users"], context.previousUsers);
      },

      onSettled: () => {
        queryClient.invalidateQueries(["users"]);
      },
    }
  );
};

export default useMessage;

const sendMessage = async ({
  text,
  image,
  senderId,
  receiverId,
}: IMessageMutation) => {
  try {
    const message = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        image,
        senderId,
        receiverId,
      }),
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};
