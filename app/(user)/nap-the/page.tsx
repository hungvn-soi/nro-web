import BannerForm from "@/components/BannerForm"
import NapTheClient from "@/components/nap-the/NapThePage"

const Napthe = async () => {

    return (
        <div className="lg:-mt-12.5 mt-0">
            <BannerForm />
            <div className="max-w-7xl mx-auto">
                <NapTheClient />
            </div>
        </div>
    )
}

export default Napthe