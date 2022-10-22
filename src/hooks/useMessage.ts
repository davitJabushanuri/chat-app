import { useMutation } from "@tanstack/react-query";

interface IMessageMutation {
  content: string;
  image: string;
  senderId: string | undefined;
  receiverId: string;
}

const useMessage = () => {
  return useMutation(
    ({ content, image, senderId, receiverId }: IMessageMutation) =>
      sendMessage({ content, image, senderId, receiverId })
  );
};

export default useMessage;

const sendMessage = async ({
  content,
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
        content,
        image,
        senderId,
        receiverId,
        conversationId: `${senderId}${receiverId}`,
      }),
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};
