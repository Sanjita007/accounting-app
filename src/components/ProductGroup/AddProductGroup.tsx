import { Label, TextInput, Select, Tabs, TabItem, TabsRef } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';

import {
  deleteProductGroup,
  getProductGroup,
  getProductGroups,
  getProductTree,
  getTax,
  postProductGroup,
  putProductGroup,
} from 'src/api';

import { ProductGroup, Tree } from 'src/Models/Model';
import { useCustomAlertBox } from '../shared/CustomAlertBox';
import TreeView from '../shared/TreeView';
import ProductAddEdit from '../Product/EditProduct';
import CustomButtons from '../shared/CustomButtons';
import { useAlertBox } from '../shared/AlertBox';

const AddProductGroup = () => {
  // useApiWithToast is the actual method that we use from the interface useAlertBox()..
  const { useApiWithToast } = useAlertBox();
  const { apiWithToast } = useCustomAlertBox();
  const [groupId, setGroupId] = useState(0);
  const [productId, setProductId] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<TabsRef>(null);
  const [mode, setMode] = useState(0);

  //const { showConfirmation, ConfirmationModal } = useConfirmation();

  const [group, setGroup] = useState<ProductGroup | null>(null);
  const [productGroups, setProductGroups] = useState<ProductGroup[] | null>(null);
  const [productTree, setProductTree] = useState<Tree[] | null>(null);

  const handleSubmit = async (_e: React.MouseEvent<HTMLButtonElement>) => {
    //e.preventDefault();

    if (group) {
      try {
        let res = false;
        if (group.id) {
          res = await useApiWithToast(putProductGroup(group), {
            loading: 'Updating product group..',
            success: 'Product Group updated successfully!',
            error: 'Failed to update a product group.',
          });
        } else {
          res = await useApiWithToast(postProductGroup(group), {
            loading: 'Creating product group..',
            success: 'Product Group created successfully!',
            error: 'Failed to create a product group.',
          });
        }

        if (res == true) {
          // Navigate only if the API call succeeded
          //navigate('/product-group');
          setGroupId(0);
          setGroup(null);
        }
      } catch (error) {
        // Error handled by apiWithToast, no navigation on failure
        console.error('Submission failed:', error);
      }
    }
  };

  const handleDelete = async (_e: React.MouseEvent<HTMLButtonElement>) => {
    if (group?.id) {
      console.log('deleting..');
      // lets just comment this one for now.. we will fix it later
      const res = true; //await showConfirmation("Delete item", "Are you sure you want to delete the item?");
      if (res) {
        console.log('test...');
        apiWithToast(deleteProductGroup(group.id), {
          loading: 'Deleting group..',
          success: 'Group deleted successfully!',
          error: 'Failed to delte the group.',
        });
      }
    }

    setGroup(null);
  };

  const handleNew = async (_e: React.MouseEvent<HTMLButtonElement>) => {
    debugger;
    const res = await useApiWithToast(getTax(1), null);
    alert(res);
    setGroup(null);
  };

  const handleParentGroupChange = (value: any) => {
    let res = parseFloat(value);
    setGroup(
      (prev) =>
        ({
          ...(prev ?? {}),
          parentGroupId: res,
        }) as ProductGroup,
    );
  };

  const handleEngNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setGroup(
      (prev) =>
        ({
          ...(prev ?? {}),
          engName: res,
        }) as ProductGroup,
    );
  };

  const handleRemarksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setGroup(
      (prev) =>
        ({
          ...(prev ?? {}),
          remarks: res,
        }) as ProductGroup,
    );
  };

  const onNodeClick = (id: number, isProduct: boolean) => {
    debugger;
    if (isProduct) {
      tabsRef.current?.setActiveTab(1);
      setProductId(id);
      setGroupId(0);
      setGroup(null);
    } else {
      tabsRef.current?.setActiveTab(0);
      setGroupId(id);
      setProductId(0);
    }
  };

  const handleNepNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = e.target.value;
    setGroup(
      (prev) =>
        ({
          ...(prev ?? {}),
          nepName: res,
        }) as ProductGroup,
    );
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const [groupRes, treeRes] = await Promise.all([getProductGroups(), getProductTree()]);

      setProductGroups(groupRes.data);
      setProductTree(treeRes.data);
      // if (id) {
      // 	const result = await getProduct(parseInt(id));
      // 	setProduct(result);
      // };
    };
    fetchAllData();
  }, [groupId]);

  useEffect(() => {
    console.log('group fetch from Id: ' + groupId);
    if (groupId > 0) {
      const fetchGroupData = async () => {
        const result = await getProductGroup(groupId);
        setGroup(result.data);
      };
      fetchGroupData();
      setMode(1);
    } else {
      setMode(0);
    }
  }, [groupId]);

  const handleCancel = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setGroup(null);
  };

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-6 relative w-full break-words">
      <div className="mt-6">
        {/* Main 12-Column Grid Container */}
        <div className="grid grid-cols-12 gap-6">
          {/* COLUMN 1: TABS (Form/Group Section) */}
          <div className="lg:col-span-6 col-span-12">
            <Tabs
              aria-label="Default tabs"
              variant="default"
              className="w-full"
              ref={tabsRef}
              onActiveTabChange={(tab) => {
                setActiveTab(tab);
              }}
            >
              <TabItem title="Group" active={activeTab == 0}>
                <h5 className="card-title">{mode == 1 ? 'Edit' : 'Add'} a new Product Group</h5>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label>English Name</Label>
                    </div>
                    <TextInput
                      id="engName"
                      type="text"
                      placeholder="English Name"
                      required
                      className="form-control form-rounded-xl"
                      value={group?.engName ?? ''}
                      onChange={handleEngNameChange}
                    />
                  </div>
                  <div></div>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label>Nepali Name</Label>
                    </div>
                    <TextInput
                      id="nepName"
                      type="text"
                      placeholder="Nepali Name"
                      required
                      className="form-control form-rounded-xl"
                      value={group?.nepName ?? ''}
                      onChange={handleNepNameChange}
                    />
                  </div>
                  <div></div>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label>Product Group</Label>
                    </div>
                    <Select
                      id="parentGroupId"
                      required
                      className="select-md"
                      value={group?.parentGroupID ?? ''}
                      onChange={handleParentGroupChange}
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
                </div>
                <div className="flex flex-col gap-4">
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
                      value={group?.remarks ?? ''}
                      onChange={handleRemarksChange}
                    />
                  </div>
                  <div></div>
                </div>
                {/* <div className="col-span-12 flex gap-3 justify-end mt-4">
                  <Button color={'green'} onClick={handleNew}>
                    New
                  </Button>
                  <Button color={'primary'} onClick={handleSubmit}>
                    Save
                  </Button>
                  <Button color={'red'} onClick={handleDelete}>
                    Delete
                  </Button>
                  <Button color={'error'}>Cancel</Button>
                </div> */}
                <CustomButtons
                  mode={mode}
                  setMode={setMode}
                  handleNew={handleNew}
                  handleSubmit={handleSubmit}
                  handleDelete={handleDelete}
                  handleCancel={handleCancel}
                />
              </TabItem>
              <TabItem title="Product" active={activeTab == 1}>
                <ProductAddEdit id={productId} setId={setProductId}></ProductAddEdit>
              </TabItem>
            </Tabs>
          </div>

          {/* COLUMN 2: TREE VIEW */}
          <div className="lg:col-span-6 col-span-12">
            <div className="col-span-12 flex gap-3">
              <div className="overflow-y-auto overflow-x-auto max-h-96 w-full">
                <ol className="min-w-full divide-x divide-gray-200">
                  <TreeView
                    treeData={productTree ? productTree[0] : null}
                    onNodeClick={onNodeClick}
                  ></TreeView>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductGroup;
