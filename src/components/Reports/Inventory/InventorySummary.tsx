import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { getInventorySummaryReport, } from 'src/api';
import { InventoryDetails, InventorySummary } from 'src/Models/Model';
import ProfitReportPDF from './InventorySummaryPdf';

interface Config {
  label: string;
  render: (product: InventoryDetails) => React.ReactNode;
}

const InventoryReport = () => {
  const [reportSummary, setReportSummary] = useState<InventorySummary | null>(null);

  const configs: Config[] = [
    { label: 'id', render: (p) => p.productId },
    { label: 'Code', render: (p) => p.productCode },
    { label: 'Product', render: (p) => p.productName },
    {
      label: 'Qty In',
      render: (p) => (
        <div className="text-right rtl:text-left text-body">
          <span> {p.quantityIn} </span>
        </div>
      ),
    },
    {
      label: 'Qty Out',
      render: (p) => {
        return (
          <div className="text-right rtl:text-left text-body">
            <span> {p.quantityOut} </span>
          </div>
        );
      },
    },
    {
      label: 'Qty On Hand',
      render: (p) => {
        return (
          <div className="text-right rtl:text-left text-body">
            <span> {p.quantityOnHand} </span>
          </div>
        );
      },
    },
    {
      label: 'Avg Sales Price',
      render: (p) => {
        return (
          <div className="text-right rtl:text-left text-body">
            <span> {p.averageSalesPrice} </span>
          </div>
        );
      },
    },
    {
      label: 'Total In Value',
      render: (p) => (
        <div className="text-right rtl:text-left text-body">
          <span> {p.totalInValue} </span>
        </div>
      ),
    },
  
  ];
  useEffect(() => {
    const fetchData = async () => {
      const result = await getInventorySummaryReport();
      setReportSummary(result);
    };
    fetchData();
  }, []);

  const renderRows = reportSummary
    ? reportSummary.inventoryDetail.map((d) => (
        <tr key={d.productId}>
          {configs.map((config) => (
            <td
              key={config.label}
              className="p-4 whitespace-nowrap text-m font-normal text-grey-700"
            >
              {config.render(d)}
            </td>
          ))}
        </tr>
      ))
    : null;

  const renderHeaders = (
    <tr>
      {configs.map((config) => (
        <th
          className="p-4 text-center text-xs font-medium text-grey-900 text-bold uppercase tracking wider"
          key={config.label}
        >
          {config.label}
        </th>
      ))}
    </tr>
  );

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 xl:p-8">
      <div>
        <PDFDownloadLink
          document={<ProfitReportPDF data={reportSummary} />}
          fileName="Gross_Profit_Report.pdf"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          {({ loading }) => (loading ? 'Preparing PDF...' : 'Download Profit Report')}
        </PDFDownloadLink>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className='font-bold'>{renderHeaders}</thead>
        <tbody>
          {renderRows}

          <tr>
            <td></td>
            <td className="text-center text-body font-bold">Total</td>
            <td>
              <div className="text-right rtl:text-left text-body font-bold">
                {reportSummary?.totalQuantityIn}
              </div>
            </td>
            <td>
              <div className="text-right rtl:text-left text-body font-bold">
                {reportSummary?.totalQuantityOut}
              </div>
            </td>
            <td>
              <div className="text-right rtl:text-left text-body font-bold">
                {reportSummary?.totalQuantityOnHand}
              </div>
            </td>
            <td>
              <div className="text-right rtl:text-left text-body font-bold">
                {reportSummary?.totalInValue}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div></div>
    </div>
  );
};

export default InventoryReport;
