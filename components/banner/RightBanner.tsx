import Image from "next/image";

export default function RightBanner() {
    return (
        <div className="flex justify-center">
            <Image
                src="/assets/image/longvsgoku.webp"
                alt="Long vs Goku"
                width={532}
                height={760} // chỉnh theo kích thước thực của ảnh
                priority
                className="h-auto w-full"
            />
        </div>
    );
}