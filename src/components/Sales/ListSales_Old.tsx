// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';
// import { deleteSalesInvoice, navigateSalesInvoices } from 'src/api';
// import ReactPaginate from 'react-paginate';

// interface Config {
//   label: string;
//   render: (product: SalesInvoiceMaster) => React.ReactNode;
// }

// const handleDelete = async (id: number) => {
//   alert('Product Id is:' + id);
//   if (confirm('Are you sure you want to delete this sales invoice?') == true) {
//     var res = await deleteSalesInvoice(id);
//     if (res?.status == 200) {
//       alert('Item deleted successfully!');
//     } else {
//       alert(res?.statusText);
//     }
//   }
// };

// const ListSalesInvoice_Old = () => {
//   const [salesInvoices, setSalesInvoices] = useState<SalesInvoiceMaster[] | null>(null);
//   const [pageCount, setPageCount] = useState(10);
//   const [pageNo, setPageNo] = useState(1);
//   const [rowPerPage, setRowPerPage] = useState(10);

//   const navigate = useNavigate();
//   const handleEdit = (product: SalesInvoiceMaster) => {
//     console.log('Edit button clicked');
//     navigate(`/sales-invoice/edit/${product.id}`, { replace: true });
//   };

//   const handlePageClick = (data: any) => {
//     // only setting the pageNo should be enough as we have linked the change event to the fetchData method
//     setPageNo(data.selected + 1);
//   };

//   const configs: Config[] = [
//     { label: 'id', render: (p) => p.id },
//     { label: 'Voucher No', render: (p) => p.voucherNo },
//     { label: 'Date', render: (p) => p.date },
//     { label: 'Gross Amount', render: (p) => p.grossAmount },
//     { label: 'Discount', render: (p) => p.specialDiscount },
//     { label: 'Net Amount', render: (p) => p.netAmount },
//     { label: 'Remarks', render: (p) => p.remarks },
//     {
//       label: 'Action',
//       render: (p) => {
//         return (
//           <div className="flex gap-2">
//             <button
//               onClick={() => handleEdit(p)}
//               className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(p.id)}
//               className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </div>
//         );
//       },
//     },
//   ];
  
//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await navigateSalesInvoices(pageNo, rowPerPage);
//       setSalesInvoices(result.data);
//     };
//     fetchData();
//   }, [pageNo]); // only need to fetch new data when the selected page number changes

//   const renderRows = salesInvoices
//     ? salesInvoices.map((salesInvoice) => (
//         <tr key={salesInvoice.id}>
//           {configs.map((config) => (
//             <td
//               key={config.label}
//               className="p-4 whitespace-nowrap text-m font-normal text-grey-900"
//             >
//               {config.render(salesInvoice)}
//             </td>
//           ))}
//         </tr>
//       ))
//     : null;

//   const renderHeaders = (
//     <tr>
//       {configs.map((config) => (
//         <th
//           className="p-4 text-left text-xs font-medium text-grey-500 uppercase tracking wider"
//           key={config.label}
//         >
//           {config.label}
//         </th>
//       ))}
//     </tr>
//   );

//   return (
//     <div className="bg-white rounded-lg p-4 sm:p-6 xl:p-8">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead>{renderHeaders}</thead>
//         <tbody>{renderRows}</tbody>
//       </table>
//       <div>
//         <ReactPaginate
//           previousLabel={'Previous'}
//           nextLabel={'Next'}
//           breakLabel={'...'}
//           //breakClassName={"break-me"}
//           pageCount={pageCount}
//           marginPagesDisplayed={2} // Number of pages to show at the beginning and end
//           pageRangeDisplayed={3} // Number of pages to show around the current page
//           onPageChange={handlePageClick}
//           containerClassName="flex justify-center items-center gap-2 mt-6 list-none"
//           pageClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
//           activeClassName="bg-blue-500 text-white"
//           previousClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
//           nextClassName="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"
//           breakClassName="px-3 py-1"
//         />{' '}
//       </div>
//     </div>
//   );
// };

// export default ListSalesInvoice_Old;
