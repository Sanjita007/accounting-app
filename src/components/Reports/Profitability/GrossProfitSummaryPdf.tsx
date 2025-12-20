// ProfitReportPDF.js

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { GrossProfitSummary } from 'src/Models/Model';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: 'Helvetica' },
  title: { fontSize: 18, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  // Table Styles
  table: { display: 'table', width: 'auto', borderStyle: 'solid', borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableColHeader: { width: '16.6%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, backgroundColor: '#f0f0f0' },
  tableCol: { width: '16.6%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableCellHeader: { margin: 5, fontSize: 10, fontWeight: 'bold' },
  tableCell: { margin: 5, fontSize: 9 },
  // Totals Styles
  totalsRow: { flexDirection: 'row', marginTop: 10, borderTopWidth: 2, paddingTop: 5 },
  footer: { marginTop: 20, textAlign: 'center', color: 'grey', fontSize: 8 }
});

type Props= {
    data: GrossProfitSummary | null
}

const ProfitReportPDF = (props: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Gross Profitability Report</Text>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Product</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Qty</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Revenue</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Cost</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Profit</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Margin%</Text></View>
        </View>

        {/* Table Rows */}
        {props.data?.grossProfitList.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.productName}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.quantitySold}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.totalRevenue.toFixed(2)}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.totalCost.toFixed(2)}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.profit.toFixed(2)}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.margin.toFixed(2)}%</Text></View>
          </View>
        ))}
      </View>

      {/* Grand Totals Section */}
      <View style={styles.totalsRow}>
        <Text style={{ flex: 1, fontWeight: 'bold' }}>GRAND TOTALS:</Text>
        <Text style={{ width: '16.6%', fontWeight: 'bold' }}>{props.data?.totalRevenue.toFixed(2)}</Text>
        <Text style={{ width: '16.6%', fontWeight: 'bold' }}>{props.data?.totalCost.toFixed(2)}</Text>
        <Text style={{ width: '16.6%', fontWeight: 'bold' }}>{props.data?.totalProfit.toFixed(2)}</Text>
      </View>

      <Text style={styles.footer}>Report Generated on {new Date().toLocaleDateString()}</Text>
    </Page>
  </Document>
);

export default ProfitReportPDF;