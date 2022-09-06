import { Card } from '@mui/material'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import PurchasesComp from './Purchases';

function ProductComp({ prodData }) {

  const storeData = useSelector(state => state)


  // פילטור של כל הרכישות של אותו מוצר
  let filterPurch = storeData.purchases.filter(x => {
    return x.productId == prodData.id
  })



  return (
    <Card variant="outlined" sx={{ maxWidth: 700 }} >

      <h3>Product Details:</h3>

      Name: <Link to={prodData.id}>{prodData.name}</Link> <br />
      Price: {prodData.price} <br />
      Quantity: {prodData.quantity} <br />

      {
        filterPurch.map(item => {
          return <PurchasesComp key={item.id} purchData={item} /> //מרנדר רכישות פר מוצר
        })
      }


    </Card>

  );
}


export default ProductComp;
