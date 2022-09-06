import { Container } from '@mui/material';
import { useSelector } from 'react-redux'
import CustomerComp from './Customer';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function CustomersComp() {

  const storeData = useSelector(state => state)


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
  

  return (

    <Container>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" style={{color:"gold"}}>Customer Name</StyledTableCell>
              <StyledTableCell align="center" style={{color:"gold"}}>Product Name</StyledTableCell>
              <StyledTableCell align="center" style={{color:"gold"}}>Purchase Date</StyledTableCell>
              <StyledTableCell align="center" style={{color:"gold"}}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              storeData.customers.map(item => {
                return <StyledTableRow key={item.id}>
                  <CustomerComp customerData={item} customerPurchases={storeData.purchases.filter(x => x.customerId == item.id)}/>
                </StyledTableRow>
              })
            }
          </TableBody>
        </Table>
      </TableContainer>

    </Container>
  );
}

export default CustomersComp;
