import BannerV2 from "@/components/banner/MainBannerV2";
import SectionTitle from "@/components/SectionTitle";
import SelectBXH from "@/components/selectBXH/SelectBXH";
import SelectEvent from "@/components/selectEvent/SelectEven";
import NoiBat from "@/components/selectNoiBat/selectNoiBat";
import { ITopLevelProps } from "@/components/ServerStatsBar";
import Slider from "@/components/Slider";

import { getAllEvents } from "@/models/eventModel";
import { getTopPower } from "@/models/playerModel";
import { getServerStatus } from "@/models/serverStatus";

export default async function HomePage() {

    const [topPower, events, serverInfo] = await Promise.all([
        getTopPower(),
        getAllEvents(),
        getServerStatus(),
    ]);

    const topLevel ={
        level: topPower[0].level,
        nameLevel: topPower[0].levelName
    }

    return (
        <>
            <div className="-mt-15">
                <BannerV2
                    serverInfo={serverInfo}
                    topLevel={topLevel}
                />
            </div>

            <main className="max-w-7xl mx-auto">
                {/* Tính năng nổi bật */}
                <section className="pt-5">
                    <SectionTitle
                        title="Tính Năng Nổi Bật"
                        subtitle="Khám phá những tính năng đặc sắc có tại Ngọc Rồng Zenz"
                    />

                    <div className="mt-5">
                        <NoiBat />
                    </div>

                    <div className="grid grid-cols-1 gap-6 mt-10 px-2 lg:grid-cols-2">
                        <div className="rounded-2xl border border-blue-800/60 py-8 px-3">
                            <SelectEvent dataEvents={events} />
                        </div>

                        <div className="rounded-2xl border border-blue-800/60 py-8 px-3">
                            <SelectBXH />
                        </div>
                    </div>
                </section>

                {/* Hình ảnh game */}
                <section className="mt-5 px-2 pb-10">
                    <SectionTitle title="Hình Ảnh Game" />

                    <div className="mt-5">
                        <Slider />
                    </div>
                </section>
            </main>
        </>
    );
}