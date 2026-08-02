"use client"
import { IEvent } from "@/types/event";
import { Calendar } from "lucide-react"
import { useRouter } from "next/navigation";

interface IEventBox {
    data?: IEvent;
}

const EventBox = ({data}: IEventBox) => {
    const router = useRouter();
    return (
        <div className="w-full h-full text-white border-2 border-yellow-400 rounded-lg overflow-hidden ">

            {/**Image */}
            <div className="w-full h-60 md:h-80 lg:h-50 relative">
                <img
                    src={data?.image || "/assets/eventbaner.webp"}
                    alt="Event"
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-1 left-3 py-1 px-2 bg-red-500 rounded-xl"> {data?.badge || "None"} </div>
            </div>

            {/**Content */}
            <div className="flex flex-col items-center justify-center gap-4 px-4 pt-1">
                <div className="flex flex-col items-start">   
                    <h2 className="text-xl uppercase font-bold drop-shadow-[1px_1px_0_#5a3200]">
                        {data?.name || "Sự kiện hấp dẫn đang diễn ra"}
                    </h2>
                    <span className="line-clamp-2 text-sm leading-5 text-[#bfa3a3]">
                        {data?.description || "Hãy tham gia ngay để nhận những phần thưởng hấp dẫn và trải nghiệm những sự kiện đặc sắc trong Ngọc Rồng Zenz!"}

                    </span>
                    <div className="flex items-center gap-2 mt-2 text-yellow-400">
                        <Calendar size={20} className="inline-block mr-2" />
                        <span className="inline-block font-bold">{data?.startDate && data?.endDate ? `${data.startDate} - ${data.endDate}` : "vĩnh viễn"}</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center text-yellow-300 hover:text-yellow-500 font-bold text-xl mb-2 mt-3 cursor-pointer" onClick={() => router.push(`/event/${data?.id}`)}>
                Xem chi tiết
            </div>

        </div>
    )
}

export default EventBox