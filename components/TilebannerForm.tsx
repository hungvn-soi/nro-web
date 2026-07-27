
interface IProps{
    classBox?: string
    title1?: string
    title2?: string
    ClassTitle1?: string
    subTitle?: string

}

const TitleBannerForm = ({ classBox, title1, ClassTitle1, title2, subTitle }: IProps)=> {
    return(
        <div className={`${classBox}`}>
            {
                title1 && (
                    <h1
                        className={`
                            lg:text-[50px]
                            md:text-7xl
                            text-[30px]
                            font-black
                            uppercase
                            tracking-wide
                            bg-linear-to-b
                            from-yellow-200
                            via-yellow-400
                            to-orange-500
                            bg-clip-text
                            text-transparent
                            drop-shadow-[0_4px_0_#7a3d00]
                            [text-shadow:0_0_18px_rgba(255,200,0,.45)]
                            ${ClassTitle1}
                    `}
                    >
                        {title1}
                    </h1>
                )
            }

            {
                title2 && (
                    <h2
                        className="
                        md:mt-10
                        text-xl
                        md:text-5xl
                        md:pt-0
                        pt-6
                        font-extrabold
                        uppercase
                        tracking-wide
                        text-slate-100
                        drop-shadow-[0_3px_0_#1e293b]
                    "
                    >
                        {title2}
                    </h2>
                )
            }

            {/* Subtitle */}
            {
                subTitle && (
                    <div className="mt-5 space-y-1 text-slate-200 lg:block hidden">
                        <p className="text-lg">
                            {subTitle}
                        </p>
                    </div> 
                )
            }   
        </div>
    )
}

export default TitleBannerForm