import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// Liveblocks klientini yaratish
const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY || '',
  throttle: 100,
});

// Room kontekstini yaratish
export const {
  RoomProvider,
  useRoom,
  useStorage,
  useMutation,
  useSelf,
  useOthers,
  useMyPresence,
  useUpdateMyPresence,
  suspense: {
    RoomProvider: RoomProviderWithSuspense,
    useRoom: useRoomWithSuspense,
    useStorage: useStorageWithSuspense,
    useMutation: useMutationWithSuspense,
    useSelf: useSelfWithSuspense,
    useOthers: useOthersWithSuspense,
  },
} = createRoomContext(client); 