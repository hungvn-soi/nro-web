"use client"

import { IEvent } from "@/types/event";
import InfoBox from "./InfoBox";

interface IInfoEventProps {
    eventData: IEvent | null;
}

const InfoEvent = ({ eventData }: IInfoEventProps) => {
  return (
    <div className="w-full h-full p-4 text-white">
          <InfoBox data={eventData} />
    </div>
  );
};

export default InfoEvent;