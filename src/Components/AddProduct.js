import { useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import firebase from '../firebaseApp';
import toast from 'toast-me';


function AddProductComp({ customerID, isDialogOpened, isDialogclosed }) {

  const storeData = useSelector(state => state)

  const dispatch = useDispatch()

  const [val, setVal] = useState("")

  const handleClose = () => {
    isDialogclosed(false)
  };


  const handleSave = () => {

    const newProd = { customerId: customerID, productId: checkProd.id, date: todayDate }
    firebase.firestore().collection('purchases').add(newProd)
      .then(()=> {
        dispatch({ type: "ADD_PURCHASE", payload: newProd })
        toast("The product " + val + " was added" , {duration: 3000})
      })
      handleClose()
     

  };

  //שולף את התאריך העכשווי מהמחשב
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  const todayDate = dd + '/' + mm + '/' + yyyy;

  //הצגת רשימת מוצרים בקומבובוקס בפופאפ
  const productsNames = []
  storeData.products.map(item => productsNames.push(item.name))

  //מוצא את המזהה של המוצר הנבחר בקומבובוקס
  const checkProd = storeData.products.find(item => {
    return item.name === val
  })



  return (
    <div>

      <Dialog open={isDialogOpened} onClose={handleClose} fullWidth={true} >
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent style={{ height: '150px' }}>
            <Autocomplete
              onChange={(event, value) => setVal(value)}
              disablePortal
              id="combo-box-products"
              options={productsNames}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="product" />}
            />
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose} style={{color:"black", border:"2px solid gold"}}>Cancel</Button>
          <Button onClick={handleSave} style={{color:"black", border:"2px solid gold"}}>Save</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default AddProductComp;
