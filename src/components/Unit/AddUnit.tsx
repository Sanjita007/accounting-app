import { Label, TextInput, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { getTax, getUnit, postUnit, putUnit } from 'src/api';

import { Unit } from 'src/Models/Model';
import { useCustomAlertBox } from '../shared/CustomAlertBox';

const AddUnit = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const { apiWithToast } = useCustomAlertBox();

  const [unit, setUnit] = useState<Unit | null>(null);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (unit) {
      if (unit.id) {
        apiWithToast(putUnit(unit), {
          loading: 'Updating unit..',
          success: 'Unit updated successfully!',
          error: 'Failed to update a unit.',
        });
      } else {
        apiWithToast(postUnit(unit), {
          loading: 'Creating unit..',
          success: 'Unit created successfully!',
          error: 'Failed to create a unit.',
        });
      }

      navigate('/unit');
    }
  };


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setUnit(
      (prev) =>
        ({
          ...(prev ?? {}),
          name: res,
        } as Unit),
    )
  };
 
  const handleRemarksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setUnit(
      (prev) =>
        ({
          ...(prev ?? {}),
          remarks: res,
        } as Unit),
    );
  };

  const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setUnit(
      (prev) =>
        ({
          ...(prev ?? {}),
          symbol: res,
        } as Unit),
    );
  };

  useEffect(() => {
    console.log('unit fetch from Id: ' + id);
    if (id) {
      const fetchUnitData = async () => {
        const result = await getUnit(parseInt(id));
        setUnit(result);
      };
      fetchUnitData();
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
                  value={unit?.name ?? ''}
                  onChange={handleNameChange}
                />
              </div>
              <div></div>
              <div>
                <div className="mb-2 block">
                  <Label>Symbol</Label>
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Symbol"
                  required
                  className="form-control form-rounded-xl"
                  value={unit?.symbol ?? ''}
                  onChange={handleSymbolChange}
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
                  value={unit?.remarks ?? ''}
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

export default AddUnit;
