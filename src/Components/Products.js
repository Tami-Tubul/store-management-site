import { useSelector } from 'react-redux'
import ProductComp from './Product'
import {Container} from '@mui/material'


function ProductsComp() {

  const storeData = useSelector(state => state)


  return (

    <Container>
      <h2>All Products</h2>
      {
        storeData.products.map(item => {
          return <ProductComp key={item.id} prodData={item} />
        })
      }
    </Container>
  );
}

export default ProductsComp;
