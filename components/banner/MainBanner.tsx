import LoginBTN from "../button/Login"
import RegisterBTN from "../button/Register"

const MainBaner = () => {
    return (
        <div className="mt-5 relative">
            <div>
                <img
                    src="/assets/Goku1.png"
                    alt="logo"
                    className="w-200"
                />
            </div>
            <div className="absolute top-30 right-0">
                <div className="relative flex">
                    <img
                        src="/assets/banner.png"
                        alt="logo"
                        className="w-200"
                    />
                    <div className="absolute inset-0 flex justify-center gap-[8%] items-end bottom-[15%]">
                        <LoginBTN />
                        <RegisterBTN />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainBaner