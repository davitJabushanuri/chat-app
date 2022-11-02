import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IMessageMutation {
  text: string;
  image: string;
  senderId: string | undefined;
  receiverId: string | undefined;
}

const useMessage = () => {
  const QueryClient = useQueryClient();

  return useMutation(
    ({ text, image, senderId, receiverId }: IMessageMutation) =>
      sendMessage({ text, image, senderId, receiverId }),
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
