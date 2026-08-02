import { IEvent } from "@/types/event";
import { Flame } from "lucide-react";
import { Calendar } from "lucide-react";


interface IEventHot {
    data: IEvent | null;
}

const EventHot = ({ data }: IEventHot) => {

    if(!data) {
        return (
            <div className="text-center text-white text-2xl font-bold mt-10">
                Sự kiện nổi bật đang được cập nhật, vui lòng quay lại sau!
            </div>
        )
    }

    return(
        <div>
            {/**Title */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded">
                <Flame
                    size={22}
                    className="fill-orange-500 stroke-orange-500 text-orange-500"
                />

                <h2
                    className="
                    text-2xl
                    font-bold
                    uppercase
                    text-yellow-400
                    tracking-wide
                    drop-shadow-[1px_1px_0_#5a3200]
                    "
                    style={{
                        fontFamily: "var(--font-cinzel)", 
                    }}
                >
                    SỰ KIỆN NỔI BẬT
                </h2>
            </div>
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
                <div className="flex flex-col justify-center items-start px-4">
                    <h2
                        className="
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

                    <div className="flex justify-between items-center mt-7.5 w-full lg:mb-0 mb-4">
                        <div className="flex items-center gap-2 mt-2 text-yellow-400">
                            <Calendar  />
                            <p className="text-2xl">{`${data.startDate} - ${data.endDate}`}</p>
                        </div>
                        <button className="px-4 py-2 bg-linear-to-b from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300">
                            Xem chi tiết ...
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EventHot