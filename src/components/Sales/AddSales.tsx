import {
  Label,
  TextInput,
  Table,
  Button,
  Datepicker,
  TableRow,
  TableCell,
  TableHead,
  TableHeadCell,
  TableBody,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Dropdown from 'react-dropdown-select';

import {
  convertUnits,
  getProducts,
  getRelatedUnits,
  getSalesInvoice,
  getTaxes,
  getUnits,
  postSalesInvoice,
  putSalesInvoice,
} from 'src/api';

import { Product, SalesInvoiceDetail, SalesInvoiceMaster, Tax, Unit } from 'src/Models/Model';
import { NumberInput } from '../shared/CustomNumberInput';
import { useCustomAlertBox } from '../shared/CustomAlertBox';
import { FormatIntoNumber } from 'src/utils/utils';
import { ProductListModal } from '../Product/ProductListModal';

type Props = {
  //product: Product;
};

const AddSalesInvoice = (props: Props) => {
  let { id } = useParams();
  const navigate = useNavigate();

  const { apiWithToast } = useCustomAlertBox();

  const [products, setProducts] = useState<Product[] | null>(null);
  //const [units, setUnits] = useState<Unit[] | null>(null);
  const [taxes, setTaxes] = useState<Tax[] | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const [productList, setProductList] = useState<Product[]>([]);

  const [salesInvoice, setSalesInvoice] = useState<SalesInvoiceMaster | null>(null);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (salesInvoice) {
      if (salesInvoice.id) {
        //alert("updating");
        apiWithToast(putSalesInvoice(salesInvoice), {
          loading: 'Updating sales invoice..',
          success: 'Sales Invoice updated successfully!',
          error: 'Failed to update a Sales Invoice.',
        });
      } else {
        apiWithToast(postSalesInvoice(salesInvoice), {
          loading: 'Creating sales invoice',
          success: 'Sales Invoice created successfully!',
          error: 'Failed to create a sales invoice.',
        });
      }

      navigate('/sales-invoice');
    }
  };

  const calculateTax = (taxId: number, netAmount: number) => {
    const rate = taxes?.find((r) => String(r.id) === String(taxId))?.rate ?? 0;

    let taxAmount = (netAmount * rate) / 100;
    let totalAmount = netAmount + taxAmount;

    return {
      taxAmount,
      totalAmount,
    };
  };

  const handleTaxChange = (index: number, value: any) => {
    const taxId = parseInt(value);
    console.log(taxes);
    console.log(
      'found:',
      taxes?.find((t) => String(t.id) === String(taxId)),
    );

    setSalesInvoice((prev) => {
      if (!prev) return prev; // nothing to update

      const updatedDetails = prev.details.map((d, i) => {
        return i === index ? { ...d, taxID: taxId, ...calculateTax(taxId, d.netAmount) } : d;
      });

      console.log(updatedDetails);

      const updatedInvoice = { ...prev, details: updatedDetails };

      // Recalculate invoice totals based on UPDATED details
      return {
        ...updatedInvoice,
        ...calculateAllAmounts(updatedDetails),
      };
    });
  };

  const handleUnitChange = (index: number, value: any) => {
    const taxId = parseInt(value);
    console.log(taxes);
    console.log(
      'found:',
      taxes?.find((t) => String(t.id) === String(taxId)),
    );

    setSalesInvoice((prev) => {
      if (!prev) return prev; // nothing to update

      const updatedDetails = prev.details.map((d, i) => {
        return i === index ? { ...d, taxID: taxId, ...calculateTax(taxId, d.netAmount) } : d;
      });

      console.log(updatedDetails);

      const updatedInvoice = { ...prev, details: updatedDetails };

      // Recalculate invoice totals based on UPDATED details
      return {
        ...updatedInvoice,
        ...calculateAllAmounts(updatedDetails),
      };
    });
  };

  const handleProductChange = async (index: number, value: any) => {
    console.log('value is ' + value);
    console.log('index is ' + index);

    debugger;
    const productID = parseInt(value);

    const product = products?.find((r) => r.id == productID);

    const GetUnits = await getRelatedUnits(product?.unitID ?? 0);

    setProducts((prevProducts) => {
      if (!prevProducts) {
        return [];
      }

      return prevProducts.map((product) => {
        if (product.id === productID) {
          return {
            ...product,
            units: GetUnits,
          };
        }
        return product;
      });
    });

    setSalesInvoice((prev) => {
      if (!prev) return prev; // nothing to update
      debugger;

      const updatedDetails = prev.details.map((d, i) => {
        console.log('price of the product: ' + product?.salesRate);
        let amt = d.quantity * (product?.salesRate ?? 0);
        console.log('quantity of the product: ' + d.quantity);

        let disc = (amt * d.discPercent) / 100;
        let netAmt = amt - disc;

        return i === index
          ? {
              ...d,
              productID: productID,
              netAmount: netAmt,
              discount: disc,
              amount: amt,
              salesPrice: product?.salesRate ?? 0,
              taxID: product?.taxID ?? 0,
              units: GetUnits,
              defaultUnitID: product?.unitID ?? 0,
              defaultUnitName: product?.unitName ?? '',
              defaultUnitSymbol: product?.unitSymbol ?? '',

              qtyUnitID: product?.unitID ?? 0,
            }
          : d;
      });

      return { ...prev, details: updatedDetails };
    });
  };

  const calculateAllAmounts = (details: SalesInvoiceDetail[]) => {
    console.log('total calc');
    let total = details.reduce(
      (acc, item) => {
        acc.totalQty += Number(FormatIntoNumber(item.quantity)) || 0;
        acc.grossAmount += Number(FormatIntoNumber(item.amount)) || 0;
        acc.specialDiscount += Number(FormatIntoNumber(item.discount)) || 0;
        acc.totalTCAmount += Number(FormatIntoNumber(item.taxAmount)) || 0;
        acc.totalAmount += Number(FormatIntoNumber(item.totalAmount)) || 0;
        acc.netAmount += Number(FormatIntoNumber(item.netAmount)) || 0;
        return acc;
      },
      {
        totalQty: 0,
        grossAmount: 0,
        specialDiscount: 0,
        totalTCAmount: 0,
        totalAmount: 0,
        netAmount: 0,
      },
    );
    console.log(total);
    return total;
  };

  const handleQuantityChanges = (index: number, value: string | null) => {
    setSalesInvoice((prev) => {
      if (!prev) return prev; // nothing to update

      const updatedDetails = prev.details.map((d, i) => {
        const convRate = products
          ?.filter((r) => r.id == d.productID)[0]
          .units.filter((r) => r.id == d.qtyUnitID)[0].conversionRate;
        console.log('changes in the price:' + d.quantity);
        let qty = value ? parseFloat(value) : 0;
        let amt = qty * d.salesPrice * (convRate ?? 0);
        let disc = (amt * d.discPercent) / 100;
        let netAmt = amt - disc;

        return i === index
          ? {
              ...d,
              quantity: qty,
              amount: amt,
              discount: disc,
              netAmount: netAmt,
              ...calculateTax(d.taxID, netAmt),
            }
          : d;
      });

      const updatedInvoice = { ...prev, details: updatedDetails };

      // Recalculate invoice totals based on UPDATED details
      return {
        ...updatedInvoice,
        ...calculateAllAmounts(updatedDetails),
      };
    });
  };

  const handleUnitChanges = async (index: number, value: number | null) => {
    if (!salesInvoice) return;
    let copyDetail = salesInvoice?.details ?? [];
    const d = copyDetail[index];

    // const actualQty = await convertUnit(
    //           d?.defaultUnitID??0,
    //           value??0,
    //           d?.quantity??0
    //         );
    const unit = d.units.filter((r) => r.id == value);

    if (unit == null) {
      alert('No relation between the units');
      return d; // return original row
    }

    let qty = d?.quantity;
    let amt = qty * (unit[0]?.conversionRate ?? 0) * d?.salesPrice;

    const disc = (amt * (d?.discPercent ?? 0)) / 100;
    const netAmt = amt - disc;
    copyDetail[index] = {
      ...d,
      quantity: qty,
      amount: amt,
      discount: disc,
      netAmount: netAmt,
      qtyUnitID: value ?? 0,
      ...calculateTax(d.taxID, netAmt),
    };

    setSalesInvoice({
      ...salesInvoice,
      details: copyDetail,
      ...calculateAllAmounts(copyDetail),
    });
  };

  const handlePriceChanges = (index: number, value: string | null) => {
    setSalesInvoice((prev) => {
      if (!prev) return prev; // nothing to update

      const updatedDetails = prev.details.map((d, i) => {
        console.log('changes in the price:' + d.salesPrice);
        let price = value ? parseFloat(value) : 0;
        let amt = d.quantity * price;
        //let disc = (amt * d.discPercent) / 100;
        let netAmt = amt - d.discount;

        return i === index
          ? {
              ...d,
              salesPrice: price,
              amount: amt,
              //discount: disc,
              netAmount: netAmt,
              ...calculateTax(d.taxID, netAmt),
            }
          : d;
      });

      const updatedInvoice = { ...prev, details: updatedDetails };

      // Recalculate invoice totals based on UPDATED details
      return {
        ...updatedInvoice,
        ...calculateAllAmounts(updatedDetails),
      };
    });
  };

  const handleDiscountChanges = (index: number, value: string | null) => {
    setSalesInvoice((prev) => {
      if (!prev) return prev; // nothing to update

      const updatedDetails = prev.details.map((d, i) => {
        console.log('changes in the discount:' + d.discount);
        let disc = value ? parseFloat(value) : 0;
        let netAmt = d.amount - disc;

        // calculate net amount to check if discount is more than the amount value
        return i === index && netAmt >= 0
          ? { ...d, discount: disc, netAmount: netAmt, ...calculateTax(d.taxID, netAmt) }
          : d;
      });

      const updatedInvoice = { ...prev, details: updatedDetails };

      // Recalculate invoice totals based on UPDATED details
      return {
        ...updatedInvoice,
        ...calculateAllAmounts(updatedDetails),
      };
    });
  };

  const handleRemarksChanges = (index: number, value: string | null) => {
    setSalesInvoice((prev) => {
      if (!prev) return prev; // nothing to update

      const updatedDetails = prev.details.map((d, i) => {
        return i === index ? { ...d, remarks: value } : d;
      });

      return { ...prev, details: updatedDetails };
    });
  };

  const handleRowDelete = (key: string | null) => {
    setSalesInvoice((prev) => {
      if (!prev) return prev; // nothing to update

      let updatedDetails = prev.details.filter((item) => item.uid != key);
      console.log('detail:' + updatedDetails.length);

      // if all the rows have been deleted then add an empty row
      if (updatedDetails.length == 0) {
        const uid = crypto.randomUUID();
        const newItem: SalesInvoiceDetail = {
          id: 0,
          masterID: 0,
          productCode: '',
          productName: '',
          qtyUnitID: 0,
          defaultUnitID: 0,
          defaultUnitName:"",
          defaultUnitSymbol: "",
          taxID: 0,
          vatAmount: 0,
          productID: 0,
          quantity: 1,
          salesPrice: 0,
          amount: 0,
          discPercent: 0,
          discount: 0,
          netAmount: 0,
          taxAmount: 0,
          taxPercent: 0,
          remarks: '',
          generalName: '',
          uid: uid,
          totalAmount: 0,
          units: [],
          // add any other default props here
        };

        updatedDetails = [...updatedDetails, newItem];
        console.log('updated list:' + updatedDetails);
      }

      return { ...prev, details: updatedDetails, ...calculateAllAmounts(updatedDetails) };
    });
  };

  const handleAddRow = (row: number) => {
    setSalesInvoice((prev) => {
      if (!prev) return prev; // nothing to update

      // if the last row does not have any product then donot add more rows below it
      if (prev.details[prev.details.length - 1].productID == 0) return prev;

      const newItem: SalesInvoiceDetail = {
        id: 0,
        masterID: 0,
        productCode: '',
        productName: '',
        qtyUnitID: 0,
        defaultUnitID: 0,
        defaultUnitSymbol: '',
        defaultUnitName: '',
        taxID: 0,
        vatAmount: 0,
        productID: 0,
        quantity: 1,
        salesPrice: 0,
        amount: 0,
        discPercent: 0,
        discount: 0,
        netAmount: 0,
        taxAmount: 0,
        taxPercent: 0,
        remarks: '',
        generalName: '',
        uid: '',
        totalAmount: 0,
        units: [],
        // add any other default props here
      };
      const updatedDetails = [...prev.details, newItem];
      console.log(updatedDetails);
      return { ...prev, details: updatedDetails };
    });
  };

  const handleVoucherNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setSalesInvoice(
      (prev) =>
        ({
          ...(prev ?? {}),
          voucherNo: res,
        } as SalesInvoiceMaster),
    );
  };

  const handleDateChange = (value: Date | null) => {
    setSalesInvoice(
      (prev) =>
        ({
          ...(prev ?? {}),
          date: value ?? new Date(),
        } as SalesInvoiceMaster),
    );
  };

  const handleCustomerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setSalesInvoice(
      (prev) =>
        ({
          ...(prev ?? {}),
          customerName: res,
        } as SalesInvoiceMaster),
    );
  };

  interface Config {
    label: string;
    render: (salesInvoiceDetails: SalesInvoiceDetail, index: number) => React.ReactNode;
  }

  const configs: Config[] = [
    // {
    //   label: 'GUID',
    //   render: (p, index) => p.uid,
    // },
    {
      label: 'S.N.',
      render: (p, index) => index + 1,
    },

    {
      label: 'Name',

      render: (p, index) => {
        return (
          <div className="flex gap-4 w-50 overflow-hidden">
            {/* lets hide this one for now.. and will come back to it when everything else is done */}
            <button
              onClick={() => {
                setIndex(index);
                setIsModalOpen(true);
              }}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-grey-600"
            >
              ...
            </button>

            <Dropdown
              className="flex gap-4 w-full h-full"
              portal={document.body}
              //dropdownGap={5}
              dropdownPosition="auto"
              options={productList ?? []}
              labelField="engName"
              valueField="id"
              searchable
              searchBy="engName"
              values={
                productList
                  ? ([productList.find((prod) => prod.id === p.productID)].filter(
                      Boolean,
                    ) as Product[])
                  : []
              }
              onChange={(values) => {
                handleProductChange(index, values ? values[0]?.id : null);
              }}
            />
          </div>
        );
      },
    },
    {
      label: 'Quantity',
      render: (p, index) => {
        return (
          <div className="flex gap-4 w-20 overflow-hidden">
            <NumberInput
              decimalPrecision={{ integerDigits: 5, decimalDigits: 2 }}
              id="qty"
              type="text"
              placeholder="Quantity"
              required
              className="flex gap-4 w-full h-full"
              value={p.quantity ?? ''}
              onChange={(value) => handleQuantityChanges(index, value)}
            />
          </div>
        );
      },
    },
    {
      label: 'Unit',
      render: (p, index) => {
        return (
          <div className="flex gap-4 w-20 overflow-hidden">
            <Dropdown
              portal={document.body}
              dropdownGap={5}
              dropdownPosition="auto"
              options={p.units ?? []}
              labelField="name"
              valueField="id"
              values={
                p.units
                  ? ([p.units?.find((prod) => prod.id === p.qtyUnitID)].filter(Boolean) as Unit[])
                  : []
              }
              onChange={(values) => handleUnitChanges(index, values ? values[0]?.id : null)}
            />
          </div>
        );
      },
    },

    {
      label: 'Price',
      render: (p, index) => {
        return (
          <div className="flex gap-4 w-20 overflow-hidden">
            <NumberInput
              decimalPrecision={{ integerDigits: 5, decimalDigits: 2 }}
              id="price"
              placeholder="Price"
              required
              className="flex gap-4 w-full h-full"
              value={p?.salesPrice ?? 0.0}
              onChange={(value) => handlePriceChanges(index, value)}
            />
            <span>{p.defaultUnitSymbol === '' ? '' : '/' + p.defaultUnitSymbol}</span>
          </div>
        );
      },
    },
    { label: 'Gross Amount', render: (p) => p.amount },

    {
      label: 'Discount',
      render: (p, index) => {
        return (
          <div className="flex gap-4 w-20 overflow-hidden">
            <NumberInput
              decimalPrecision={{ integerDigits: 5, decimalDigits: 2 }}
              id="purchaseRate"
              placeholder="Purchase Rate"
              required
              className="flex gap-4 w-full h-full"
              value={p?.discount ?? 0.0}
              onChange={(value) => handleDiscountChanges(index, value)}
            />
          </div>
        );
      },
    },
    {
      label: 'Tax',
      render: (p, index) => {
        return (
          <div className="flex gap-4 w-30 overflow-hidden">
            <Dropdown
              portal={document.body}
              dropdownGap={5}
              dropdownPosition="auto"
              options={taxes ?? []}
              labelField="name"
              valueField="id"
              values={
                taxes ? ([taxes.find((prod) => prod.id === p.taxID)].filter(Boolean) as Tax[]) : []
              }
              onChange={(values) => handleTaxChange(index, values ? values[0]?.id : null)}
            />
          </div>
        );
      },
    },
    { label: 'Net Amount', render: (p) => Number(p.netAmount.toFixed(2)) },
    { label: 'Tax Amount', render: (p) => Number(p.taxAmount.toFixed(2)) },
    { label: 'Amount after Tax', render: (p) => Number(p.totalAmount.toFixed(2)) },

    {
      label: 'Remarks',
      render: (p, index) => {
        return (
          <div className="flex gap-4 w-40 overflow-hidden">
            <TextInput
              id="qty"
              type="text"
              placeholder="Remarks"
              required
              className="form-control form-rounded-xl"
              value={p.remarks ?? ''}
              onChange={(e) => handleRemarksChanges(index, e.target.value)}
            />
          </div>
        );
      },
    },
    {
      label: 'Action',
      render: (p) => {
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleAddRow(p.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              +
            </button>
            <button
              onClick={() => handleRowDelete(p.uid)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              x
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      const [prodRes, unitRes, taxRes] = await Promise.all([getProducts(), getUnits(), getTaxes()]);

      setProducts(prodRes);
      setProductList(prodRes);
      //setUnits(unitRes);
      setTaxes(taxRes);
    };
    fetchAllData();
  }, []);

  const fetchSalesInvoiceData = async (id: string) => {
    const result = await getSalesInvoice(parseInt(id));
    setSalesInvoice(result);

    console.log(salesInvoice);
  };

  useEffect(() => {
    console.log('product fetch from Id: ' + id);
    if (id) {
      fetchSalesInvoiceData(id);
    } else {
      resetForm();
    }
  }, [id]);

  const resetForm = () => {
    setSalesInvoice({
      id: 0,
      seriesID: 0,
      cashLedgerID: 0,
      salesLedgerID: 0,
      depotID: 0,
      orderNo: null,
      voucherNo: null,
      customerName: null,
      date: new Date(),
      projectID: null,
      totalQty: 0,
      grossAmount: 0,
      specialDiscount: 0,
      netAmount: 0,
      tax1: 0,
      tax2: 0,
      tax3: 0,
      vat: 0,
      totalAmount: 0,
      salesDueDate: new Date().toISOString(),
      tableNumber: 0,
      totalTCAmount: 0,
      tenderAmount: 0,
      changeAmount: 0,
      adjustmentAmount: 0,
      createdBy: 0,
      createdDate: '',
      modifiedBy: 0,
      modifiedDate: '',
      companyID: 1,
      details: [
        {
          id: 0,
          masterID: 0,
          productID: 0,
          productCode: '',
          productName: '',
          qtyUnitID: 0,
          defaultUnitID: 0,
          defaultUnitName: '',
          defaultUnitSymbol: '',
          taxID: 0,
          vatAmount: 0,
          quantity: 1,
          salesPrice: 0,
          amount: 0,
          discPercent: 0,
          discount: 0,
          netAmount: 0,
          taxAmount: 0,
          taxPercent: 0,
          remarks: '',
          generalName: '',
          uid: crypto.randomUUID(),
          totalAmount: 0,
          units: [],
        },
      ],
    });
  };

  console.log(salesInvoice);
  const renderRows = salesInvoice?.details
    ? salesInvoice.details.map((detail, index) => {
        console.log(detail);

        detail.uid =
          !detail.id || detail.uid?.length <= 0 ? crypto.randomUUID() : detail.id.toString();
        return (
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            {configs.map((config) => (
              <TableCell
                key={config.label}
                className="whitespace-nowrap font-medium text-gray-900 dark:text-white relative overflow-visible"
              >
                {config.render(detail, index)}
              </TableCell>
            ))}
          </TableRow>
        );
      })
    : null;

  const renderHeaders = (
    <TableHead>
      {configs.map((config) => (
        <TableHeadCell
          className="p-4 text-left text-xs font-medium text-grey-500 uppercase tracking wider"
          key={config.label}
        >
          {config.label}
        </TableHeadCell>
      ))}
    </TableHead>
  );

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <ProductListModal
        isModalOpen={isModalOpen}
        index={index}
        onClose={() => setIsModalOpen(false)}
        onRowClick={(index, productID) => handleProductChange(index, productID)}
      ></ProductListModal>

      <h5 className="card-title">{id ? 'Edit' : 'Add'} a Sales Invoice</h5>
      <div className="mt-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-6 col-span-12">
            <div className="flex  flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label>Voucher No</Label>
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Voucher No"
                  required
                  className="form-control form-rounded-xl"
                  value={salesInvoice?.voucherNo ?? ''}
                  onChange={handleVoucherNoChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label>Date</Label>
                </div>
                <Datepicker
                  weekStart={1} // Monday
                  value={salesInvoice?.date ?? new Date()}
                  onChange={(value) => handleDateChange(value)}
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label>Customer Name</Label>
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="Customer Name"
              required
              className="form-control form-rounded-xl"
              value={salesInvoice?.customerName ?? ''}
              onChange={handleCustomerNameChange}
            />
          </div>
          <div className="lg:col-span-6 col-span-12"></div>
          <div className="col-span-12 flex gap-3">
            <div className="overflow-x-auto overflow-visible">
              <Table striped className="min-w-full divide-y divide-gray-200">
                {renderHeaders}
                <TableBody className="overflow-visible">{renderRows}</TableBody>
              </Table>
            </div>
          </div>
          <div className="col-span-12 flex gap-3">
            <div>
              <label>Total Quantity: </label>
              <span>{Number(salesInvoice?.totalQty.toFixed(2) ?? 0)}</span>
            </div>
          </div>

          <div className="col-span-12 flex gap-3">
            <div>
              <label>Gross Amount: </label>
              <span>{Number(salesInvoice?.grossAmount.toFixed(2) ?? 0)}</span>
            </div>
          </div>

          <div className="col-span-12 flex gap-3">
            <div>
              <label>Total Discount: </label>
              <span>{Number(salesInvoice?.specialDiscount.toFixed(2) ?? 0)}</span>
            </div>
          </div>
          <div className="col-span-12 flex gap-3">
            <div>
              <label>Net Amount: </label>
              <span>{Number(salesInvoice?.netAmount.toFixed(2) ?? 0)}</span>
            </div>
          </div>
          <div className="col-span-12 flex gap-3">
            <div>
              <label>Tax Amount: </label>
              <span>{Number(salesInvoice?.totalTCAmount.toFixed(2) ?? 0)}</span>
            </div>
          </div>
          <div className="col-span-12 flex gap-3">
            <div>
              <label>Total Amount: </label>
              <span>{Number(salesInvoice?.totalAmount.toFixed(2) ?? 0)}</span>
            </div>
          </div>
          <div className="col-span-12 flex gap-3">
            <Button color={'primary'} onClick={handleSubmit}>
              Submit
            </Button>
            <Button color={'error'}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSalesInvoice;
