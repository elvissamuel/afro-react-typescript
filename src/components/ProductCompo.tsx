
interface ProductProps {
    name: string;
    price: string;
    image: string;
}

const ProductCompo = ({image, name, price}: ProductProps) => {

    return (
        <div className="rounded-2xl border p-3 flex flex-col gap-2">
            <div className="w-full"><img className="w-full object-cover" src={image} alt={name} /></div>
            <p className="font-semibold">{name}</p>
            <p className="font-semibold underline">{price}</p>

            <button className="py-2 px-4 w-full border">Edit Product</button>
        </div>
    )
}

export default ProductCompo;