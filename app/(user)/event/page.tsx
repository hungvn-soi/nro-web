import EventAll from "@/components/event/EventAll"
import EventHot from "@/components/event/EventHot"
import TitleBannerForm from "@/components/TilebannerForm"
import { getAllEvents, getHotEvent } from "@/models/eventModel"

const SuKien = async() => {


    const [eventHot, events] = await Promise.all([
            getHotEvent(),
            getAllEvents(),
        ]);
        
    return (
        <div className="lg:mt-[-50px] mt-0">
            <div className="w-full relative left-1/2 -translate-x-1/2 
                    bg-[url('/assets/event/event-mobi.webp')]
                    md:bg-[url('/assets/event/event-tablet.webp')]
                    xl:bg-[url('/assets/event/event.webp')]
                    bg-center bg-cover bg-no-repeat">
                <div className="md:min-h-125 min-h-60 flex  lg:justify-around justify-center items-center">

                    <TitleBannerForm
                        classBox="flex flex-col justify-between items-center"
                        title1="Sự Kiện"
                        ClassTitle1="!text-[140px], text-center text-white font-bold drop-shadow-lg"
                        title2="Nơi có những thứ hấp dẫn"
                        subTitle="Cập nhật những sự kiện hấp dẫn và phần thưởng đặc biệt đang diễn ra trong Ngọc Rồng Zenz"
                    />

                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                <EventHot data={eventHot} />

                <EventAll data={events} />
            </div>
        </div>
    )
}

export default SuKien