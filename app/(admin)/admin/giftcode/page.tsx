import GiftCodeClient from "@/components/admin/giftcode/GiftcodeClient"
import { getAllGiftcodesV2, getGiftcodeStats } from "@/models/giftcode"

const GiftCodeAdmin = async () => {

    const [listGiftCode, stast] = await Promise.all([
        getAllGiftcodesV2(),
        getGiftcodeStats()
    ])

    return(
        <div>
            <GiftCodeClient
                dataStust={stast}
                dataTableGiftCode={listGiftCode}
            />
        </div>
    )
}
export default GiftCodeAdmin