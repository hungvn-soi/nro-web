import { IEvent } from "@/types/event";
import { Flame } from "lucide-react";
import EventInfoTable from "./EventInfoTable";


interface IInfoBox {
    data: IEvent | null;
}

const InfoBox = ({ data }: IInfoBox) => {

    if(!data) {
        return (
            <div className="text-center text-white text-2xl font-bold mt-10">
                Sự kiện nổi bật đang được cập nhật, vui lòng quay lại sau!
            </div>
        )
    }

    const rows: { label: string; value: React.ReactNode }[] = [
        {
            label: "Thời gian bắt đầu",
            value: data.startDate,
        },
        {
            label: "Thời gian kết thúc",
            value: data.endDate,
        },
        {
            label: "Trạng thái",
            value: (
                <span className="inline-flex rounded-md bg-green-600/20 px-3 py-1 text-sm font-medium text-green-400 ring-1 ring-green-500/30">
                    {data.active ? "Đang diễn ra" : "Chưa bắt đầu"}
                </span>
            ),
        },
    ];

    return(
        <div>
            {/**Content */}
            
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 mt-4 border-2 border-yellow-400 rounded-lg lg:mx-4 mx-2">
                
                {/**Content Left */}
                <div className="text-white relative">
                    <img
                        src="/assets/eventbaner.png"
                        alt="Event Hot"
                        className="w-full h-full rounded-l-lg"
                    />
                    <div className="px-3 py-2 bg-red-600 absolute top-3 left-3 rounded-lg">{data.badge}</div>
                </div>


                {/**Content Right */}
                <div className="flex flex-col justify-around items-start px-4">
                    <h2
                        className="
                        lg:mt-2
                        md:text-5xl
                        text-[40px]
                        font-black
                        uppercase
                        bg-linear-to-b
                        from-white
                        via-yellow-100
                        to-yellow-500
                        bg-clip-text
                        text-transparent
                        drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)]
                        "
                    >
                        {data.name}
                    </h2>
                    <p className="text-lg text-gray-300 mt-4">
                        {data.description ? data.description : "Chào mừng đến với sự kiện hấp dẫn của Ngọc Rồng Zenz! Hãy tham gia ngay để nhận những phần thưởng đặc biệt và trải nghiệm những điều thú vị mà chúng tôi đã chuẩn bị cho bạn. Đừng bỏ lỡ cơ hội này!"}
                    </p>

                    <div className="w-full my-2">
                        <EventInfoTable data={rows} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default InfoBox