import BackToTop from "@/components/guide/BackToTop";
import GuideAlert from "@/components/guide/GuideAlert";
import GuideBossDrop from "@/components/guide/GuideBossDrop";
import GuideCard from "@/components/guide/GuideCard";
import GuideFAQ from "@/components/guide/GuideFAQ";
import GuideHero from "@/components/guide/GuideHero";
import GuideInfoCard from "@/components/guide/GuideInfoCard";
import GuideSection from "@/components/guide/GuideSection";
import GuideSidebar from "@/components/guide/GuideSidebar";
import GuideTable from "@/components/guide/GuideTable";
import GuideTimeline from "@/components/guide/GuideTimeline";
import { Cat, Coins, Gift, Heart, Plane, Shield, Shirt, Star } from "lucide-react";

export default function GuidePage() {
    return (
        <div className="mx-auto max-w-7xl px-5 py-10">

            <GuideHero />

            <div className="mt-10 flex gap-10">

                <GuideSidebar />

                <main className="flex-1 space-y-8">

                    {/* ============ Bắt Đầu============== */}

                    <GuideSection
                        id="bat-dau"
                        title="1. Bắt đầu như thế nào?"
                    >

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

                            <GuideCard
                                number="1️⃣"
                                title="Làm nhiệm vụ"
                                desc="Ưu tiên hoàn thành nhiệm vụ chính tuyến để mở NPC và bản đồ."
                            />

                            <GuideCard
                                number="2️⃣"
                                title="Tăng sức mạnh"
                                desc="Đánh quái, luyện công và hoàn thành nhiệm vụ để tăng SM và TN."
                            />

                            <GuideCard
                                number="3️⃣"
                                title="Săn Boss"
                                desc="Sau khi đủ sức mạnh hãy bắt đầu farm Boss."
                            />

                            <GuideCard
                                number="4️⃣"
                                title="Nâng Đệ"
                                desc="Đầu tư Đệ tử để tăng sức mạnh hợp thể."
                            />

                            <GuideCard
                                number="5️⃣"
                                title="Hoàn thiện đồ"
                                desc="Đầu tư trang bị khi nhân vật đã ổn định."
                            />

                        </div>

                        <GuideAlert>

                            Luôn đọc kỹ mô tả vật phẩm trước khi sử dụng.
                            Không nên tiêu hao vật phẩm hiếm ở giai đoạn đầu.

                        </GuideAlert>

                    </GuideSection>

                    {/* ============Tiên Tệ============== */}

                    <GuideSection
                        id="tien-te"
                        title="2. Tiền tệ"
                    >
                        <div className="overflow-auto rounded-xl border border-zinc-700">
                            <table className="w-full">
                                <thead className="bg-zinc-800">
                                    <tr className="border-b border-zinc-700 text-left">
                                        <th className="p-4 font-semibold text-white">
                                            Loại
                                        </th>

                                        <th className="p-4 font-semibold text-white">
                                            Công dụng
                                        </th>

                                        <th className="p-4 font-semibold text-white">
                                            Lưu ý
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="text-zinc-300">
                                    <tr className="border-b border-zinc-800 hover:bg-zinc-800/50 transition">
                                        <td className="p-4 font-semibold text-yellow-400">
                                            Vàng
                                        </td>

                                        <td className="p-4">
                                            Mua vật phẩm và sử dụng các chức năng.
                                        </td>

                                        <td className="p-4">
                                            Luôn kiểm tra giá.
                                        </td>
                                    </tr>

                                    <tr className="border-b border-zinc-800 hover:bg-zinc-800/50 transition">
                                        <td className="p-4 font-semibold text-yellow-400">
                                            Thỏi vàng
                                        </td>

                                        <td className="p-4">
                                            Mua Shop Thỏi Vàng.
                                        </td>

                                        <td className="p-4">
                                            Không thay thế Ngọc Đỏ.
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-zinc-800/50 transition">
                                        <td className="p-4 font-semibold text-red-400">
                                            Ngọc Đỏ
                                        </td>

                                        <td className="p-4">
                                            Shop Ngọc Đỏ.
                                        </td>

                                        <td className="p-4">
                                            Dùng đúng mục đích.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </GuideSection>

                    {/* ============ Vật Phẩm ============== */}

                    <GuideSection
                        id="vat-pham"
                        title="3. Nhận cải trang và vật phẩm"
                    >

                        <div className="grid gap-5 md:grid-cols-2">

                            <GuideCard
                                number="🛒"
                                title="Shop"
                                desc="Nhận cải trang, hộp quà, nguyên liệu."
                            />

                            <GuideCard
                                number="👹"
                                title="Boss"
                                desc="Rơi Sao Pha Lê, Thỏi Vàng, vật phẩm hiếm."
                            />

                            <GuideCard
                                number="🎁"
                                title="Giftcode"
                                desc="Quà theo từng sự kiện."
                            />

                            <GuideCard
                                number="🎡"
                                title="Vòng quay"
                                desc="Nhận Pet, Cải trang và nhiều vật phẩm."
                            />

                        </div>

                    </GuideSection>

                    {/* =============Vòng Quây ============= */}

                    <GuideSection
                        id="vong-quay"
                        title="4. Vòng quay Thượng Đế"
                    >

                        <div className="grid gap-6 lg:grid-cols-2">

                            <GuideCard
                                number="🎡"
                                title="1 Thỏi Vàng"
                                desc="Mỗi lượt quay tiêu tốn 1 Thỏi Vàng."
                            />

                            <GuideCard
                                number="💯"
                                title="Quay 100 lượt"
                                desc="Có thể quay nhanh khi đủ số lượng Thỏi Vàng."
                            />

                            <GuideCard
                                number="🎁"
                                title="Phần thưởng"
                                desc="Ngọc Rồng, Pet, Cải Trang, Đá nâng cấp, Ván bay..."
                            />

                            <GuideCard
                                number="⭐"
                                title="Mốc quay"
                                desc="Nhận thêm phần thưởng theo số lượt quay tích lũy."
                            />

                        </div>

                        <GuideAlert>

                            Hãy dọn trống hành trang trước khi quay để tránh bỏ lỡ phần thưởng.

                        </GuideAlert>

                    </GuideSection>

                    {/* =============Boss============= */}

                    <GuideSection
                        id="boss"
                        title="5. Boss Cày Chay"
                    >

                        <p className="mb-8 leading-8 text-zinc-300">

                            Vegeta và Fide xuất hiện tự động mỗi 5 phút.
                            Tối đa tồn tại 10 Boss trên toàn server.

                        </p>

                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                            <GuideBossDrop
                                title="Thỏi vàng"
                                value="1 - 5"
                            />

                            <GuideBossDrop
                                title="Cỏ 4 lá"
                                value="1 - 5"
                            />

                            <GuideBossDrop
                                title="Sao Pha Lê"
                                value="1"
                            />

                            <GuideBossDrop
                                title="Đồ Thần"
                                value="5%"
                            />

                        </div>

                        <GuideAlert>

                            Boss chỉ nhận tối đa 100.000 sát thương mỗi đòn.

                        </GuideAlert>

                    </GuideSection>

                    {/* ===========Đệ Tử=============== */}

                    <GuideSection
                        id="de-tu"
                        title="6. Nâng Đệ Tử"
                    >

                        <GuideTimeline
                            items={[
                                {
                                    title: "Bước 1",
                                    description:
                                        "Sở hữu Đệ tử Mabu.",
                                },
                                {
                                    title: "Bước 2",
                                    description:
                                        "Đến NPC Ông Gohan.",
                                },
                                {
                                    title: "Bước 3",
                                    description:
                                        "Chuẩn bị đủ SM và Thẻ nâng cấp đệ.",
                                },
                                {
                                    title: "Bước 4",
                                    description:
                                        "Tiến hóa lên Beerus → Xên Nhí → Songoku.",
                                },
                            ]}
                        />

                    </GuideSection>

                    {/* ============Hợp Thể============== */}

                    <GuideSection
                        id="hop-the"
                        title="7. Chỉ số hợp thể"
                    >

                        <GuideTable
                            rows={[
                                {
                                    current: "Mabu",
                                    require: "20 tỷ SM + 5 Thẻ",
                                    next: "Beerus",
                                    bonus: "+20%",
                                },
                                {
                                    current: "Beerus",
                                    require: "40 tỷ SM + 10 Thẻ",
                                    next: "Xên Nhí",
                                    bonus: "+30%",
                                },
                                {
                                    current: "Xên Nhí",
                                    require: "120 tỷ SM + 20 Thẻ",
                                    next: "Songoku",
                                    bonus: "+40%",
                                },
                            ]}
                        />

                        <GuideAlert>

                            Thẻ nâng cấp đệ là vật phẩm riêng, không thể thay bằng Đá nâng cấp hoặc các nguyên liệu khác.

                        </GuideAlert>

                    </GuideSection>

                    {/* ============Cải Trang============== */}

                    <GuideSection
                        id="cai-trang"
                        title="8. Cải trang, Pet và Ván bay"
                    >

                        <div className="grid gap-6 md:grid-cols-2">

                            <GuideInfoCard
                                icon={<Shirt />}
                                title="Cải trang"
                            >

                                Xem kỹ chỉ số trước khi sử dụng.
                                Một số cải trang có chỉ số ngẫu nhiên.

                            </GuideInfoCard>

                            <GuideInfoCard
                                icon={<Cat />}
                                title="Pet"
                            >

                                Pet là vật phẩm hỗ trợ.
                                Không phải Đệ tử.

                            </GuideInfoCard>

                            <GuideInfoCard
                                icon={<Shield />}
                                title="Đeo lưng"
                            >

                                Có thể chỉ là ngoại hình hoặc có thêm chỉ số.

                            </GuideInfoCard>

                            <GuideInfoCard
                                icon={<Plane />}
                                title="Ván bay"
                            >

                                Thay đổi ngoại hình theo mô tả vật phẩm.

                            </GuideInfoCard>

                        </div>

                        <GuideAlert>

                            Luôn kiểm tra thời hạn, chỉ số và khả năng giao dịch trước khi mua.

                        </GuideAlert>

                    </GuideSection>

                    {/* ============Chân Mệnh============== */}

                    <GuideSection
                        id="chan-menh"
                        title="9. Bông tai, Chân Mệnh"
                    >

                        <div className="grid gap-5 lg:grid-cols-3">

                            <GuideCard
                                number="💎"
                                title="Bông tai"
                                desc="Dùng đúng loại nguyên liệu."
                            />

                            <GuideCard
                                number="🔮"
                                title="Chân Mệnh"
                                desc="Mỗi cấp yêu cầu nguyên liệu riêng."
                            />

                            <GuideCard
                                number="⭐"
                                title="Đá bảo vệ"
                                desc="Đọc kỹ xác suất trước khi nâng."
                            />

                        </div>

                        <GuideAlert>

                            Đá hoặc mảnh khác cấp sẽ không thay thế được nguyên liệu NPC yêu cầu.

                        </GuideAlert>

                    </GuideSection>

                    {/* ============Omega============= */}

                    <GuideSection
                        id="omega"
                        title="10. Rồng Omega"
                    >

                        <div className="grid gap-6 md:grid-cols-2">

                            <GuideInfoCard
                                icon={<Star />}
                                title="Ngọc Rồng"
                            >

                                Mang đúng Ngọc Rồng để gặp Rồng Omega.

                            </GuideInfoCard>

                            <GuideInfoCard
                                icon={<Gift />}
                                title="Phần thưởng"
                            >

                                Buff, tài nguyên,
                                vật phẩm đặc biệt.

                            </GuideInfoCard>

                            <GuideInfoCard
                                icon={<Heart />}
                                title="Phù hộ"
                            >

                                HP, KI,
                                Sức đánh.

                            </GuideInfoCard>

                            <GuideInfoCard
                                icon={<Coins />}
                                title="Chi phí"
                            >

                                Sử dụng Thỏi Vàng.

                            </GuideInfoCard>

                        </div>

                    </GuideSection>

                    {/* ============Lưu ý============== */}
                    <GuideSection
                        id="luu-y"
                        title="11. Những điều cần nhớ"
                    >

                        <div className="space-y-4">

                            <GuideFAQ
                                question="Có nên đưa mật khẩu cho người khác?"
                                answer="Không. Quản trị viên không bao giờ yêu cầu mật khẩu hoặc OTP."
                            />

                            <GuideFAQ
                                question="Khi giao dịch cần kiểm tra gì?"
                                answer="Tên vật phẩm, số lượng, trạng thái khóa và thời hạn."
                            />

                            <GuideFAQ
                                question="Nếu vật phẩm bị lỗi?"
                                answer="Chụp ảnh hành trang, mô tả vật phẩm và thông báo lỗi để gửi quản trị viên."
                            />

                            <GuideFAQ
                                question="Sau cập nhật server?"
                                answer="Đăng xuất và vào lại nếu dữ liệu chưa được cập nhật."

                            />

                        </div>

                    </GuideSection>

                    {/* <BackToTop /> */}

                </main>

            </div>

        </div>
    );
}