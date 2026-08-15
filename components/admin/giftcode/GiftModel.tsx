"use client"

import LoadingOverlay from "@/components/LoadingOverlay"
import { IItemTemplate } from "@/models/itemTemplate"
import ItemSelect from "../ItemSelect"
import { useState } from "react"
import { Delete } from "lucide-react"
import { ICreateGiftcode, IGiftcode } from "@/types/giftcode"


interface IItemGiftVoucher extends IItemTemplate {
    quantity: number
    options:any[]
}

interface IGiftModel {
    optionItemSelect: IItemTemplate[]
    open: boolean
    onClose: () => void
    actionModel: (data: ICreateGiftcode) => void
}



const GiftModel = ({ open, onClose, optionItemSelect, actionModel }: IGiftModel) => {
    const [itemOptionSelect, setItemOptionSelect] = useState<IItemTemplate>();
    const [listItemSelect, setListItemSelect] = useState<IItemGiftVoucher[]>([])
    const [formData, setFormData] = useState({
        giftCode: "",
        quantity: 0,
        fromDate: "",
        toDate: "",
    });

    
    if( !open ) {
        setListItemSelect([])
        return null
    }


    const handleAddListItemSelect = () => {
        if (!itemOptionSelect) {
            alert("Vui lòng chọn item cần thêm");
            return;
        }

        const isExist = listItemSelect.some(
            item => item.id === itemOptionSelect.id
        );

        if (isExist) {
            alert("Item đã tồn tại vui lòng kiểm tra lại");
            return;
        }
        const itemAdd: IItemGiftVoucher  = {
            ...itemOptionSelect,
            quantity: 1,
            options:[]
        }

        setListItemSelect(prev => [...prev, itemAdd]);
    }

    const handleDeleteItemList = (id: number) => {

        setListItemSelect(prev => prev.filter(item => item.id !== id));
    }
    
    const handleChangeQuantity = (id: number, quantity: number) => {
        setListItemSelect(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };
    


    const handleSaveGiftCode = () => {

        if(!formData.giftCode)
            {
                alert("Mã gircode rỗng")
                return
            }
        if(formData.quantity <= 0){
            alert("số lượng voucher phải > 0")
            return
        } 
        if (formData.fromDate && formData.toDate) {
            if (formData.fromDate && formData.toDate) {
                const start = new Date(formData.toDate);   // toDate = ngày bắt đầu
                const end = new Date(formData.fromDate);    // fromDate = ngày kết thúc

                if (end <= start) {
                    alert("Kiểm tra lại ngày kết thúc phải lớn hơn ngày bắt đầu");
                    return;
                }
            }
        }
        if(!formData.fromDate || !formData.toDate){
            alert("Kiểm tra lại thời gian giftCode")
            return
        }

        const detail = listItemSelect.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            options: item.options.map((option) => ({
                id: option.id,
                param: option.value,
            })),
        }));

        const dataCreateGift: ICreateGiftcode = {
            code: formData.giftCode,
            countLeft: formData.quantity,
            detail: JSON.stringify(detail),
            datecreate: new Date(formData.toDate),
            expired: new Date(formData.fromDate)
        }

        actionModel(dataCreateGift)
    }


    //Form ...................

    const handleOnChangForm = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-5">
            <div className="relative w-full max-w-[900px] rounded-lg bg-white shadow-xl py-5">
                <LoadingOverlay
                    show={false}
                />
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <h2 className="text-[20px] font-semibold text-gray-900">
                        Thêm mới gói nạp
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer text-[22px] leading-none text-gray-500 hover:text-gray-800"
                    >
                        ×
                    </button>
                </div>

                <form 
                    noValidate
                    onSubmit={(e) => {
                        e.preventDefault()
                        // handleAction()
                    }}
                    className="px-5 py-4">
                    
                   <div className="grid grid-cols-2 gap-2">
                        <div className="mb-4">
                            <label className="mb-2 block text-[16px] font-medium text-gray-800">
                                Mã GiftCode <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                name="giftCode"
                                value={formData.giftCode}
                                onChange={handleOnChangForm}
                                placeholder="ABC-123 Tối đa 6 ký tự"
                                maxLength={6}
                                className="h-10.5 w-full rounded-md border border-gray-200 px-3 text-[20px] text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-[16px] font-medium text-gray-800">
                                Số lượng <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleOnChangForm}
                                min={0}
                                max={1000}
                                placeholder="max 1000"
                                required
                                className="h-10.5 w-full rounded-md border border-gray-200 px-3 text-[20px] text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />

                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-[16px] font-medium text-gray-800">
                                Phân thưởng <span className="text-red-500">*</span>
                            </label>

                            <div className="grid grid-cols-[70%_25%] justify-between">
                                <ItemSelect
                                    items={optionItemSelect}
                                    value={itemOptionSelect?.id}
                                    onChange={(item) => {
                                        setItemOptionSelect(item);
                                    }}
                                />

                                <button
                                    className="cursor-pointer rounded-md border-2 border-green-500 text-green-500 h-10.5 px-3"
                                    onClick={handleAddListItemSelect}
                                >
                                    + Thêm
                                </button>

                            </div>
                            
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-[16px] font-medium text-gray-800">
                                Thời gian hiệu lực ( từ ngày  đến  ngày) <span className="text-red-500">*</span>
                            </label>

                            <div className="flex items-center gap-3">
                                <input
                                    type="date"
                                    name="toDate"
                                    value={formData.toDate}
                                    onChange={handleOnChangForm}
                                    className="
                                        h-10.5
                                        min-w-0 flex-1 bg-transparent
                                        text-[18px] text-black
                                        
                                        border border-slate-200
                                        rounded-md
                                        px-3
                                    "
                                />


                                <input
                                    type="date"
                                    name="fromDate"
                                    value={formData.fromDate}
                                    onChange={handleOnChangForm}
                                    className="
                                        h-10.5
                                        min-w-0 flex-1 bg-transparent
                                        text-[18px] text-black
                                        
                                        border border-slate-200
                                        rounded-md
                                        px-3
                                    "
                                />
                            </div>
                        </div>
                   </div>

                </form>

                <label className="mb-2 block text-[20px] font-medium text-gray-800 px-5">
                    Danh sách Item đã chọn:
                </label>

                <div className="px-5">
                    {
                        listItemSelect.map((item) => (
                            <BoxItemSelect
                                key={item.id}
                                dataBox={item}
                                actionDelteItem={handleDeleteItemList}
                                handleChangeQuantity={handleChangeQuantity}
                            />
                        ))
                    }
                    
                </div>

                <button 
                    className="px-3 py-2 border-2 border-green-500 rounded-md mt-5"
                    onClick={() => handleSaveGiftCode()}
                >
                    Lưu
                </button>
            </div>
        </div>
    )
}

