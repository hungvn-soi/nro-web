import HistoryClient from "@/components/admin/payment/HistoryClient"
import { getAllPayments, getPaymentStats } from "@/models/paymentModel"

const HistoryPayment = async () => {

    const [statusPayment, historyPaymentList] = await Promise.all([
        getPaymentStats(),
        getAllPayments(),
    ]); 

    return(
        <HistoryClient
            statusPayment={statusPayment}
            historyPlayments={historyPaymentList}
        />
    )
}

export default HistoryPayment