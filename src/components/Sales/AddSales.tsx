import SharedInvoice from '../VocherCommon/SharedInvoice';
import { getSalesInvoice, postSalesInvoice, putSalesInvoice } from 'src/api';

const AddSalesInvoice = () => {
  return (
    <div>
      <SharedInvoice
        type={'SALE'}
        api={{
          get: getSalesInvoice,
          save: postSalesInvoice,
          update: putSalesInvoice,
        }}
        labels={{
          entityName: 'Customer Name',
          priceLabel: 'Sales Price',
          invoiceName: 'Sales Invoice',
        }}
        redirectPath={'/sales-invoice'}
      ></SharedInvoice>
    </div>
  );
};

export default AddSalesInvoice;
