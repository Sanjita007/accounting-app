import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { getProfitSummaryReport } from 'src/api';
import { GrossProfit, GrossProfitSummary } from 'src/Models/Model';
import ProfitReportPDF from './GrossProfitSummaryPdf';

interface Config {
  label: string;
  render: (product: GrossProfit) => React.ReactNode;
}

const GrossProfitReport= () => {
  const [grossProfitSummary, setGrossProfitSummary] = useState<GrossProfitSummary | null>(null);
 
const configs: Config[] = [
  { label: 'id', render: (p) => p.productId },
  { label: 'Code', render: (p) => p.productCode },
  { label: 'Product', render: (p) => p.productName },
  { label: 'Qty Sold', render: (p) => p.quantitySold },
  { label: 'Revenue', render : (p) => {
          return (
              <span className='text-right rtl:text-left text-body'> {p.totalRevenue} </span>         
          );
        },
    },
  { label: 'Cost', render: (p) => p.totalCost },
  { label: 'Margin', render: (p) => p.margin }
  
];
  useEffect(() => {
    const fetchData = async () => {
      const result = await getProfitSummaryReport();
      setGrossProfitSummary(result);
    };
    fetchData();
  }, []);

  const renderRows = grossProfitSummary
    ? grossProfitSummary.grossProfitList.map((d) => (
        <tr key={d.productId}>
          {configs.map((config) => (
            <td
              key={config.label}
              className="p-4 whitespace-nowrap text-m font-normal text-grey-900"
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
          className="p-4 text-left text-xs font-medium text-grey-500 uppercase tracking wider"
          key={config.label}
        >
          {config.label}
        </th>
      ))}
    </tr>
  );

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 xl:p-8">
        <div><PDFDownloadLink
        document={<ProfitReportPDF data={grossProfitSummary} />}
        fileName="Gross_Profit_Report.pdf"
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
      >
        {({ loading }) => (loading ? 'Preparing PDF...' : 'Download Profit Report')}
      </PDFDownloadLink></div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>{renderHeaders}</thead>
        <tbody>{renderRows}</tbody>
      </table>
    </div>
  );
};

export default GrossProfitReport;
