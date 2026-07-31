interface Props {
    id: string;
    title: string;
    children: React.ReactNode;
}

export default function GuideSection({
    id,
    title,
    children,
}: Props) {
    return (
        <section
            id={id}
            className="scroll-mt-28"
        >
            <h2 className="mb-6 text-3xl font-bold text-yellow-400">
                {title}
            </h2>

            <div className="rounded-2xl border 
                border-yellow-500/20 
                bg-gradient-to-br
                from-[#1c2438]/90
                via-[#151b2d]/90
                to-[#0d1426]/90
                backdrop-blur-md p-8">

                {children}

            </div>
        </section>
    );
}