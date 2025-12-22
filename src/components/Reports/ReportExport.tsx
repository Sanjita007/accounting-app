import { usePDF } from "@react-pdf/renderer";

const StockReportExport = ({ document, fileName }) => {
  const [instance, updateInstance] = usePDF({ 
    document: <MyInventoryDocument data={data} /> 
  });

  if (instance.loading) return <button disabled>Generating PDF...</button>;
  if (instance.error) return <div>Something went wrong</div>;

  return (
    <a href={instance.url} download="InventoryReport.pdf">
      Download Report
    </a>
  );
};