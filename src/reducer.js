
function appReducer(state = { products: [], customers: [], purchases: [] }, action) {

    switch (action.type) {

        // ----------products actions----------------
        case "LOAD_PRODUCTS":
            return { ...state, products: action.payload }

        case "UPDATE_PRODUCT":
            let id_UP = action.payload.id
            let arr_UP = [...state.products]
            let index_UP = arr_UP.findIndex(x => x.id === id_UP)
            if (index_UP >= 0) {
                arr_UP[index_UP] = action.payload
            }
            return { ...state, products: arr_UP }

        case "DELETE_PRODUCT":
            let id_DP = action.payload
            let arr_DP = [...state.products]
            let index_DP = arr_DP.findIndex(x => x.id === id_DP)
            if (index_DP >= 0) {
                arr_DP.splice(index_DP, 1)
            }
            return { ...state, products: arr_DP }


        // ----------customers actions----------------
        case "LOAD_CUSTOMERS":
            return { ...state, customers: action.payload }

        case "UPDATE_CUSTOMER":

            let id_UC = action.payload.id
            let arr_UC = [...state.customers]
            let index_UC = arr_UC.findIndex(x => x.id === id_UC)
            if (index_UC >= 0) {
                arr_UC[index_UC] = action.payload
            }
            return { ...state, customers: arr_UC }

        case "DELETE_CUSTOMER":
            let id_DC = action.payload
            let arr_DC = [...state.customers]
            let index_DC = arr_DC.findIndex(x => x.id === id_DC)
            if (index_DC >= 0) {
                arr_DC.splice(index_DC, 1)
            }
            return { ...state, customers: arr_DC }


        // ----------purchases actions----------------
        case "LOAD_PURCHASES":
            return { ...state, purchases: action.payload }

        case "ADD_PURCHASE":
            return { ...state, purchases: [...state.purchases, action.payload] }
            

        case "DELETE_PURCHASE":
            let id_Pur = action.payload
            let arr_Pur = [...state.purchases]
            let index_Pur = arr_Pur.findIndex(x => x.id === id_Pur)
            if (index_Pur >= 0) {
                arr_Pur.splice(index_Pur, 1)
            }
            return { ...state, purchases: arr_Pur }


        default:
            return state;

    }

}
export default appReducer;