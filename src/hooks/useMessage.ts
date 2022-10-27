import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IMessageMutation {
  content: string;
  image: string;
  senderId: string | undefined;
  receiverId: string | undefined;
  conversationId: string;
}

const useMessage = () => {
  const QueryClient = useQueryClient();

  return useMutation(
    ({
      content,
      image,
      senderId,
      receiverId,
      conversationId,
    }: IMessageMutation) =>
      sendMessage({ content, image, senderId, receiverId, conversationId }),
    {
      onSuccess: () => {
        console.log("Message sent successfully");
        QueryClient.invalidateQueries(["users"]);
      },
      onError: () => {
        console.log("Error sending message");
      },
    }
  );
};

export default useMessage;

const sendMessage = async ({
  content,
  image,
  senderId,
  receiverId,
  conversationId,
}: IMessageMutation) => {
  try {
    const message = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        image,
        senderId,
        receiverId,
        conversationId,
      }),
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};
