import {Route, Routes } from 'react-router-dom'
import ProductsPageComp from './ProductsPage';
import CustomersPageComp from './CustomersPage';
import PurchasesPageComp from './PurchasesPage';
import MenuPageComp from './MenuPage';
import EditProductPageComp from './EditProductPage';
import EditCustomerPageComp from './EditCustomerPage';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../firebaseApp'

 
const MainPageComp = () => {

    const dispatch = useDispatch()

    useEffect(async () => {
      
      //products
      let products_data = await firebase.firestore().collection('products').get()
      let products= []
      products_data.forEach(doc => {
         let prodObj = {
              id: doc.id,
              name: doc.data().name,
              price: doc.data().price,
              quantity: doc.data().quantity
  
         }
         products.push(prodObj)
      })
  
    
     //customers
      let customers_data = await firebase.firestore().collection('customers').get()
      let customers = []
      customers_data.forEach(doc => {
        let custObj = {
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          city: doc.data().city
  
        }
        customers.push(custObj)
      })
    
  
      //purchases
      let purchases_data = await firebase.firestore().collection('purchases').get()
      let purchases = []
      purchases_data.forEach(doc => {
        let purchObj = {
          id: doc.id,
          customerId: doc.data().customerId,
          productId: doc.data().productId,
          date: doc.data().date
  
        }
        purchases.push(purchObj)
      })
      
  
      dispatch({ type: "LOAD_PRODUCTS", payload: products })

      dispatch({ type: "LOAD_CUSTOMERS", payload: customers })

      dispatch({ type: "LOAD_PURCHASES", payload: purchases })
  
    },[])
  
  

    return (
        <div>
          
            <Routes>
                <Route path='/' element={<MenuPageComp />}></Route>
                <Route path='/products' element={<ProductsPageComp />}></Route>
                <Route path='/products/:id' element={<EditProductPageComp/>}></Route>
                <Route path='/customers' element={<CustomersPageComp />}></Route>
                <Route path='/customers/:id' element={<EditCustomerPageComp/>}></Route>
                <Route path='/purchases' element={<PurchasesPageComp />}></Route>
            </Routes>


        </div>
    )

}
export default MainPageComp;