import { useState } from "react";
import ProductComponent from "./ProductComponent";
import AddProduct from "./AddProduct";

const Product = () => {

    const [addProduct, setAddProduct] = useState(false)

    return (
        <div>
            {
                addProduct?
                    <div>
                        <AddProduct />
                    </div>
                    :
                    <ProductComponent setAddProduct={setAddProduct} />
            }
        </div>
    )
}

export default Product;