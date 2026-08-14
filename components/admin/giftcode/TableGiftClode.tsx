import { IViewTableGiftCode } from "@/types/giftcode";
import DataTable, { IColumnTableAdmin } from "../DataTable";
import { useEffect, useState } from "react";


interface IDataViewTable extends IViewTableGiftCode {
    conlai: number
}

interface ITableGiftCode{
    dataInGiftCode: IViewTableGiftCode[]
}

const TableGiftCode = ({ dataInGiftCode }: ITableGiftCode) =>{
    
    const [dataView, setDataView] = useState<IDataViewTable[] | null>(null)


    useEffect(()=> {
        if (!dataInGiftCode)return

        const dataView: IDataViewTable[] = dataInGiftCode.map(item => ({
            ...item,
            conlai: item.countLeft - item.usedCount
            
        }))
        setDataView(dataView)
    }, [dataInGiftCode])


    const columns: IColumnTableAdmin<IDataViewTable>[] = [
            {
                key: "id",
                title: "ID",
                className: "w-[60px]",
                render: (_, row) => (
                    <span>
                        {String(row.id).padStart(2, "0")}
                    </span>
                ),
            },
    
            {
                key: "code",
                title: "Mã Code",
            },
    
            {
                key: "countLeft",
                title: "Số lượng",
            },
    
            {
                key: "usedCount",
                title: "Số lượng đã dùng",
                className: "",
            },
            {
                key: "conlai",
                title: "Số lượng còn lại",
            },
            {
                key: "datecreate",
                title: "Ngày tạo",
                render: (value) => {
                    return new Date(value).toLocaleString("vi-VN");
                },
            },
            {
                key: "expired",
                title: "Ngày hết hạn",
                render: (value) => {
                    return new Date(value).toLocaleString("vi-VN");
                },
            },
    
            {
                key: "actions",
                title: "Thao tác",
                render: (_, row) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => actionTible(row)}
                            className="flex h-8 w-full items-center justify-center rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Chi tiết
                        </button>
    
                    </div>
                ),
            },
        ];

    

    const actionTible =(row: IDataViewTable) => {
        // actionInfo(row)
        
    }
    
    return(
        <DataTable
            columns={columns}
            data={dataView || []}
        />
    )
}
export default TableGiftCode