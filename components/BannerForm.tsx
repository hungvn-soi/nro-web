import TitleBannerForm from "./TilebannerForm"
const BannerForm = () =>{
    return (
        <div className="w-full relative left-1/2 -translate-x-1/2 lg:bg-[url('/assets/banner/bannerNapThe.webp')] md:bg-[url('/assets/banner/napthe.tab.webp')] bg-[url('/assets/banner/Nap-the.Mobi.webp')] bg-center bg-no-repeat bg-cover">
            <div className="md:min-h-125 min-h-80 flex  lg:justify-around justify-center items-center">
                <TitleBannerForm
                    classBox="flex flex-col justify-between items-center"
                    title1="NẠP THẺ"
                    ClassTitle1="!text-[140px], text-center"
                    title2="NHẬN NGỌC - MUA VẬT PHẨM"
                    subTitle="Nhanh chóng - An toàn - Đa phương thức"
                />

            </div>
        </div>
    )
}
export default BannerForm