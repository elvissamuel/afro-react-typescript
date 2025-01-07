import ProductCompo from "src/components/ProductCompo"
import img1 from "../assets/imgs/proimg1.png"
import img2 from "../assets/imgs/proimg2.png"
import img3 from "../assets/imgs/proimg3.png"
import img4 from "../assets/imgs/proimg4.png"
import img5 from "../assets/imgs/proimg5.png"
import img6 from "../assets/imgs/proimg6.png"
import { Dispatch, SetStateAction } from "react"

interface ProductProps {
    setAddProduct: Dispatch<SetStateAction<boolean>>
}
const ProductComponent = ({setAddProduct}: ProductProps) => {

    const items = [
        {name: "Product 1", price: "$100", image: img1},
        {name: "Product 2", price: "$200", image: img2},
        {name: "Product 3", price: "$300", image: img3},
        {name: "Product 4", price: "$400", image: img4},
        {name: "Product 5", price: "$500", image: img5},
        {name: "Product 6", price: "$600", image: img6},
        // Add more products here...
    ]

    return(
        <div>
            <div className="flex justify-between px-3 items-start">
                <div>
                    <h2 className="text-xl font-semibold">Products Overview</h2>
                    <p>This is a list of all exisiting products</p>
                </div>
                <button onClick={() => setAddProduct(true)} className="bg-primaryColor text-white p-2 px-6 rounded-3xl">Add Product</button>
            </div>

            <div className=" items-center gap-2 text-sm border p-2 rounded-2xl my-6 inline-flex">
                <p className="bg-slate-100 rounded-2xl py-1 px-2">All</p>
                <p className="rounded-2xl">In stock</p>
                <p className="rounded-2xl">Out of stock</p>
                <p className="rounded-2xl">Draft</p>
            </div>

            <h2 className="text-xl font-semibold">In Stock</h2>

            <div className="grid grid-cols-6 gap-10 my-4">
                {items.map((item) => (
                    <ProductCompo {...item} />
                ))}
            </div>
        </div>
    )
}

export default ProductComponent;