import BannerForm from "@/components/BannerForm"
import NapTheClient from "@/components/nap-the/NapThePage"
import { getActiveRechargePackages } from "@/models/rechargePackageModel"

const Napthe = async () => {

    const RechargePackages = await getActiveRechargePackages()
    return (
        <div className="lg:-mt-12.5 mt-0">
            <BannerForm />
            <div className="max-w-7xl mx-auto">
                <NapTheClient
                    RechargePackage={RechargePackages}
                />
            </div>
        </div>
    )
}

export default Napthe