import { deleteSalesInvoice, navigateSalesInvoices } from 'src/api';
import ListSharedInvoice from '../VocherCommon/ListSharedInvoice';

const ListSalesInvoice = () => {
  return (
    <ListSharedInvoice type={'SALE'} api={{
      navigate: navigateSalesInvoices,
      delete: deleteSalesInvoice
    }} editRedirect={'sales-invoice/edit'} labels={{
      entityName: '',
      priceLabel: '',
      invoiceName: ''
    }}></ListSharedInvoice>
  );
};

export default ListSalesInvoice;
