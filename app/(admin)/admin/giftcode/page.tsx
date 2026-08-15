import GiftCodeClient from "@/components/admin/giftcode/GiftcodeClient"
import { getAllGiftcodesV2, getGiftcodeStats } from "@/models/giftcode"
import { getAllItemTemplates } from "@/models/itemTemplate"

const GiftCodeAdmin = async () => {

    const [listGiftCode, stast, listItem] = await Promise.all([
        getAllGiftcodesV2(),
        getGiftcodeStats(),
        getAllItemTemplates()
    ])

    return(
        <div>
            <GiftCodeClient
                dataStust={stast}
                dataTableGiftCode={listGiftCode}
                opitonItem={listItem}
            />
        </div>
    )
}
export default GiftCodeAdmin