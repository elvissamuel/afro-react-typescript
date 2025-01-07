import logo from "../assets/imgs/afrologo.png"

interface IProps {
    name: string;
    role: string;
    testimony: string;
}
const TestimonyComponent = ({name, role, testimony}: IProps) => {

    return (
        <div className="bg-white w-[500px] h-full p-8 text-primaryColor rounded-md flex flex-col gap-4">
            <p>{testimony}</p>

            <div className="flex items-center gap-2">
                <div className="w-[70px] h-[70px]">
                    <img className="w-full h-full object-contain" src={logo} alt="afro-logo" />
                </div>
                <div>
                    <p>{name}</p>
                    <p className="text-slate-400">{role}</p>
                </div>
            </div>
        </div>
    )
}

export default TestimonyComponent