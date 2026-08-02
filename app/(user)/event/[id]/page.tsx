import InfoEvent from "@/components/event/InfoEvent";
import { GetEventByID } from "@/models/eventModel";

interface Props {
  params: Promise<{
    id: string;
  }>;
}
const ChiThietEvent = async ({ params }: Props) => {
  const { id } = await params;
  
  const event = await GetEventByID(Number(id));

  return (
    <div className="max-w-7xl mx-auto">
      <InfoEvent eventData={event} />
    </div>
  );
}

export default ChiThietEvent;