import TabsForm, { IFormTab } from "../TabForm"
import BankTransferCard from "./BankTransferCard"
import CardRecharge from "./CardRecharge"
import { IDataBangGia } from "./GoiNap"


interface IPops{
    bangGia: IDataBangGia[]
    selectGiaGoi: number
    onReloadHistory ?: () => void
}
const HTTT = ({ bangGia, selectGiaGoi, onReloadHistory }: IPops) => {

    const DataTabs: IFormTab[] = [
        { 
            id: "nganhang", 
            label: "Chuyển Khoản (QR Code)", 
            content: 
                <BankTransferCard
                    accountName="TRIEU QUANG HA"
                    accountNumber="xxxxxxxxxx"
                    amount={selectGiaGoi}
                    onReloadHistory={onReloadHistory}  
                /> 
        },
        // {
        //     id: "thecao",
        //     label: "Thẻ Cào",
        //     content:
        //         <CardRecharge
        //             dataBangGia={bangGia}
        //             selectGiaGoi={selectGiaGoi}
        //         />

        // },
    ]


    return (
        <div className=" border-2 border-amber-400 rounded-2xl p-5 mt-5 min-h-130">
            <h1 className="font-bold text-white uppercase   ">2. Chọn hình thức thanh toán</h1>
            <TabsForm
                data={DataTabs}
                className = "mt-3"
            />
        </div>
    )
}

export default HTTT