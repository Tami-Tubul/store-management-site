import ProductsComp from "../Components/Products";
import TotalAmountComp from "../Components/TotalAmount";


const ProductsPageComp = () => {
  return (
    <div>
      <h1>Products</h1>

      <div style={{ width: "50%", float:"left"}}>
        <ProductsComp />
      </div>
     
      <div style={{ width: "50%", float:"right"}}>
        <TotalAmountComp/>
      </div>
   
    </div>
  )
}
export default ProductsPageComp;