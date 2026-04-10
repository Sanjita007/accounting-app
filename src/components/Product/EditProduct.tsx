import { Label, TextInput, Select, Checkbox, Button } from 'flowbite-react';
import { useContext, useEffect, useRef, useState } from 'react';
//import { useNavigate } from 'react-router';
import img_empty from '/src/assets/images/no-image-icon-6.png';

import {
  deleteProduct,
  getDepots,
  getProduct,
  getProductGroups,
  getTaxes,
  getUnits,
  postProduct,
  putProduct,
} from 'src/api';

import { Product, ProductGroup, Tax, Unit } from 'src/Models/Model';
import { NumberInput } from '../shared/CustomNumberInput';
import CustomButtons from '../shared/CustomButtons';
import { CustomBoxContext } from '../shared/useConfirmation';
import { useAlertBox } from '../shared/AlertBox';

type Props = {
  id: number;
  setId: (mode: number) => void;
};

const ProductAddEdit = (props: Props) => {
  let id = props.id;

  const fileInputRef = useRef<HTMLInputElement>(null);

 // const navigate = useNavigate();

  const { useApiWithToast } = useAlertBox();

  const [productGroups, setProductGroups] = useState<ProductGroup[] | null>(null);
  const [units, setUnits] = useState<Unit[] | null>(null);
  const [taxes, setTaxes] = useState<Tax[] | null>(null);
  const [mode, setMode] = useState(0);

  const [product, setProduct] = useState<Product | null>(null);

  // Got the fuction from the context
  const { showConfirmation } = useContext(CustomBoxContext);

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const res = parseInt(e.target.value);
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          groupID: res,
        }) as Product,
    );
  };

  const handleNew = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProduct(null);
    const res = await showConfirmation('Confirmation', 'Are you sure you want to clear all data?');
    if(res){
    props.setId(0);
    }
  };

  const handleFileButtonClick = async () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setProduct(null);
    props.setId(0);
  };

  const handleDelete = async () => {
    if (product?.id) {
      await useApiWithToast(deleteProduct(product.id), {
        loading: 'Deleting product..',
        success: 'Product deleted successfully!',
        error: 'Failed to delte the product.',
      });
      setProduct(null);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (product) {
      let res = false;
      debugger;
      if (product.id) {
        res = await useApiWithToast(putProduct(product), {
          loading: 'Updating product..',
          success: 'Product updated successfully!',
          error: 'Failed to update a product.',
        });
      } else {
        res = await useApiWithToast(postProduct(product), {
          loading: 'Creating product',
          success: 'Product created successfully!',
          error: 'Failed to create a product.',
        });
      }
      alert(res);
      if (res == true) {
        // trigger the new button click event..
        // it is not possible to do it with useRef because we cannot access buttns as
        // they are in the component
        // maybe look for ways to solve this issue next
        setProduct(null);
        props.setId(0);
      }
      //navigate('/product');
    }
  };

  const handleTaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const res = parseInt(e.target.value);
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          taxID: res,
        }) as Product,
    );
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const res = parseInt(e.target.value);
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          unitID: res,
        }) as Product,
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
        }) as Product,
    );

    console.log(product?.salesRate);
  };

  const handleInventoryApplicableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          isInventoryApplicable: e.target.checked,
        }) as Product,
    );
  };

  const handleDecimalApplicableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          isDecimalApplicable: e.target.checked,
        }) as Product,
    );
  };

  const handleIsActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          isActive: e.target.checked,
        }) as Product,
    );
  };

  const handlePurchaseRateChange = (value: any) => {
    console.log('purchse blur');
    let res = parseFloat(value); //FormatIntoNumber(value);
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          purchaseRate: res,
        }) as Product,
    );
  };

  const handleEngNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          engName: res,
        }) as Product,
    );
  };

  const handleNepNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          nepName: res,
        }) as Product,
    );
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          code: res,
        }) as Product,
    );
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target;
    debugger;
    const fileReader = new FileReader();
    if (res?.files != null) {
      // check for the file

      const file = res?.files[0];
      if (file.size > 1 * 1024 * 300) {
        alert('File size cannot be more than 300 KB!');
        return;
      }
      fileReader.readAsDataURL(file);

      //what to do when the file is loaded, without this the image was not shown.. because it take
      // some time for the file to be read and this tell what to do when the file is completely read
      // was zu tun wenn die Datei hochladen(?) ist. Ohne diese Method, das Bild ist nicht angeschaut..
      // weil es braucht ein bisschen Zeit, das Photo lesen(?) und diese Method sagt was zu tun when fertig
      fileReader.onload = () => {
        setProduct(
          (prev) =>
            ({
              ...(prev ?? {}),
              image: fileReader.result as string,
            }) as Product,
        );
      };
    }

    setProduct(
      (prev) =>
        ({
          ...(prev ?? {}),
          image: fileReader.result,
        }) as Product,
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
      const [groupRes, unitRes, taxRes] = await Promise.all([
        getProductGroups(),
        getUnits(),
        getTaxes(),
        getDepots(),
      ]);

      setProductGroups(groupRes.data);
      setUnits(unitRes.data);
      setTaxes(taxRes.data);

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
        const result = await getProduct(id);
        setProduct(result.data);

        console.log(product?.groupID);
        console.log(product);
      };
      fetchProductData();
      setMode(1);
    } else {
      setProduct(null);
      setMode(0);
    }
  }, [id]);

  console.log(product);

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <h5 className="card-title">{mode == 1 ? 'Edit' : 'Add'} a new Product</h5>
      <div className="mt-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-12 col-span-12">
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
                <div className="flex items-center gap-2">
                  <div className="mb-2 block">
                    <Label htmlFor="isInventoryCheckbox">Is Inventory Applicable</Label>
                  </div>
                  <Checkbox
                    id="isInventoryCheckbox"
                    className="form-control form-rounded-xl"
                    checked={product?.isInventoryApplicable ?? false}
                    onChange={handleInventoryApplicableChange}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="mb-2 block">
                    <Label htmlFor="isDecimalCheckbox">Is Decimal Applicable</Label>
                  </div>
                  <Checkbox
                    id="isDecimalCheckbox"
                    className="form-control form-rounded-xl"
                    checked={product?.isDecimalApplicable ?? false}
                    onChange={handleDecimalApplicableChange}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="mb-2 block">
                    <Label htmlFor="isActiveCheckbox">Is Active</Label>
                  </div>
                  <Checkbox
                    id="isActiveCheckbox"
                    className="form-control form-rounded-xl"
                    checked={product?.isActive ?? false}
                    onChange={handleIsActiveChange}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label>Purchase Rate</Label>
                </div>
                <NumberInput
                  decimalPrecision={{ integerDigits: 5, decimalDigits: 2 }} //defaultValue: product?.purchaseRate ?? 0.00}}
                  defaultValue={product?.purchaseRate ?? 0.0}
                  id="purchaseRate"
                  placeholder="Purchase Rate"
                  required
                  className="form-control form-rounded-xl"
                  value={product?.purchaseRate ?? 0.0}
                  //onChange={handlePurchaseRateChange}
                  onChange={(value) => handlePurchaseRateChange(value)}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label>Sales Rate</Label>
              </div>
              <NumberInput
                decimalPrecision={{ integerDigits: 5, decimalDigits: 2 }} //, defaultValue: product?.salesRate ?? 0.00}}
                id="salesRate"
                placeholder="Sales Rate"
                required
                className="form-control form-rounded-xl"
                value={product?.salesRate ?? 0.0}
                onChange={(value) => handleSalesRateChange(value)}
              />
            </div>
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
                    {group.engName}
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
            <div>
              <div className="mb-2 block">
                <Label>Image</Label>
              </div>
              <div className="mb-2 block">
                <img src={product?.image ?? img_empty} alt="Dynamic binary content" />
              </div>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                id="contained-button-file"
                onChange={handleFileChange}
              />
              <label htmlFor="contained-button-file">
                <Button color="primary" aria-label="upload Image" onClick={handleFileButtonClick}>
                  Upload
                </Button>
              </label>
            </div>
          </div>
          <div className="col-span-12 justify-end flex gap-3">
            {/* <Button color={'green'} onClick={handleNew}>
              New
            </Button>
            <Button color={'primary'} onClick={handleSubmit}>
              Submit
            </Button>
            <Button color={'red'} onClick={handleDelete}>
              Delete
            </Button>
            <Button color={'error'}>Cancel</Button> */}
            <CustomButtons
              mode={mode}
              setMode={setMode}
              handleNew={handleNew}
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
              handleCancel={handleCancel}
            ></CustomButtons>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAddEdit;
