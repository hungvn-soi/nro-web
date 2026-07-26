import Image from "next/image";

const titleStyle = {
    WebkitTextStroke: "1px #2f5f90",
    textShadow: "0 2px 4px rgba(0,0,0,.6)",
};

const Diamond = () => (
    <svg
        aria-hidden="true"
        viewBox="0 0 10 10"
        className="h-[7px] w-[7px] fill-[#d6b15d]"
    >
        <rect
            x="2"
            y="2"
            width="6"
            height="6"
            transform="rotate(45 5 5)"
        />
    </svg>
);

const Divider = ({ reverse = false }: { reverse?: boolean }) => (
    <div className="flex items-center">
        {!reverse ? (
            <>
                <Diamond />
                <div className="ml-1 h-px w-8 bg-gradient-to-r from-[#d6b15d] to-transparent" />
            </>
        ) : (
            <>
                <div className="mr-1 h-px w-8 bg-gradient-to-l from-[#d6b15d] to-transparent" />
                <Diamond />
            </>
        )}
    </div>
);

export default function LeftBanner() {
    return (
        <div className="mt-12 flex flex-col items-center gap-5 lg:mt-0">
            <div className="relative">
                {/* Top */}
                <div className="absolute top-[5px] left-1/2 hidden -translate-x-1/2 items-center gap-4 lg:flex">
                    <Divider />

                    <h2
                        className="whitespace-nowrap text-[17px] font-black uppercase tracking-wide text-white"
                        style={titleStyle}
                    >
                        MÁY CHỦ DRAGON BALL CHẤT LƯỢNG CAO
                    </h2>

                    <Divider reverse />
                </div>

                <Image
                    src="/assets/image/banner.webp"
                    alt="Banner Dragon Ball"
                    width={640}
                    height={640}
                    priority
                    className="w-lg h-auto"
                />

                {/* Bottom */}
                <h2
                    className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[17px] font-black uppercase tracking-wide text-white lg:block"
                    style={titleStyle}
                >
                    Phiêu Lưu - Cày Cuốc - Chinh Phục - Kết Bạn
                </h2>
            </div>
        </div>
    );
}