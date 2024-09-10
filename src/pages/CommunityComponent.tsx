
interface IProps {
    image: string;
    title: string;
    body: string;
    button?: string;
    bgColor: string;
}
const CommunityComponent = ({image, body, title, bgColor}: IProps) => {

    return (
        <div className={`flex flex-col items-center pb-8 rounded-3xl gap-4 bg-[${bgColor}]`}>
            <div className="w-full">
                <img className="w-full h-full object-contain" src={image} alt="" />
            </div>
            <h2 className="text-center font-bold text-lg">{title}</h2>
            <p className="text-center px-6">{body}</p>

            <button className="border border-slate-300 w-2/3 py-2 rounded-xl">Get Started</button>
        </div>
    )
}

export default CommunityComponent