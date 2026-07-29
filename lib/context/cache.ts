import { unstable_cache } from "next/cache";
import { getTopPower } from "@/models/playerModel";
import { getAllEvents } from "@/models/eventModel";

export const getTopPowerCached = unstable_cache(
    async () => {
        return await getTopPower();
    },
    ["top-power"],
    {
        revalidate: 300, // 5 phút
    }
);

export const getAllEventsCached = unstable_cache(
    async () => {
        return await getAllEvents();
    },
    ["events"],
    {
        revalidate: 300, // 5 phút
    }
);