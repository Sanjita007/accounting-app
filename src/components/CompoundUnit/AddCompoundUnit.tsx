import { Label, TextInput, Button, Select } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import {
  getCompoundUnit,
  getUnits,
  postCompoundUnit,
  putCompoundUnit,
} from 'src/api';

import { CompoundUnit, Unit } from 'src/Models/Model';
import { useCustomAlertBox } from '../shared/CustomAlertBox';
import { NumberInput } from '../shared/CustomNumberInput';

const AddCompoundUnit = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const { apiWithToast } = useCustomAlertBox();

  const [compoundUnit, setCompoundUnit] = useState<CompoundUnit | null>(null);
  const [units, setUnits] = useState<Unit[] | null>(null);
  const [parentUnits, setParentUnits] = useState<Unit[] | null>(null);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (compoundUnit) {
      if (compoundUnit.id) {
        apiWithToast(putCompoundUnit(compoundUnit), {
          loading: 'Updating unit..',
          success: 'Unit updated successfully!',
          error: 'Failed to update a unit.',
        });
      } else {
        apiWithToast(postCompoundUnit(compoundUnit), {
          loading: 'Creating unit..',
          success: 'Unit created successfully!',
          error: 'Failed to create a unit.',
        });
      }

      navigate('/unit/compound');
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const [groupRes] = await Promise.all([getUnits()]);

      setUnits(groupRes.data);
      setParentUnits(groupRes.data);
      // if (id) {
      // 	const result = await getProduct(parseInt(id));
      // 	setProduct(result);
      // };
    };
    fetchAllData();
  }, [id]);

  const handleParentUnitChange = (value: any) => {
    let res = parseFloat(value);
    setCompoundUnit(
      (prev) =>
        ({
          ...(prev ?? {}),
          parentGroupId: res,
        } as CompoundUnit),
    );
  };

  const handleRelationValueChange = (value: any) => {
    console.log(value);
    let res = parseFloat(value); //FormatIntoNumber(e.target.value);
    setCompoundUnit(
      (prev) =>
        ({
          ...(prev ?? {}),
          salesRate: res,
        } as CompoundUnit),
    );

    console.log(compoundUnit?.relationValue);
  };

  const handleUnitChange = (value: any) => {
    let res = parseFloat(value);
    setCompoundUnit(
      (prev) =>
        ({
          ...(prev ?? {}),
          unitId: res,
        } as CompoundUnit),
    );
  };

  const handleRemarksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setCompoundUnit(
      (prev) =>
        ({
          ...(prev ?? {}),
          remarks: res,
        } as CompoundUnit),
    );
  };

  useEffect(() => {
    console.log('unit fetch from Id: ' + id);
    if (id) {
      const fetchUnitData = async () => {
        const result = await getCompoundUnit(parseInt(id));
        setCompoundUnit(result.data);
      };
      fetchUnitData();
    }
  }, [id]);

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <h5 className="card-title">{id ? 'Edit' : 'Add'} a new Compound Unit</h5>
      <div className="mt-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-6 col-span-12">
            <div className="flex  flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label>Unit</Label>
                  </div>
                  <Select
                    id="unitId"
                    required
                    className="select-md"
                    value={compoundUnit?.unitID ?? ''}
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

              <div className="flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label>Parent Unit</Label>
                  </div>
                  <Select
                    id="parentUnitId"
                    required
                    className="select-md"
                    value={compoundUnit?.parentUnitID ?? ''}
                    onChange={handleParentUnitChange}
                  >
                    <option>Select Parent Unit</option>
                    {parentUnits?.map((unit) => (
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
              <div></div>
              <div>
                <div className="mb-2 block">
                  <Label>Relation Value</Label>
                </div>
                <NumberInput
                  decimalPrecision={{ integerDigits: 5, decimalDigits: 2 }}
                  id="relationValue"
                  placeholder="Relation Value"
                  required
                  className="form-control form-rounded-xl"
                  value={compoundUnit?.relationValue ?? 0.0}
                  onChange={(value) => handleRelationValueChange(value)}
                />
              </div>
              <div><span className="p-4 text-left text-s font-medium text-blue-500 tracking wider"><i>Note*: 1 Unit = Relational Value * 1 Parent Unit</i></span></div>
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
                  value={compoundUnit?.remarks ?? ''}
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

export default AddCompoundUnit;
