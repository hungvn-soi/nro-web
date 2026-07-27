"use client"
import BanerPage from "@/components/dowload/BanerPage"
import DownloadItem from "@/components/dowload/DowloadItem"
import DownloadFrame from "@/components/dowload/DownloadFrame"
import { FaWindows, FaAndroid, FaApple } from "react-icons/fa";
import {
    Rocket,
    Server,
    Calendar,
    Download,
    Shield,
    Check,
    CloudDownload,
    FolderLock,
    UserRoundPlus,
    Gamepad2,
} from "lucide-react";
import { ReactNode } from "react";
import StepIcon from "@/components/dowload/StepIcon";

const data = [
    { icon: <FaWindows color="#0078D4"/>, title:"Windows Client", subTitle:"Cài đặt nhanh - Tự động cập nhật", btnText:"Dowload"},
    { icon: <FaAndroid color="#3DDC84"/>, title: "APK Android", subTitle: "Cài đặt nhanh", btnText: "Dowload" },
    { icon: <FaApple color="#007AFF" />, title: "IOS ( Sắp có )", subTitle: "Chúng tôi đang phát triển", btnText: "Apple Store", disabled : true},

]

const data2 = [
    {
        number: 1,
        icon: <CloudDownload color="white" size={50} />,
        titleDown: "Tải Game",
        subTitle: "Chọn bản phù hợp và dowload"
    },
    {
        number: 2,
        icon: <FolderLock color="yellow" size={50} />,
        titleDown: "Giải Nén",
        subTitle: "Giải nén và cài đặt"
    },
    {
        number: 3,
        icon: <UserRoundPlus color="white" size={50} />,
        titleDown: "Đăng Nhập",
        subTitle: "Mở game và đăng nhập"
    },
    {
        number: 4,
        icon: <Gamepad2 color="white" size={50} />,
        titleDown: "Bắt Đầu Chơi",
        subTitle: "Thỏa sức thể hiện mình"
    }
]

const DowloadGame = () => {
    const HandleClick = () => {
        alert("clieck 123123")
    }
    return(
        <div>
            <div className="-mt-12.5">
                <BanerPage />
            </div>

            <div className="mt-10 max-w-7xl mx-auto">
                <div className="grid gap-3 grid-cols-1 lg:px-0 px-2 ">
                    <div className="w-full">
                        <DownloadFrame title="DOWLOAD NGAY ">
                            {
                                data.map((item, index) => (
                                    <DownloadItem
                                        key={index}
                                        icon={item.icon}
                                        title={item.title}
                                        subtitle={item.subTitle}
                                        buttonText={item?.btnText}
                                        disabled={item?.disabled}
                                        onClick={HandleClick}
                                    />
                                ))
                            }
                        </DownloadFrame>
                    </div>

                    <div className="w-full lg:mt-0 mt-5">
                        <DownloadFrame title="Thông tin game">
                            <div className="gap-[10px] flex flex-col">
                                <div className="text-white flex justify-between items-center pb-3 border-b-2 border-[#27adff38]">
                                    <div className="flex gap-5">
                                        <Rocket color="white" />
                                        <p>Phiên Bản</p>
                                    </div>
                                    <div className="text-yellow-400 font-bold">2.3.5</div>
                                </div>

                                <div className="text-white flex justify-between items-center pb-3 border-b-2 border-[#27adff38]">
                                    <div className="flex gap-5">
                                        <Server color="white" />
                                        <p>Server</p>
                                    </div>
                                    <div className="text-green-500 font-bold"> ONLINE</div>
                                </div>

                                <div className="text-white flex justify-between items-center pb-3 border-b-2 border-[#27adff38]">
                                    <div className="flex gap-5">
                                        <Calendar color="white" />
                                        <p>Ngày cập nhật</p>
                                    </div>
                                    <div className="text-yellow-400 font-bold">20/07/2026</div>
                                </div>
                                <div className="text-white flex justify-between items-center pb-3 border-b-2 border-[#27adff38]">
                                    <div className="flex gap-5">
                                        <Download color="white" />
                                        <p>Dung lượng</p>
                                    </div>
                                    <div>
                                        <div>
                                            <p>
                                                Window: <span className="text-yellow-400">350 MB</span>
                                            </p>
                                            <p>
                                                Android: <span className="text-yellow-400">180 MB</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-white flex justify-between items-center pb-3 border-b-2 border-[#27adff38]">
                                    <div className="flex gap-5">
                                        <Shield color="white" />
                                        <p>Tính năng</p>
                                    </div>
                                    <div>
                                        <div className="flex gap-2.5">
                                            <Check color="green"/>
                                            <p>Cập nhật tự động</p>
                                        </div>
                                        <div className="flex gap-2.5">
                                            <Check color="green" />
                                            <p>Bảo mật dữ liệu</p>
                                        </div>
                                        <div className="flex gap-2.5">
                                            <Check color="green" />
                                            <p>Cập nhật liên tục</p>
                                        </div>
                                        <div className="flex gap-2.5">
                                            <Check color="green" />
                                            <p>Đội ngũ hỗ trợ 27/7</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DownloadFrame>
                    </div>
                </div>

                <div className="mt-10 mb-3 md:px-0 px-2 ">
                    <DownloadFrame title="HƯỚNG DẪN CÀI ĐẶT">
                        <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-0">
                            {data2.map((item, index) => (
                                <div key={index} className="flex items-center justify-center">
                                    <DowloadHD
                                        icon={item.icon}
                                        number={item.number}
                                        subTitle={item.subTitle}
                                        titleDown={item.titleDown}
                                    />

                                    {/* Chỉ hiện mũi tên nếu chưa phải bước cuối */}
                                    {index < data2.length - 1 && (
                                        <div className="hidden md:block mx-5 text-white font-bold">
                                            Bước {index + 1}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </DownloadFrame>
                </div>

            </div>

            
        </div>
    )
}
export default DowloadGame


interface IPopsDowload {
    number: number,
    icon: ReactNode,
    titleDown: string
    subTitle: string

}
const DowloadHD = ({ number, icon, subTitle, titleDown }: IPopsDowload) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <StepIcon
                number={number}
                icon={icon}
            />
            <div className="text-white flex flex-col items-center">
                <h1>{titleDown}</h1>
                <p>{subTitle}</p>
            </div>
        </div>
    )
}

