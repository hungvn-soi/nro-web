import Link from "next/link";
import { guideMenus } from "./guideData";
import { BookOpen } from "lucide-react";

export default function GuideSidebar() {
    return (
        <aside className="sticky top-24 hidden h-fit w-64 lg:block">
            <div className="rounded-2xl border  
                border-yellow-500/20 
                bg-gradient-to-br
                from-[#1c2438]/90
                via-[#151b2d]/90
                to-[#0d1426]/90
                backdrop-blur-md">
                <div className="flex items-center gap-3 border-b border-zinc-800 p-5">
                    <BookOpen className="text-yellow-400" />

                    <div>
                        <h3 className="font-bold text-white">
                            Cẩm nang
                        </h3>

                        <p className="text-sm text-zinc-400">
                            Người chơi
                        </p>
                    </div>
                </div>

                <div className="flex flex-col p-3">
                    {guideMenus.map((item) => (
                        <Link
                            key={item.id}
                            href={`#${item.id}`}
                            className="rounded-lg px-4 py-3 text-sm text-zinc-300 transition hover:bg-yellow-500 hover:text-black"
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}