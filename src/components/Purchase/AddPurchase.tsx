import SharedInvoice from '../VocherCommon/SharedInvoice'
import { getPurchaseInvoice, postPurchaseInvoice, putPurchaseInvoice } from 'src/api'

const AddPurchase = () => {
  return (
    <div>
      <SharedInvoice type={'PURCHASE'} api={{
        get: getPurchaseInvoice,
        save: postPurchaseInvoice,
        update: putPurchaseInvoice
      }} labels={{
        entityName: 'Supplier Name',
        priceLabel: 'Purch Price',
        invoiceName: 'Purchase Invoice'
      }} redirectPath={'/purchase-invoice'}  ></SharedInvoice>
    </div>
  )
}

export default AddPurchase
