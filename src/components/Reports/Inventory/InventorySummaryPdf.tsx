// ProfitReportPDF.js

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { InventorySummary } from 'src/Models/Model';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: 'Helvetica' },
  title: { fontSize: 18, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  // Table Styles
  table: { width: 'auto', borderStyle: 'solid', borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableColCodeHeader: { width: '16%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, 
            borderTopWidth: 0, backgroundColor: '#f0f0f0' },
  tableColNameHeader: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, 
              borderTopWidth: 0, backgroundColor: '#f0f0f0' },
  tableColNumHeader: { width: '13%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, 
              borderTopWidth: 0, backgroundColor: '#f0f0f0' },
    tableColTotalHeader: { width: '20%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, 
              borderTopWidth: 0, backgroundColor: '#f0f0f0' },

  tableColCode: { width: '16%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableColName: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  
  tableNumberedCol: { width: '13%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, textAlign:"right" },
    tableTotalCol: { width: '20%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, textAlign:"right" },

  tableCellHeader: { margin: 5, fontSize: 10, fontWeight: 'bold' },
  tableCell: { margin: 5, fontSize: 9 },

  // Totals Styles
  totalsRow: { flexDirection: 'row', marginTop: 10, borderTopWidth: 2, paddingTop: 5 },
  footer: { marginTop: 20, textAlign: 'center', color: 'grey', fontSize: 8 }
});

type Props= {
    data: InventorySummary | null
}

const InventortyReportPDF = (props: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Inventory Valuation Report</Text>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColCodeHeader}><Text style={styles.tableCellHeader}>Product Code</Text></View>
          <View style={styles.tableColNameHeader}><Text style={styles.tableCellHeader}>Product</Text></View>
          <View style={styles.tableColNumHeader}><Text style={styles.tableCellHeader}>Qty In</Text></View>
          <View style={styles.tableColNumHeader}><Text style={styles.tableCellHeader}>Qty Out</Text></View>
          <View style={styles.tableColNumHeader}><Text style={styles.tableCellHeader}>Qty On Hand</Text></View>
          <View style={styles.tableColTotalHeader}><Text style={styles.tableCellHeader}>Total Valuation</Text></View>
        </View>

        {/* Table Rows */}
        {props.data?.inventoryDetail.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableColCode}><Text style={styles.tableCell}>{item.productCode}</Text></View>
            <View style={styles.tableColName}><Text style={styles.tableCell}>{item.productName}</Text></View>
            <View style={styles.tableNumberedCol}><Text style={styles.tableCell}>{item.quantityIn?.toFixed(2)}</Text></View>
            <View style={styles.tableNumberedCol}><Text style={styles.tableCell}>{item.quantityOut?.toFixed(2)}</Text></View>
            <View style={styles.tableNumberedCol}><Text style={styles.tableCell}>{item.quantityOnHand?.toFixed(2)}</Text></View>
            <View style={styles.tableTotalCol}><Text style={styles.tableCell}>{item.totalInValue?.toFixed(2)}</Text></View>
          </View>
        ))}
      </View>

      {/* Grand Totals Section */}
      <View style={styles.totalsRow}>
        <Text style={{ flex: 1, fontWeight: 'bold' }}>GRAND TOTALS:</Text>
        <Text style={{ width: '15%', fontWeight: 'bold' }}>Total Qty In: {props.data?.totalQuantityIn?.toFixed(2)}</Text>
        <Text style={{ width: '15%', fontWeight: 'bold' }}>Total Qty Out: {props.data?.totalQuantityOut?.toFixed(2)}</Text>
        <Text style={{ width: '15%', fontWeight: 'bold' }}>Total On Hand: {props.data?.totalQuantityOnHand?.toFixed(2)}</Text>
        <Text style={{ width: '21%', fontWeight: 'bold' }}>Total In Value: {props.data?.totalInValue?.toFixed(2)}</Text>

      </View>

      <Text style={styles.footer}>Report Generated on {new Date().toLocaleDateString()}</Text>
    </Page>
  </Document>
);

export default InventortyReportPDF;