import { deletePurchaseInvoice, navigatePurchaseInvoices } from 'src/api';
import ListSharedInvoice from '../VocherCommon/ListSharedInvoice';

const ListSalesInvoice = () => {
  return (
    <ListSharedInvoice type={'PURCHASE'} api={{
      navigate: navigatePurchaseInvoices,
      delete: deletePurchaseInvoice
    }} editRedirect={'purchase-invoice/edit'} labels={{
      entityName: '',
      priceLabel: '',
      invoiceName: ''
    }}></ListSharedInvoice>
  );
};

export default ListSalesInvoice;
