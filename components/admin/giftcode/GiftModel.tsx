"use client"

import LoadingOverlay from "@/components/LoadingOverlay"
import { IItemTemplate } from "@/models/itemTemplate"
import ItemSelect from "../ItemSelect"
import { useEffect, useState } from "react"
import { Delete } from "lucide-react"
import { useNotification } from "@/components/notification"
import { IGiftcode } from "@/types/giftcode"
import { getItemImage } from "./GetItemImage"

interface IItemOption {
    id: number
    value: string | number
}

interface IItemGiftVoucher extends IItemTemplate {
    quantity: number
    options: IItemOption[]
}

interface IGiftModel {
    optionItemSelect: IItemTemplate[]
    open: boolean
    onClose: () => void
    actionModel: (isEdit: boolean, data: IGiftcode) => void
    isLoading: boolean
    type: "Create" | "Edit" | null
    itemSelect: IGiftcode | null
}

// Format a Date as YYYY-MM-DD using LOCAL time (avoids the UTC/timezone
// shift you get from toISOString(), which can roll the date back a day
// for users in UTC+ zones like Vietnam).
const toLocalDateInputValue = (date: Date | string | undefined): string => {
    if (!date) return ""
    const d = new Date(date)
    if (isNaN(d.getTime())) return ""
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
}

const emptyFormData: IGiftcode = {
    id: -1,
    code: "",
    countLeft: 0,
    detail: "",
    datecreate: new Date(),
    expired: new Date(),
}

