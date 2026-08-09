import GoiNapClient from "@/components/admin/goi-Nap/goiNapClient"
import { getAllRechargePackages, getRechargePackageStats } from "@/models/rechargePackageModel"

const GoiNapPage = async () => {

    const [statsInfo, goinapList] = await Promise.all([
                getRechargePackageStats(),
                getAllRechargePackages(),
            ]); 

    return (
        <div className="px-2">
            <GoiNapClient
                statsGoi={statsInfo}
                tableGoiNap={goinapList}
            />

        </div>
    )
}
export default GoiNapPage