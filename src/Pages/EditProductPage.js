import { useParams } from "react-router-dom";
import { Container, FormControl, List, ListItem, ListItemText } from '@mui/material';
import { Input } from '@mui/material';
import { InputLabel } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import firebase from '../firebaseApp'
import toast from 'toast-me';

const EditProductPageComp = () => {

  const storeData = useSelector(state => state)
  const params = useParams()
  const dispatch = useDispatch()

  const [prodData, setProdData] = useState({ name: '', price: 0, quantity: 0 }) //פרטי המוצר לעריכה


  useEffect(() => {

    let prodObj = storeData.products.find(item => {
      return item.id === params.id
    })
    setProdData(prodObj)

  }, [storeData.products, params.id]) // [storeData.products]  בכדי שהערך בשדות יוצג גם ברענון הדף

  const updateProduct = () => {
    let updateProd = { name: prodData.name, price: prodData.price, quantity: prodData.quantity }  // משמיטה את המזהה כי הוא נוסף אוטומטית בפיירבייס
    firebase.firestore().collection('products').doc(params.id).set(updateProd)
      .then(() => {
        dispatch({ type: "UPDATE_PRODUCT", payload: prodData }) // מעבירה לרדיוסר את האובייקט עם המזהה
        toast("The product was updated!", { duration: 3000 })
      })


  }

  const deleteProduct = () => {
    firebase.firestore().collection('products').doc(params.id).delete()
      .then(() => {
        dispatch({ type: "DELETE_PRODUCT", payload: params.id })
        toast("The product was deleted!", { duration: 3000 })
      })



    //מחיקת כל הרכישות למוצר זה
    storeData.purchases.forEach(purch => {
      if (purch.productId === params.id) {
        console.log(purch.id);
        firebase.firestore().collection('purchases').doc(purch.id).delete()
          .then(() => {
            dispatch({ type: "DELETE_PURCHASE", payload: purch.id })
            toast("All purchases for this product have been deleted!", { duration: 3000 })
          })


      }

    })

  }


  return (
    <div>
        <Container>

          <h1>Edit Product</h1>

          {/* Edit product form */}
          <div style={{ width: "50%", float: "left" }}>
            <h2>Edit product</h2>
            <form style={{ border: "2px solid gold", margin: "30px", padding: "30px", height: "300px" }}>
              <FormControl>
                <InputLabel htmlFor="prodName">Name:</InputLabel>
                <Input id="prodName" value={prodData?.name} onChange={e => setProdData({ ...prodData, name: e.target.value })} />
              </FormControl>
              <br /> <br />
              <FormControl>
                <InputLabel htmlFor="prodPrice">Price:</InputLabel>
                <Input id="prodPrice" value={prodData?.price} onChange={e => setProdData({ ...prodData, price: parseInt(e.target.value) })} />
              </FormControl>
              <br /> <br />
              <FormControl>
                <InputLabel htmlFor="prodQuantity">Quantity:</InputLabel>
                <Input id="prodQuantity" value={prodData?.quantity} onChange={e => setProdData({ ...prodData, quantity: parseInt(e.target.value) })} />
              </FormControl>
              <br /> <br />
              <button type="button" onClick={updateProduct}>Update</button>  {" "}
              <button type="button" onClick={deleteProduct}>Delete</button>
            </form>
          </div>


          {/* Customers list */}
          <div style={{ width: "50%", float: "right" }}>
            <h2>All Customers</h2>
            <List style={{ border: "2px solid gold", margin: "30px", padding: "30px", height: "max-content" }}>
              {
                storeData.customers.map(item => {
                  return <ListItem key={item.id}>
                    <Link to={"/customers/" + item.id}>
                      <ListItemText>{item.firstName} {item.lastName}</ListItemText>
                    </Link>
                  </ListItem>
                })
              }
            </List>
          </div>

        </Container>
      
    </div>
  )
}
export default EditProductPageComp;