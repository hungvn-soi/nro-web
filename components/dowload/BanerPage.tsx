import DownloadBanner from "./DownloadBanner";

const BanerPage = () => {
    return (
        <section
            className="
                relative
                w-full
                h-75
                lg:h-150
                lg:bg-[url('/assets/banner/BanerDowload2.png')]
                bg-[url('/assets/banner/BanerDowload2Mobile.png')]
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
