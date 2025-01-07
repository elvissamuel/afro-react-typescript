
interface IProps {
    icon: string;
    label: string;
}
const LocationAttributesComponent = ({icon, label}: IProps) => {

    return (
        <div className="bg-[#312E29] rounded-full py-4 px-8 text-white flex items-center gap-2 justify-center">
            <div>
                <img src={icon} alt="" />
            </div>
            <p>{label}</p>
        </div>
    )
}

export default LocationAttributesComponent