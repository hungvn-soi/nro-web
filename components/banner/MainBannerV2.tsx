import { IServerStatus } from "@/types/serverStatus";
import ServerStatsBar, { ITopLevelProps } from "../ServerStatsBar";
import LeftBanner from "./LeftBanner";
import RightBanner from "./RightBanner";





interface IBannerProps{
    serverInfo: IServerStatus | null
    topLevel: ITopLevelProps | null
}

export default function BannerV2({ serverInfo, topLevel }: IBannerProps) {
    return (
        <section
            className="
                w-full
                bg-[url('/assets/banner/BannerHomeMobile.webp')]
                lg:bg-[url('/assets/BG3.webp')]
                bg-cover
                bg-center
                bg-no-repeat
            "
        >
            <div className="mx-auto flex lg:min-h-175 max-w-7xl flex-col justify-between">
                <div className="pt-10">
                    <div className="flex items-end justify-center gap-6 lg:justify-between">
                        <LeftBanner />

                        <div className="hidden lg:block">
                            <RightBanner />
                        </div>
                    </div>
                </div>

                <ServerStatsBar
                    severInfo={serverInfo}
                    topLevel={topLevel}
                />
            </div>
        </section>
    );
}