import BannerV2 from "@/components/banner/MainBannerV2"
import SectionTitle from "@/components/SectionTitle"
import SelectBXH from "@/components/selectBXH/SelectBXH"
import SelectEvent from "@/components/selectEvent/SelectEven"
import NoiBat from "@/components/selectNoiBat/selectNoiBat"
import Slider from "@/components/Slider"
import { getAllEvents } from "@/models/eventModel"
import { getTopPower } from "@/models/playerModel"

const HomePage = async () => {

    const topPower = await getTopPower();
    const getEvent = await getAllEvents();


    console.log("get event : ", getEvent)
    return(
        <>

            <div className="-mt-15">
                <BannerV2 />
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="pt-5">
                    <SectionTitle
                        title="Tính Năng Nổi Bật"
                        subtitle="Khám phá những tính năng đặc sắc có tại Ngọc Rồng Zenz"
                    />

                    <div className="mt-5">
                        {/* <NoiBat /> */}
                        <NoiBat />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 px-2">
                        <div className="rounded-2xl border border-blue-800/60 py-8 px-3">
                            <SelectEvent
                                dataEvents={getEvent}
                            />
                        </div>

                        <div className="rounded-2xl border border-blue-800/60 py-8 px-3">

                            <SelectBXH listTopPlayerPower={topPower} />

                        </div>

                    </div>
                </div>

                <div className="mt-5 px-2">
                    <SectionTitle
                        title="Hình Ảnh Game"
                    />
                    <Slider />
                </div>
            </div>
            
        </>
    )
}
export default HomePage