const GiftModel = ({ itemSelect, type, isLoading, open, onClose, optionItemSelect, actionModel }: IGiftModel) => {
    const notify = useNotification()
    const [itemOptionSelect, setItemOptionSelect] = useState<IItemTemplate>()
    const [listItemSelect, setListItemSelect] = useState<IItemGiftVoucher[]>([])
    const [listItem, setListItem] = useState <IItemTemplate[]>([])
    const isEdit = type === "Edit"

    const [formData, setFormData] = useState<IGiftcode>(emptyFormData)
    const [isOnChang, setIsOnchang] = useState<boolean>(false)
    // Reset the selected-items list whenever the modal closes, instead of
    // doing it inline during render (calling setState during render is an
    // anti-pattern and can trigger extra/incorrect re-renders).
    useEffect(() => {
        if (!open) {
            setListItemSelect([])
            setListItem([])
            setItemOptionSelect(undefined)
        }
    }, [open])

    useEffect(() => {
        if (!itemSelect) {
            setFormData(emptyFormData)
            setListItemSelect([])
            setListItem([])
            return
        }

        setFormData({
            id: itemSelect.id,
            code: itemSelect.code,
            countLeft: itemSelect.countLeft,
            detail: itemSelect.detail,
            datecreate: itemSelect.datecreate,
            expired: itemSelect.expired,
        })

        let detailData: IItemGiftVoucher[] = []
        try {
            detailData =
                typeof itemSelect.detail === "string"
                    ? JSON.parse(itemSelect.detail)
                    : itemSelect.detail ?? []
        } catch (err) {
            console.error("Không thể parse detail của GiftCode:", err)
            notify.warning("Dữ liệu GiftCode bị lỗi định dạng, vui lòng kiểm tra lại")
            setListItemSelect([])
            return
        }

        const optionSelect: IItemTemplate[] = optionItemSelect.filter((b) =>
            detailData.some((a) => a.id === b.id)
        )
        
        const result: IItemGiftVoucher[] = detailData.map((detail) => {
            const option = optionSelect.find((item) => item.id === detail.id)

            return {
                ...detail,
                name: option?.name ?? "No Name",
                iconId: option?.iconId ?? 0,
            }
        })
        setListItem(optionSelect)
        setListItemSelect(result)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemSelect, optionItemSelect])

    if (!open) {
        return null
    }

    const handleAddListItemSelect = () => {
        if (!itemOptionSelect) {
            notify.warning("Vui lòng chọn item cần thêm")
            return
        }

        const isExist = listItemSelect.some((item) => item.id === itemOptionSelect.id)

        if (isExist) {
            notify.warning("Item đã tồn tại vui lòng kiểm tra lại")
            return
        }
        const itemAdd: IItemGiftVoucher = {
            ...itemOptionSelect,
            quantity: 1,
            options: [],
        }
        setListItem((prev) => [...prev, itemOptionSelect])
        setListItemSelect((prev) => [...prev, itemAdd])
    }

    const handleDeleteItemList = (id: number) => {
        setIsOnchang(true)
        setListItemSelect((prev) => prev.filter((item) => item.id !== id))
        setListItem((prev) => prev.filter((item) => item.id !== id))

    }

    const handleChangeQuantity = (id: number, quantity: number) => {
        setIsOnchang(true)
        setListItemSelect((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        )
    }

    const handleSaveGiftCode = () => {
        if (!formData.code.trim()) {
            notify.warning("Mã giftcode rỗng")
            return
        }
        if (Number(formData.countLeft) <= 0) {
            notify.warning("Số lượng voucher phải > 0")
            return
        }
        if (!formData.datecreate || !formData.expired) {
            notify.warning("Kiểm tra lại thời gian giftCode")
            return
        }

        const start = new Date(formData.datecreate)
        const end = new Date(formData.expired)
        start.setHours(0, 0, 0, 0)
        end.setHours(0, 0, 0, 0)

        if (end < start) {
            notify.warning("Kiểm tra lại ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu")
            return
        }

        if (listItemSelect.length <= 0) {
            notify.warning("Vui lòng chọn Item cho GiftCode")
            return
        }

        const invalidQuantityItem = listItemSelect.find((item) => !item.quantity || item.quantity <= 0)
        if (invalidQuantityItem) {
            notify.warning(`Số lượng của item "${invalidQuantityItem.name}" phải > 0`)
            return
        }

        const detail = listItemSelect.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            options: item.options.map((option) => ({
                id: option.id,
                param: option.value,
            })),
        }))

        const itemGiftCode: IGiftcode = {
            id: formData.id,
            code: formData.code,
            countLeft: Number(formData.countLeft),
            detail: JSON.stringify(detail),
            datecreate: new Date(formData.datecreate),
            expired: new Date(formData.expired),
        }

        actionModel(isEdit, itemGiftCode)
    }

    // Form ...................

    const handleOnChangForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsOnchang(true)
        const { name, value, type: inputType } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: inputType === "number" ? Number(value) : value,
        }))
    }

    const handleCloseModel = () =>{
        if(isOnChang) {
            notify.confirm({
                title:"Thông Báo",
                message:"Có thay đổi dữ liệu chư lưu, Bạn có chắc chắn thoát dữ liệu thay đỏi sẽ không được lưu",
                onConfirm() {
                    onClose()
                    setIsOnchang(false)
                    return
                },
            })
        }
        if(!isLoading){
            onClose()
            setIsOnchang(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-5">
            <div className="relative w-full max-w-[900px] rounded-lg bg-white shadow-xl py-5">
                <LoadingOverlay show={isLoading} />
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <h2 className="text-[20px] font-semibold text-gray-900">
                        {isEdit ? "Cập nhật GiftCode" : "Thêm mới GiftCode"}
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
                    }}
                    className="px-5 py-4"
                >
                    <div className="grid grid-cols-2 gap-2">
                        <div className="mb-4">
                            <label className="mb-2 block text-[16px] font-medium text-gray-800">
                                Mã GiftCode <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleOnChangForm}
                                placeholder="Nhập mã giftcode"
                                maxLength={20}
                                className="h-10.5 w-full rounded-md border border-gray-200 px-3 text-[20px] text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-[16px] font-medium text-gray-800">
                                Số lượng <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="number"
                                name="countLeft"
                                value={formData.countLeft}
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
                                    listSelect={listItem}
                                    onChange={(item) => {
                                        setItemOptionSelect(item)
                                    }}
                                />

                                <button
                                    type="button"
                                    className="cursor-pointer rounded-md border-2 border-green-500 text-green-500 h-10.5 px-3"
                                    onClick={handleAddListItemSelect}
                                >
                                    + Thêm
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-[16px] font-medium text-gray-800">
                                Thời gian hiệu lực ( từ ngày đến ngày) <span className="text-red-500">*</span>
                            </label>

                            <div className="flex items-center gap-3">
                                <input
                                    type="date"
                                    name="datecreate"
                                    value={toLocalDateInputValue(formData.datecreate)}
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
                                    name="expired"
                                    value={toLocalDateInputValue(formData.expired)}
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

                <div className="max-h-[350px] overflow-y-auto pr-2 px-5 mt-5">
                    {listItemSelect.map((item) => (
                        <BoxItemSelect
                            key={item.id}
                            dataBox={item}
                            actionDelteItem={handleDeleteItemList}
                            handleChangeQuantity={handleChangeQuantity}
                        />
                    ))}
                </div>

               <div className="px-5 flex gap-5">
                    <button
                        type="button"
                        disabled={isLoading}
                        className="cursor-pointer border-gray-300 text-white font-bold px-3 py-2 border-2 bg-blue-500 hover:bg-blue-600 rounded-md mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleSaveGiftCode()}
                    >
                        {isEdit ? "Cập Nhật" : "Tạo Mới"}
                    </button>

                    <button
                        type="button"
                        disabled={isLoading}
                        className="text-white font-bold cursor-pointer px-3 py-2 border-2 bg-red-500 border-gray-300 hover:bg-red-600 rounded-md mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleCloseModel()}
                    >
                        Thoát
                    </button>
               </div>
            </div>
        </div>
    )
}

