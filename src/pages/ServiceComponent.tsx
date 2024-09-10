
interface IProps {
    image: string;
    title: string;
    body: string
}
const ServiceComponent = ({body, image, title}: IProps) => {

    return (
        <div className="bg-[#F6F6F6] hover:bg-[#E9F7FD] flex flex-col items-center justify-center rounded-2xl gap-6 w-[280px] h-[380px]">
            <div>
                <img src={image} alt="" />
            </div>
            <div>
                <p className="text-center font-semibold my-2">{title}</p>
                <p className="text-center text-sm px-6">{body}</p>
            </div>
        </div>
    )
}

export default ServiceComponent
