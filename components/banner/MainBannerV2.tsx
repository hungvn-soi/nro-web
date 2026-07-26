import ServerStatsBar from "../ServerStatsBar";
import LeftBanner from "./LeftBanner";
import RightBanner from "./RightBanner";

export default function BannerV2() {
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
            <div className="mx-auto flex min-h-175 lg:min-h-201.25 max-w-7xl flex-col justify-between">
                <div className="pt-10">
                    <div className="flex items-end justify-center gap-6 lg:justify-between">
                        <LeftBanner />

                        <div className="hidden lg:block">
                            <RightBanner />
                        </div>
                    </div>
                </div>

                <ServerStatsBar />
            </div>
        </section>
    );
}