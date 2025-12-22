export interface Product {
  id: number;
  engName: string;
  nepName: string;
  groupID: number;
  code: string;
  depotID: number;
  remarks: string;
  unitID: number;
  unitName: string;
  unitSymbol: string;
  salesRate: number;
  purchaseRate: number;
  purchaseDiscount: number;
  isBuiltIn: boolean;
  isActive: boolean;
  createdBy: string;
  createdDate: Date;
  modifiedBy: string;
  modifiedDate: Date;
  backColor: string;
  isVatApplicable: boolean;
  debtorId: int;
  rentDate: Date;
  isDecimalApplicable: boolean;
  isInventoryApplicable: boolean;
  contactPerson: string;
  address1: string;
  address2: string;
  city: string;
  taxID: number;
  companyID: number;
  conversionRate: number;

  //         public int CompanyID { get; set; } = 1;
  //         public string ParentProductID { get; set; }
  //         public string Size { get; set; }
  //         public int TaxID { get; set; }

  units: RelatedUnit[];
}

export interface ProductGroup {
  id: number;
  engName: string;
  nepName: string;
  parentGroupID: number;
  level: number;
  isBuiltIn: int;
  remarks: string;
}

export interface Unit {
  id: number;
  name: string;
  symbol: string;
  remarks: string;
}

export interface CompoundUnit {
  id: number;
  unitName: string;
  unitID: number;
  parentUnitName: string;
  parentUnitID: number;
  relationValue: number;
  remarks: string;
}

export interface RelatedUnit {
  id: number;
  name: string; // ISO Date string
  conversionRate: number; // ISO Date string
}

export interface Tax {
  id: number;
  name: string;
  code: string;
  remarks: string;
  rate: float;
}

export interface Depot {
  id: number;
  name: string;
}

export interface UserLogin {
  userName: string;
  password: string;
}

export interface SalesMinimal {
  id: number;
}

export interface Base {
  id: number;
  createdDate: string; // ISO Date string
  modifiedDate: string; // ISO Date string
  createdBy: number;
  modifiedBy: number;
  companyID: number;
  remarks?: string | null;
}

export interface SalesInvoiceDetail {
  id: number;
  masterID: number;
  productCode: string;
  productID: number;
  productName: string;
  quantity: number;
  salesPrice: float;
  amount: float;
  discPercent: number;
  discount: number;
  netAmount: number;
  qtyUnitID: number;
  defaultUnitID: number;
  defaultUnitName: string;
  defaultUnitSymbol: string;
  taxID: number;
  taxPercent: float;
  taxAmount: float;
  generalName?: string | null;
  remarks?: string | null;
  vatAmount: float;
  totalAmount: float;
  // this is just for the tracking
  uid: string;

  unitDetails: RelatedUnit[];
}

export interface SalesInvoiceMaster extends Base {
  seriesID?: number | null;
  cashLedgerID?: number | null;
  salesLedgerID?: number | null;
  depotID?: number | null;
  orderNo?: string | null;
  voucherNo?: string | null;
  customerName?: string | null;
  date?: Date; // ISO Date string
  projectID?: number | null;
  totalQty: number;
  grossAmount: number;
  specialDiscount: number;
  netAmount: number;
  tax1?: number;
  tax2?: number;
  tax3?: number;
  vat?: number;
  totalAmount: number;
  salesDueDate?: string; // ISO Date string
  tableNumber?: number;
  totalTCAmount: float;
  tenderAmount?: number;
  changeAmount?: number;
  adjustmentAmount?: number;
  details: SalesInvoiceDetail[];
}

export interface Tree {
  id: number;
  level: int;
  name: string;
  parentId: string;
  isProduct: boolean;
  children?: Tree[];
}

export interface GrossProfit {
  productId: number;
  productCode: string;
  productName: string;
  quantitySold: number;
  totalRevenue: number;
  totalCost: number;
  profit: number;
  margin: number;
}

export interface GrossProfitSummary {
  grossProfitList: GrossProfit[];
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
}

export interface InventoryDetails {
  productId: number;
  productCode: string;
  productName: string;
  quantityIn: number;
  quantityOut: number;
  quantityOnHand: number;
  averageSalesPrice: number;
  totalInValue: number;
}

export interface InventorySummary {
  inventoryDetail: InventoryDetails[];
  totalQuantityIn: number;
  totalQuantityOut: number;
  totalQuantityOnHand: number;
  totalInValue: number;
}
