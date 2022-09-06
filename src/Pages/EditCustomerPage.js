import { useParams } from "react-router-dom";
import { Container, FormControl, List, ListItem, ListItemText } from '@mui/material';
import { Input } from '@mui/material';
import { InputLabel } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import firebase from "../firebaseApp";
import toast from 'toast-me';


const EditProductPageComp = () => {

  const [custData, setCustData] = useState({ firstName: '', lastName: '', city: '' }) //פרטי הלקוח לעריכה

  const storeData = useSelector(state => state)
  const params = useParams()
  const dispatch = useDispatch()


  useEffect(() => {
    let custObj = storeData.customers.find(item => {
      return item.id === params.id
    })
    setCustData(custObj)
  }, [storeData.customers,params.id]) // [storeData.customers] בכדי שהערך בשדות יוצג גם ברענון הדף

  const updateCustomer = () => {
    let updateCust = { firstName: custData.firstName, lastName: custData.lastName, city: custData.city } // משמיטה את המזהה כי הוא נוסף אוטומטית בפיירבייס
    firebase.firestore().collection('customers').doc(params.id).update(updateCust)
      .then(() => {
        dispatch({ type: "UPDATE_CUSTOMER", payload: custData })  // מעבירה לרדיוסר את האובייקט עם המזהה
        toast("The customer was updated!",{ duration: 3000})
      })

  }

  const deleteCustomer = () => {

    firebase.firestore().collection('customers').doc(params.id).delete()
      .then(() => {
        dispatch({ type: "DELETE_CUSTOMER", payload: params.id })
        toast("The customer was deleted!",{ duration: 3000})
      })

   
    //מחיקת כל הרכישות ללקוח זה
    storeData.purchases.forEach(purch => {
      if (purch.customerId === params.id) {
        firebase.firestore().collection('purchases').doc(purch.id).delete()
          .then(() => {
            dispatch({ type: "DELETE_PURCHASE", payload: purch.id })
            toast("All purchases for this customer have been deleted!",{ duration: 3000})
          })
       
      }


    })

  }

  return (
    <Container>

      <h1>Edit Customer</h1>

      {/* Edit product form */}
      <div style={{ width: "50%", float: "left" }}>
        <h2>Edit Customer</h2>
        <form style={{ border: "2px solid gold", margin: "30px", padding: "30px", height: "300px" }}>
          <FormControl>
            <InputLabel htmlFor="custFname">First Name:</InputLabel>
            <Input id="custFname" value={custData?.firstName} onChange={e => setCustData({ ...custData, firstName: e.target.value })} />
          </FormControl>
          <br /> <br />
          <FormControl>
            <InputLabel htmlFor="custLname">Last Name:</InputLabel>
            <Input id="custLname" value={custData?.lastName} onChange={e => setCustData({ ...custData, lastName: e.target.value })} />
          </FormControl>
          <br /> <br />
          <FormControl>
            <InputLabel htmlFor="custCity">City:</InputLabel>
            <Input id="custCity" value={custData?.city} onChange={e => setCustData({ ...custData, city: e.target.value })} />
          </FormControl>
          <br /> <br />
          <button type="button" onClick={updateCustomer}>Update</button>  {" "}
          <button type="button" onClick={deleteCustomer}>Delete</button>
        </form>

      </div>

      {/* Customers list */}
      <div style={{ width: "50%", float: "right" }}>
        <h2>All Products</h2>
        <List style={{ border: "2px solid gold", margin: "30px", padding: "30px", height: "max-content" }}>
          {
            storeData.products.map(item => {
              return <ListItem key={item.id}>
                <Link to={"/products/" + item.id}>
                  <ListItemText>{item.name}</ListItemText>
                </Link>
              </ListItem>
            })
          }
        </List>
      </div>


    </Container>
  )
}
export default EditProductPageComp;