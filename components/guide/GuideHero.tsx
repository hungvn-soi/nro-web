import { BookMarked } from "lucide-react";

export default function GuideHero() {
    return (
        <section className="
            relative 
            overflow-hidden 
            rounded-3xl border 
            border-yellow-500/20 
            bg-gradient-to-br
            from-[#1c2438]/90
            via-[#151b2d]/90
            to-[#0d1426]/90
            backdrop-blur-md
            p-10">

            {/* <div className="absolute inset-0 bg-[url('/assets/banner/BG3.png')] bg-cover bg-center opacity-10" /> */}

            <div className="relative">

                <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-yellow-500/10 px-5 py-2">

                    <BookMarked className="text-yellow-400" />

                    <span className="text-yellow-400">
                        NRO ZENZ
                    </span>

                </div>

                <h1 className="text-5xl font-black text-white">
                    Cẩm nang người chơi
                </h1>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">

                    Hướng dẫn dành cho người chơi mới.
                    Tìm hiểu toàn bộ cơ chế, Boss,
                    Vòng quay, Đệ tử, Cải trang,
                    Chân Mệnh và nhiều tính năng khác.

                </p>

            </div>

        </section>
    );
}