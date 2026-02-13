import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { getProfitSummaryReport } from 'src/api';
import { GrossProfit, GrossProfitSummary } from 'src/Models/Model';
import ProfitReportPDF from './GrossProfitSummaryPdf';

interface Config {
  label: string;
  render: (product: GrossProfit) => React.ReactNode;
}

const GrossProfitReport = () => {
  const [grossProfitSummary, setGrossProfitSummary] = useState<GrossProfitSummary | null>(null);

  const configs: Config[] = [
    { label: 'id', render: (p) => p.productId },
    { label: 'Code', render: (p) => p.productCode },
    { label: 'Product', render: (p) => p.productName },
    {
      label: 'Qty Sold',
      render: (p) => (
        <div className="text-right rtl:text-left text-body">
          <span> {p.quantitySold} </span>
        </div>
      ),
    },
    {
      label: 'Revenue',
      render: (p) => {
        return (
          <div className="text-right rtl:text-left text-body">
            <span> {p.totalRevenue} </span>
          </div>
        );
      },
    },
    {
      label: 'Cost',
      render: (p) => {
        return (
          <div className="text-right rtl:text-left text-body">
            <span> {p.totalCost} </span>
          </div>
        );
      },
    },
    {
      label: 'Profit',
      render: (p) => (
        <div className="text-right rtl:text-left text-body">
          <span> {p.profit} </span>
        </div>
      ),
    },
    {
      label: 'Margin',
      render: (p) => (
        <div className="text-right rtl:text-left text-body">
          <span> {p.margin} </span>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const result = await getProfitSummaryReport();
      setGrossProfitSummary(result.data);
    };
    fetchData();
  }, []);

  const renderRows = grossProfitSummary
    ? grossProfitSummary.grossProfitList.map((d) => (
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
          document={<ProfitReportPDF data={grossProfitSummary} />}
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
            <td></td>
            <td className="text-center text-body font-bold">Total</td>
            <td>
              <div className="text-right rtl:text-left text-body font-bold">
                {grossProfitSummary?.totalRevenue}
              </div>
            </td>
            <td>
              <div className="text-right rtl:text-left text-body font-bold">
                {grossProfitSummary?.totalCost}
              </div>
            </td>
            <td>
              <div className="text-right rtl:text-left text-body font-bold">
                {grossProfitSummary?.totalProfit}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div></div>
    </div>
  );
};

export default GrossProfitReport;
