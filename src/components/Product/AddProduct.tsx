import { Label, TextInput, Select, Button, Checkbox } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  getDepots,
  getProduct,
  getProductGroups,
  getTaxes,
  getUnits,
  postProduct,
  putProduct,
} from 'src/api';

import { Depot, Product, ProductGroup, Tax, Unit } from 'src/Models/Model';
import { NumberInput } from '../shared/CustomNumberInput';
import { useCustomAlertBox } from '../shared/CustomAlertBox';
import { FormatIntoNumber } from 'src/utils/utils';

type Props = {
  //product: Product;
};

const AddProduct = (props: Props) => {
  let { id } = useParams();
  const navigate = useNavigate();

  const { apiWithToast } = useCustomAlertBox();

  const [productGroups, setProductGroups] = useState<ProductGroup[] | null>(null);
  const [depots, setDepots] = useState<Depot[] | null>(null);
  const [units, setUnits] = useState<Unit[] | null>(null);
  const [taxes, setTaxes] = useState<Tax[] | null>(null);

  const [product, setProduct] = useState<Product | null>(null);

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const res = parseInt(e.target.value);
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          groupID: res,
        } as Product),
    );
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (product) {
      if (product.id) {
         apiWithToast(putProduct(product),
          {loading: "Updating product..",
          success: "Product updated successfully!",
          error: "Failed to update a product."}
      )
         
      }
      else{
         apiWithToast(postProduct(product),
          {loading: "Creating product",
          success: "Product created successfully!",
          error: "Failed to create a product."}
      )
      }

      navigate("/product");

    }
  };

  const handleDepotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const res = parseInt(e.target.value);
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          depotID: res,
        } as Product),
    );
  };

  const handleTaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const res = parseInt(e.target.value);
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          taxID: res,
        } as Product),
    );
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const res = parseInt(e.target.value);
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          unitID: res,
        } as Product),
    );
  };

  const handleSalesRateChange = (value: any) => {
    console.log(value);
    let res = parseFloat(value); //FormatIntoNumber(e.target.value);
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          salesRate: res,
        } as Product),
    );

    console.log(product?.salesRate);
  };

  const handleInventoryApplicableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          isInventoryApplicable: e.target.checked,
        } as Product),
    );
  };

  const handleDecimalApplicableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          isDecimalApplicable: e.target.checked,
        } as Product),
    );
  };

  const handleVATApplicableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          isVatApplicable: e.target.checked,
        } as Product),
    );
  };

  const handleIsActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          isActive: e.target.checked,
        } as Product),
    );
  };

  const handlePurchaseRateChange = (value: any) => {
    console.log("purchse blur")
    let res = parseFloat(value); //FormatIntoNumber(value);
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          purchaseRate: res,
        } as Product),
    );
  };

  const handleEngNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          engName: res,
        } as Product),
    );
  };

  const handleNepNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          nepName: res,
        } as Product),
    );
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          code: res,
        } as Product),
    );
  };

  // const fetchTaxData = async()=>{
  //   setTaxes(await getTaxes());
  // }

  // useEffect(()=> {
  // const fetchUnitData = async()=>{
  //     setUnits(await getUnits());
  //   }
  // }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      const [groupRes, unitRes, taxRes, depotRes] = await Promise.all([
        getProductGroups(),
        getUnits(),
        getTaxes(),
        getDepots(),
      ]);

      setProductGroups(groupRes);
      setUnits(unitRes);
      setTaxes(taxRes);
      setDepots(depotRes);

      // if (id) {
      //   const result = await getProduct(parseInt(id));
      //   setProduct(result);
      // };
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    console.log('product fetch from Id: ' + id);
    if (id) {
      const fetchProductData = async () => {
        const result = await getProduct(parseInt(id));
        setProduct(result);

        console.log(product?.groupID);
        console.log(product);
      };
      fetchProductData();
    }
  }, [id]);

  console.log(product);

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <h5 className="card-title">{id ? 'Edit' : 'Add'} a new Product</h5>
      <div className="mt-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-6 col-span-12">
            <div className="flex  flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label>English Name</Label>
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="English Name"
                  required
                  className="form-control form-rounded-xl"
                  value={product?.engName ?? ''}
                  onChange={handleEngNameChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label>Nepali Name</Label>
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Nepali Name"
                  required
                  className="form-control form-rounded-xl"
                  value={product?.nepName ?? ''}
                  onChange={handleNepNameChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label>Product Code</Label>
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Product Code"
                  required
                  className="form-control form-rounded-xl"
                  value={product?.code ?? ''}
                  onChange={handleCodeChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label>Is Inventory Applicable</Label>
                </div>
                <Checkbox
                  className="form-control form-rounded-xl"
                  checked={product?.isInventoryApplicable ?? false}
                  onChange={handleInventoryApplicableChange}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label>Is Decimal Applicable</Label>
                </div>
                <Checkbox
                  className="form-control form-rounded-xl"
                  checked={product?.isDecimalApplicable ?? false}
                  onChange={handleDecimalApplicableChange}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label>Is VAT Applicable</Label>
                </div>
                <Checkbox
                  className="form-control form-rounded-xl"
                  checked={product?.isVatApplicable ?? false}
                  onChange={handleVATApplicableChange}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label>Is Active</Label>
                </div>
                <Checkbox
                  className="form-control form-rounded-xl"
                  checked={product?.isActive ?? false}
                  onChange={handleIsActiveChange}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label>Purchase Rate</Label>
                </div>
                <NumberInput
                  decimalPrecision={{ integerDigits: 5, decimalDigits: 2, }}//defaultValue: product?.purchaseRate ?? 0.00}}
                  defaultValue={product?.purchaseRate ?? 0.00}
                  id="purchaseRate"
                  placeholder="Purchase Rate"
                  required
                  className="form-control form-rounded-xl"
                  value={product?.purchaseRate ?? 0.00}
                  //onChange={handlePurchaseRateChange}
                  onChange={(value) => handlePurchaseRateChange(value)}
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div>
              <div className="mb-2 block">
                <Label>Sales Rate</Label>
              </div>
              <NumberInput
                decimalPrecision={{ integerDigits: 5, decimalDigits: 2 }}//, defaultValue: product?.salesRate ?? 0.00}}
                id="salesRate"
                placeholder="Sales Rate"
                required
                className="form-control form-rounded-xl"
                value={product?.salesRate ?? 0.00}
                onChange={(value)=> handleSalesRateChange(value)}
              
              />
            </div>

            <div>
              <div>
                <div className="mb-2 block">
                  <Label>Product Group</Label>
                </div>
                <Select
                  id="groupId"
                  required
                  className="select-md"
                  value={product?.groupID ?? ''}
                  onChange={handleGroupChange}
                >
                  <option>Select Product Group</option>
                  {productGroups?.map((group) => (
                    <option
                      // className="p-4 text-left text-xs font-medium text-grey-500 uppercase tracking wider"
                      key={group.id}
                      value={group.id}
                    >
                      {group.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label>Depot</Label>
                </div>
                <Select
                  id="depotId"
                  required
                  className="select-md"
                  value={product?.depotID ?? ''}
                  onChange={handleDepotChange}
                >
                  <option>Select Depot</option>
                  {depots?.map((depot) => (
                    <option
                      // className="p-4 text-left text-xs font-medium text-grey-500 uppercase tracking wider"
                      key={depot.id}
                      value={depot.id}
                    >
                      {depot.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label>Tax</Label>
                </div>

                <Select
                  id="taxId"
                  required
                  className="select-md"
                  value={product?.taxID ?? ''}
                  onChange={handleTaxChange}
                  >
                  <option>Select Tax</option>
                  {taxes?.map((tax) => (
                    <option
                      // className="p-4 text-left text-xs font-medium text-grey-500 uppercase tracking wider"
                      key={tax.id}
                      value={tax.id}
                    >
                      {tax.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <div className="mb-2 block">
                  <Label>Unit</Label>
                </div>
                <Select
                  id="unitId"
                  required
                  className="select-md"
                  value={product?.unitID ?? ''}
                  onChange={handleUnitChange}
                >
                  <option>Select Unit</option>
                  {units?.map((unit) => (
                    <option
                      // className="p-4 text-left text-xs font-medium text-grey-500 uppercase tracking wider"
                      key={unit.id}
                      value={unit.id}
                    >
                      {unit.name}
                    </option>
                  ))}
                </Select>
              </div>
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

export default AddProduct;
