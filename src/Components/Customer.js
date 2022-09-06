import { useState } from 'react';
import AddProductComp from './AddProduct';
import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CustomerComp({ customerData, customerPurchases }) {

  const storeData = useSelector(state => state)

  const [isopen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

//מציאת מערך של מוצרים שרכש הלקוח כדי להציג את שם המוצר
  const customerProducts = customerPurchases.map(item => {
    return storeData.products.find(x => x.id === item.productId)
  })

  
  return (

    <>
      <TableCell align="center">{customerData.firstName} {customerData.lastName}</TableCell>
      <TableCell align="center">
        <ul>
          {
            customerProducts.map(x => {
              return <li key={x.id}>
                <Link to={"/products/" + x.id}>{x.name}</Link>
              </li>
            })
          }
        </ul>
      </TableCell>
      <TableCell align="center">
        <ul>
          {
            customerPurchases.map(x => {
              return <li key={x.id}>{x.date}</li>
            })
          }
        </ul>
      </TableCell>
      <TableCell align="center">
        <Button type="button" size="small" variant="outlined" onClick={handleClickOpen} style={{ color: "black", border: "2px solid gold" }}>Buy Product</Button>
        {
          isopen && <AddProductComp customerID={customerData.id} isDialogOpened={isopen} isDialogclosed={(bol) => setIsOpen(bol)} />
        }
      </TableCell>
    </>
  );
}

export default CustomerComp;
