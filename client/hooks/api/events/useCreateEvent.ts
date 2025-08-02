import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateEvent = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: (eventData: any) => createEvent(eventData),
  });

  return { isPending, mutate };
};

const createEvent = async (eventData: any) => {
  const response = (await api.post("/event", eventData)) as {
    ok: boolean;
    data: any;
  };
  if (!response.ok) {
    throw new Error("Failed to create event");
  }
  return response.data;
};
