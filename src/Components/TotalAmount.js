import { useSelector } from 'react-redux'


function TotalAmountComp() {

  const storeData = useSelector(state => state)

  return (
    <div>
      <h2>Total Amount</h2>
      {storeData.purchases.length}
    </div>
  );
}

export default TotalAmountComp;
