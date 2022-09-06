import { useState } from 'react';
import { Card } from '@mui/material'
import { Link } from 'react-router-dom'
import * as React from 'react';
import AddProductComp from './AddProduct';
import { useSelector } from 'react-redux';


function PurchasesComp({ purchData }) {

  const storeData = useSelector(state => state)


  const [isopen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  //פרטי הלקוח של הרכישה
  const customerData = storeData.customers.find(item => {
    return purchData.customerId == item.id
  })

  return (
    <Card variant="outlined" sx={{ maxWidth: 300 }} >
      <h3>Purchaser details:</h3>
      Name: <Link to={"/customers/" + purchData.customerId}>{customerData.firstName} {customerData.lastName}</Link> <br />
      Purchased date: {purchData.date} <br />

      <button variant="outlined" onClick={handleClickOpen}>Add</button>
        {
          isopen && <AddProductComp customerID={purchData.customerId} isDialogOpened={isopen} isDialogclosed={(bol) => setIsOpen(bol)} />
        }
   
    </Card >
  );
}

export default PurchasesComp;