export default GiftModel

interface IBoxItemSelect {
    dataBox: IItemGiftVoucher
    actionDelteItem: (id: number) => void
    handleChangeQuantity: (id: number, quantity: number) => void
}
const BoxItemSelect = ({ dataBox, handleChangeQuantity, actionDelteItem }: IBoxItemSelect) => {
    const [imageError, setImageError] = useState(false);
    return (
        <div className="mt-2">
            <div className="grid grid-cols-[70%_20%] justify-around items-center border border-gray-400 p-2 rounded-md">
                <div className="flex justify-start gap-10 items-center">
                    <div className={`w-[52px] h-[52px] ${imageError ? "bg-gray-100 border-gray-400 rounded-md": ""} text-center  flex justify-center items-center`}>
                        {/* {dataBox.iconId} */}
                        <img
                            src={getItemImage(dataBox.iconId)}
                            alt={dataBox.name}
                            width={52}
                            height={52}
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                                setImageError(true)
                            }}
                        />
                        {
                            imageError && (
                                <div
                                    className="bg-gray-100 border-gray-400 rounded-md"
                                >
                                    {dataBox.iconId}
                                </div>
                            )
                        }
                    </div>

                    <div className="flex-1 grid grid-cols-[70%_25%] justify-between">
                        <div className="mb-4 w-full">
                            <label className="mb-2 block text-[16px] font-medium text-gray-800">Vật phẩm</label>

                            <div className="h-10.5 w-full flex justify-between items-center rounded-md border border-gray-200 px-3 text-[20px] text-black placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                {dataBox.name}
                                <span>{`Id: ${dataBox.id}`}</span>
                            </div>
                        </div>
                        <div className=" w-full">
                            <label className="mb-2 block text-[16px] font-medium text-gray-800">Số lượng</label>

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

                <div className="flex justify-end items-end">
                    <button
                        type="button"
                        className="cursor-pointer border-gray-300 h-10.5 w-20 rounded-md px-2 py-2 border hover:bg-red-600 text-white bg-red-500 border-red-40 flex justify-center items-center gap-3"
                        onClick={() => actionDelteItem(dataBox.id)}
                    >
                        <Delete />
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    )
}