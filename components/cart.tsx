interface IProp {
    img: string;
    title: string;
    subTitle?: string;
}

const BoxCard = ({ img, title, subTitle }: IProp) => {
    return (
        <div
            className="
                w-full
                overflow-hidden
                rounded-2xl
                border-2 border-[#0f3981]
                bg-[#0b1628]
                text-white
                text-center
                shadow-lg
            "
        >
            <img
                src={img}
                alt={title}
                className="
                w-full
                h-48
                sm:h-56
                lg:h-72
                object-cover
                "
            />

            <div className="p-4">
                <h2
                    className="
                    text-lg
                    lg:text-xl
                    font-bold
                    uppercase
                    line-clamp-2
                "
                >
                    {title}
                </h2>

                {subTitle && (
                    <p
                        className="
                        mt-3
                        text-sm
                        lg:text-base
                        text-gray-300
                        line-clamp-3
                        "
                    >
                        {subTitle}
                    </p>
                )}
            </div>
        </div>
    );
};

export default BoxCard;