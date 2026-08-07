import DownloadBanner from "./DownloadBanner";

const BanerPage = () => {
    return (
        <section
            className="
                relative
                md:min-h-125 min-h-60
                lg:bg-[url('/assets/banner/BanerDowload2.webp')]
                bg-[url('/assets/banner/BanerDowload2Mobile.webp')]
                bg-no-repeat
                bg-cover
                bg-center
            "
        >
            <div className="max-w-7xl mx-auto h-full flex flex-col justify-between">
                <DownloadBanner />
            </div>
        </section>
    );
};

export default BanerPage;
