import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { InvoiceMaster } from 'src/Models/Model';
import ReactPaginate from 'react-paginate';
import { CustomBoxContext } from '../shared/useConfirmation';

interface BaseInvoiceProps {
  type: 'SALE' | 'PURCHASE';
  api: {
    navigate: (pageNo: number, rowPerPage: number) => Promise<any>;
    delete: (data: any) => Promise<any>;
  };
  editRedirect: string;
  labels: {
    entityName: string; // "Customer" or "Supplier"
    priceLabel: string; // "Sales Price" or "Unit Cost"
    invoiceName: string; // purchase invoice or sales invoice
  };
}

interface Config {
  label: string;
  render: (product: InvoiceMaster) => React.ReactNode;
  type: string; // text or num
}

const ListSharedInvoice = (props: BaseInvoiceProps) => {
  const [invoices, setInvoices] = useState<InvoiceMaster[] | null>(null);
  const [pageCount, setPageCount] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [rowPerPage] = useState(10);

  const navigate = useNavigate();

  // Got the fuction from the context
  const { showConfirmation } = useContext(CustomBoxContext);

  const handleEdit = (id: number) => {
    const link = `/${props.editRedirect}/${id}`;
    alert(link);
    console.log('Edit button clicked');
    navigate(link, { replace: true });
  };

  const handleDelete = async (id: number) => {
    const del = await showConfirmation(
      'Delete Item',
      'Are you sure you want to delete this invoice?',
    );
    if (del === true) {
      var res = await props.api.delete(id);
      if (res?.status == 200) {
        alert('Item deleted successfully!');
      } else {
        alert(res);
      }
    }
  };
  const handlePageClick = (data: any) => {
    // only setting the pageNo should be enough as we have linked the change event to the fetchData method
    setPageNo(data.selected + 1);
  };

  const configs: Config[] = [
    { label: 'id', render: (p) => p.id, type: 'num' },
    { label: 'Voucher No', render: (p) => p.voucherNo, type: 'num' },
    { label: 'Date', render: (p) => new Date(p.date).toLocaleDateString(), type: 'num' },
    {
      label: 'Gross Amount',
      render: (p) => p.grossAmount,
      type: 'num',
    },
    { label: 'Discount', render: (p) => p.specialDiscount, type: 'num' },
    { label: 'Net Amount', render: (p) => p.netAmount, type: 'num' },
    { label: 'Remarks', render: (p) => p.remarks, type: 'text' },
    {
      label: 'Action',
      render: (p) => {
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(p.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(p.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        );
      },
      type: 'num',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await props.api.navigate(pageNo, rowPerPage);
      setInvoices(result.data.entity);
      
      setPageCount(result.data.pageCount);
    };
    fetchData();
  }, [pageNo]); // only need to fetch new data when the selected page number changes

  const renderRows = invoices
    ? invoices.map((invoice) => (
        <tr key={invoice.id}>
          {configs.map((config) => (
            <td
              key={config.label}
              className={`p-4 whitespace-nowrap  ${
                config.type === 'num' ? 'text-right' : 'text-left'
              } text-m font-normal text-grey-900`}
            >
              {config.render(invoice)}
            </td>
          ))}
        </tr>
      ))
    : null;

  const renderHeaders = (
    <tr>
      {configs.map((config) => (
        <th
          className={`p-4 text-center
                       text-xs font-medium text-grey-500 uppercase tracking wider`}
          key={config.label}
        >
          {config.label}
        </th>
      ))}
    </tr>
  );

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 xl:p-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>{renderHeaders}</thead>
        <tbody>{renderRows}</tbody>
      </table>
      <div>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          //breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2} // Number of pages to show at the beginning and end
          pageRangeDisplayed={3} // Number of pages to show around the current page
          onPageChange={handlePageClick}
          containerClassName="flex justify-center items-center gap-2 mt-6 list-none"
          pageClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
          activeClassName="bg-blue-500 text-white"
          previousClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
          nextClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
          breakClassName="px-3 py-1"
        />{' '}
      </div>
    </div>
  );
};

export default ListSharedInvoice;