export default GiftModel


interface IBoxItemSelect{
    dataBox: IItemGiftVoucher
    actionDelteItem: (id:number) => void
    handleChangeQuantity: (id: number, quantity: number) => void
}
const BoxItemSelect = ({ dataBox, handleChangeQuantity, actionDelteItem }: IBoxItemSelect) => {
    return(
        <div className="mt-2">
            {/* <Image
                src={"https://picsum.photos/52/52"}
                alt="ảnh item"
                width={52}
                height={52}
                className="object-contain"
            /> */}

            <div className="grid grid-cols-[70%_20%] justify-between items-center border border-gray-400 p-2 rounded-md">
                <div className="flex justify-start gap-10 items-center">
                    <div
                        className="w-[52px] h-[52px] text-center border bg-gray-100 border-gray-400 rounded-md flex justify-center items-center"
                    >
                        {dataBox.iconId}
                    </div>

                    <div className="flex justify-center items-center flex-1 gap-2">
                        <div className="mb-4 w-full">
                            <label className="mb-2 block text-[16px] font-medium text-gray-800">
                                Vật phẩm
                            </label>

                            <div
                                className="h-10.5 w-full flex justify-between items-center rounded-md border border-gray-200 px-3 text-[20px] text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            >
                                {dataBox.name}
                                <span>{`Id: ${dataBox.id}`}</span>
                            </div>
                        </div>
                        <div className="mb-4 w-full">
                            <label className="mb-2 block text-[16px] font-medium text-gray-800">
                                Số lượng
                            </label>

                            <input
                                type="number"
                                value={dataBox.quantity}
                                min={0}
                                max={1000}
                                onChange={(e) => handleChangeQuantity(dataBox.id, Number(e.target.value))}
                                placeholder="nhập số lượng"
                                className="h-10.5 w-full rounded-md border border-gray-200 px-3 text-[20px] text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <button
                    className="cursor-pointer h-10.5 w-20 rounded-md px-2 py-2 border border-red-500 text-red-500 flex justify-center items-center gap-3"
                    onClick={() => actionDelteItem(dataBox.id)}
                >
                    <Delete />
                    Xóa
                </button>
            </div>
        </div>
    )
}


// const BoxItemOption = () => {
//     return(

//     )
// }