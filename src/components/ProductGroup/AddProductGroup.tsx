import { Label, TextInput, Select, Button, Checkbox } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getTax, postTax, putTax } from 'src/api';

import { ProductGroup, Tax } from 'src/Models/Model';
import { NumberInput } from '../shared/CustomNumberInput';
import { useCustomAlertBox } from '../shared/CustomAlertBox';

type Props = {
  //product: Product;
};

const AddProductGroup = (props: Props) => {
  let { id } = useParams();
  const navigate = useNavigate();

  const { apiWithToast } = useCustomAlertBox();

  const [group, setgroup] = useState<ProductGroup | null>(null);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (group) {
      if (group.id) {
        apiWithToast(putProductGroup(group), {
          loading: 'Updating tax..',
          success: 'Tax updated successfully!',
          error: 'Failed to update a tax.',
        });
      } else {
        apiWithToast(postTax(tax), {
          loading: 'Creating tax..',
          success: 'Tax created successfully!',
          error: 'Failed to create a tax.',
        });
      }

      navigate('/tax');
    }
  };

  const handleRateChange = (value: any) => {
    let res = parseFloat(value);
    setTax(
      (prev) =>
        ({
          ...(prev ?? {}),
          rate: res,
        } as Tax),
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setTax(
      (prev) =>
        ({
          ...(prev ?? {}),
          name: res,
        } as Tax),
    );
  };

  
  const handleRemarksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setTax(
      (prev) =>
        ({
          ...(prev ?? {}),
          remarks: res,
        } as Tax),
    );
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setTax(
      (prev) =>
        ({
          ...(prev ?? {}),
          code: res,
        } as Tax),
    );
  };

  useEffect(() => {
    console.log('tax fetch from Id: ' + id);
    if (id) {
      const fetchTaxData = async () => {
        const result = await getTax(parseInt(id));
        setTax(result);
      };
      fetchTaxData();
    }
  }, [id]);

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <h5 className="card-title">{id ? 'Edit' : 'Add'} a new Product</h5>
      <div className="mt-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-6 col-span-12">
            <div className="flex  flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label>Name</Label>
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Name"
                  required
                  className="form-control form-rounded-xl"
                  value={tax?.name ?? ''}
                  onChange={handleNameChange}
                />
              </div>
              <div></div>
              <div>
                <div className="mb-2 block">
                  <Label>Tax Code</Label>
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Product Code"
                  required
                  className="form-control form-rounded-xl"
                  value={tax?.code ?? ''}
                  onChange={handleCodeChange}
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label>Rate</Label>
                </div>
                <NumberInput
                  decimalPrecision={{ integerDigits: 5, decimalDigits: 2 }} //defaultValue: product?.purchaseRate ?? 0.00}}
                  defaultValue={tax?.rate ?? 0.0}
                  id="rate"
                  placeholder="Rate"
                  required
                  className="form-control form-rounded-xl"
                  value={tax?.rate ?? 0.0}
                  //onChange={handlePurchaseRateChange}
                  onChange={(value) => handleRateChange(value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label>Remarks</Label>
                </div>
                <TextInput
                  id="remarks"
                  type="text"
                  placeholder="Remarks"
                  required
                  className="form-control form-rounded-xl"
                  value={tax?.remarks ?? ''}
                  onChange={handleRemarksChange}
                />
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
