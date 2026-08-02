"use client"
import { IEvent } from "@/types/event";
import { Star } from "lucide-react"
import EventBox from "./eventBox";
import Carousel from "../CoroselBase";


interface IEventAll {
    data: IEvent[] | null;
}

const EventAll = ({ data }: IEventAll) => {
    if(!data) {
        return (
            <div className="text-center text-white text-2xl font-bold mt-10">
                Sự kiện đang được cập nhật, vui lòng quay lại sau!
            </div>
        )
    }

    console.log(data)

    
    return (
        <div>
          {/**Title */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded ">
              <Star
                  size={22}
                  className="fill-yellow-400 stroke-yellow-400 text-yellow-400"
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

            <div>
                <Carousel
                    data={data}
                    renderItem={(event) => <EventBox data={event} key={event.id} />}
                    mobile={1}
                    tablet={2}
                    desktop={5}
                    autoplay={true}
                    delay={3000}
                    loop={true}
                />
            </div>
        </div>
    )
}
export default EventAll