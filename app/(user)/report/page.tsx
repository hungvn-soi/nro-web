import BugReportForm from "@/components/report/BugReportForm"
import CommonBugTypes from "@/components/report/CommonBugTypes"
import ImportantNotice from "@/components/report/ImportantNotice"
import ProcessingTime from "@/components/report/ProcessingTime"
import SupportContact from "@/components/report/SupportContact"
import TitleBannerForm from "@/components/TilebannerForm"
import { Construction } from "lucide-react"

const Report = () => {

    return(
        <>
            <div className="w-full relative left-1/2 -translate-x-1/2 
                bg-[url('/assets/Baoloi/BaoLoiMobile.webp')]
                md:bg-[url('/assets/Baoloi/BaoLoiTablet.webp')]
                xl:bg-[url('/assets/Baoloi/BaoLoi.webp')]
                bg-center bg-cover bg-no-repeat lg:mt-[-50px] mt-0">
                <div className="md:min-h-125 min-h-60 flex  lg:justify-around justify-center items-center">
                    <TitleBannerForm
                        classBox="flex flex-col justify-between items-center"
                        title1="Báo lỗi"
                        ClassTitle1="!text-[140px], text-center text-white font-bold drop-shadow-lg"
                        subTitle="Gửi báo cáo lỗi để chúng tôi hoàng thiền và tăng tính trải nghiệm"
                    />
                </div>
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="lg:grid-cols-[70%_30%] grid gap-3 mt-3 grid-cols-1">
                {/** Left */}
                    <div className="">
                        <BugReportForm />
                    </div>
                {/** Right */}
                    <div className="space-y-6">
                        <ImportantNotice />
                        <CommonBugTypes />
                        <ProcessingTime />
                        <SupportContact />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Report