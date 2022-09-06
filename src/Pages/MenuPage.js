import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';





const MenuPageComp = () => {

    return (
        <div>
            <h1>Welcome To My store!</h1>

            <Box sx={{ p: 12, border: '1px solid gold', boxShadow: 3, fontSize: '20px', '&:hover': { backgroundColor: 'gold', opacity: [0.9, 0.9, 0.5] } }}>
                <Link to='/products' style={{ "textDecoration": "none", "color": "black" }}>Products</Link>
            </Box>
            <Box sx={{ p: 12, border: '1px solid gold', boxShadow: 3, fontSize: '20px', '&:hover': { backgroundColor: 'gold', opacity: [0.9, 0.9, 0.5] } }}>
                <Link to='/customers' style={{ "textDecoration": "none", "color": "black" }}>Customers</Link>
            </Box>
            <Box sx={{ p: 12, border: '1px solid gold', boxShadow: 3, fontSize: '20px', '&:hover': { backgroundColor: 'gold', opacity: [0.9, 0.9, 0.5] } }}>
                <Link to='/purchases' style={{ "textDecoration": "none", "color": "black" }}>Purchases</Link>
            </Box>

        </div>
    )

}
export default MenuPageComp;