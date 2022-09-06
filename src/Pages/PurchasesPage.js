import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux'
import { useState, useMemo } from 'react';
import { Button, Container, List, ListItem, ListItemText } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const PurchasesPageComp = () => {

  const storeData = useSelector(state => state)

  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")

  const [showResults, setShowResults] = useState(false)
  const [startSearch, setStartSearch] = useState(false)


  //עיצוב הטבלה
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  const toggleSearch = (e) => {
    e.preventDefault()
    setShowResults(true)
    setStartSearch(!startSearch)
  }

  const handleSearch = () => {

    //פילטור טבלת רכישות ע"פ הבחירות בשדות

    let filterPurchases = storeData.purchases;

    if (selectedCustomer) {
        let custId = storeData.customers.find(cust => (cust.firstName + " " + cust.lastName) == selectedCustomer).id;
        let filterByCustomer = filterPurchases.filter(purch => purch.customerId == custId)

        filterPurchases = filterByCustomer;
    }

    if (selectedProduct) {
        let prodId = storeData.products.find(prod => prod.name == selectedProduct).id;
        let filterByProduct = filterPurchases.filter(purch => purch.productId == prodId)

        filterPurchases = filterByProduct;
    }

    if (selectedDate) {
        let filterByDate =filterPurchases.filter(purch => purch.date == selectedDate)

        filterPurchases = filterByDate;
    }   
   
    
    return filterPurchases.map(item => {
          let customer = storeData.customers.find(cust => cust.id == item.customerId)
          let product = storeData.products.find(prod => prod.id == item.productId)
          return <TableRow key={item.id}>
                    <TableCell align="center">{customer.firstName + " " + customer.lastName}</TableCell>
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="center">{item.date}</TableCell>
                </TableRow>
    })
   }


  //use function only when start search toggles
  const searchResults = useMemo(() => handleSearch(), [startSearch])
 
  return (
    <Container>

      <h1>Purchases</h1>

      <form onSubmit={e => toggleSearch(e)} style={{ "display": "inline-flex" }}>

        <Autocomplete
          value={selectedCustomer}
          onChange={(event, value) => setSelectedCustomer(value)}
          disablePortal
          id="combo-box-customers"
          options={storeData.customers.map(item => item.firstName + " " + item.lastName)}
          sx={{ width: 300, marginRight: "10px" }}
          renderInput={(params) => <TextField {...params} label="Select Customer" />}
        />

        <Autocomplete
          value={selectedProduct}
          onChange={(event, value) => setSelectedProduct(value)}
          disablePortal
          id="combo-box-products"
          options={storeData.products.map(item => item.name)}
          sx={{ width: 300, marginRight: "10px" }}
          renderInput={(params) => <TextField {...params} label="Select Product" />}
        />

        <TextField id="text-box-date" value={selectedDate} placeholder="dd/mm/yyyy" variant="outlined" label="Date" sx={{ width: 300, marginRight: "10px" }} onChange={e => setSelectedDate(e.target.value)} />

        <Button type="submit" style={{ color: "black", border: "2px solid gold" }}>Search</Button>

      </form>

      <br />  <br />  <br />

      {
        showResults &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" style={{ color: "gold" }}>Customer Name</StyledTableCell>
                <StyledTableCell align="center" style={{ color: "gold" }}>Product Name</StyledTableCell>
                <StyledTableCell align="center" style={{ color: "gold" }}>Purchase Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {searchResults}

            </TableBody>
          </Table>
        </TableContainer>
      }

    </Container>
  )
}
export default PurchasesPageComp;

