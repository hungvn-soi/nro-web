import TitleBannerForm from "./TilebannerForm"

const BannerForm = () =>{
    return (
        <div className="w-full relative left-1/2 -translate-x-1/2 lg:bg-[url('/assets/banner/bannerNapThe.jpeg')] bg-[url('/assets/banner/BannerHomeMobile.png')] bg-center bg-no-repeat bg-cover">
            <div className="min-h-125 flex  justify-around items-center">
                
                <TitleBannerForm
                    classBox="flex flex-col justify-between items-center"
                    title1="NẠP THẺ"
                    ClassTitle1="!text-[140px]"
                    title2="NHẬN NGỌC - MUA VẬT PHẨM"
                    subTitle="Nhanh chóng - An toàn - Đa phương thức"
                />

            </div>
        </div>
    )
}
export default BannerForm