import { formatNumber } from "@/utils/format";
import { Trophy } from "lucide-react";

interface IPops {
    img: string
    useName: string
    serverName: string
    dame: number
    rank: number
}

const CardBXH = ({ img, useName, serverName, dame, rank }: IPops) => {

    const trophyColor =
        rank === 1 ? "text-yellow-500" : // vàng
            rank === 2 ? "text-gray-300" :   // bạc
                rank === 3 ? "text-orange-600" : // đồng
                    "text-white";                    // các hạng sau

    return (
        <div className="flex items-center m-3 border-2 border-[#0f3981] rounded-2xl">
            <div className="flex items-center justify-center w-10 md:w-20">
                {rank <= 3 ? (
                    <Trophy className={`${trophyColor} w-5 h-5 md:w-10 md:h-10`} />
                ) : (
                    <span className="text-white text-2xl font-bold">
                        {rank}
                    </span>
                )}
            </div>

            <div className="flex justify-between items-center text-white flex-1 bg-[#072442] p-3 rounded-2xl">
                <div className="flex md:gap-6 gap-4">
                    <img
                        src={img}
                        alt={`Avatar ${useName}`}
                        className="md:w-15 md:h-15 w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col items-start justify-center">
                        <h1>{useName}</h1>
                        <p className="hidden lg:block">{serverName}</p>
                    </div>
                </div>

                <div className="text-amber-300 font-bold border border-gray-700 rounded-2xl p-3">
                    {formatNumber(dame)}
                </div>
            </div>
        </div>
    )
}

export default CardBXH;
