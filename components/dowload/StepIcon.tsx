import { ReactNode } from "react";

interface StepIconProps {
    number: number;
    icon: ReactNode;
    size?: number;
}

export default function StepIcon({
    number,
    icon,
    size = 100,
}: StepIconProps) {
    const badgeSize = size * 0.42;

    return (
        <div
            className="relative flex items-center justify-center"
            style={{
                width: size,
                height: size + badgeSize / 2,
            }}
        >
            {/* Circle */}
            <div
                className="rounded-full bg-[#0C2A63] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_10px_#00CFFF]"
                style={{
                    width: size,
                    height: size,
                }}
            >
                {icon}
            </div>

            {/* Number Badge */}
            <div
                className="absolute -top-2 rounded-full bg-[#0C2A63] border-2 border-white flex items-center justify-center text-white font-bold"
                style={{
                    width: badgeSize,
                    height: badgeSize,
                    fontSize: badgeSize * 0.45,
                }}
            >
                {number}
            </div>
        </div>
    );
}
