import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { useEffect, useState, useRef  } from 'react';
import { getProducts } from 'src/api';
import { Product } from 'src/Models/Model';

interface Config {
  label: string;
  render: (product: Product) => React.ReactNode;
}

type Props = {
  isModalOpen: boolean;
  onClose: () => void;
  index: number,
  onRowClick: (index: number, id: number) => void;
   //onSelect: (id: number) => void;
};

export const ProductListModal = (props: Props) => {
  //const [openModal, setOpenModal] = useState(props.isModalOpen);
  const [products, setProducts] = useState<Product[]>([])
  const refTable = useRef<HTMLTableElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const configs: Config[] = [
    { label: 'id', render: (p) => p.id },
    { label: 'Product Code', render: (p) => p.code },
    { label: 'Product Name', render: (p) => p.engName },
    { label: 'Sales Rate', render: (p) => p.salesRate },
    { label: 'Remarks', render: (p) => p.remarks },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      setProducts(result);
    };
    fetchData();
  }, []);

   // Focus first row when modal opens
  useEffect(() => {
    if (refTable.current) {
      const firstRow = refTable.current.querySelector("tr");
      firstRow?.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!products?.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, products?.length??0 - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 0, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedProduct = products??[selectedIndex][0];
      if(selectedProduct) {
      props.onRowClick(props.index, selectedProduct[0]?.id);
      }
      props.onClose();
    }
  };

  const renderRows = products
    ? products.map((product) => (
        <TableRow key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          {configs.map((config) => (
            <TableCell
              key={config.label}
             className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
              onDoubleClick={() => 
                {
                  console.log(product.id); 
                  props.onRowClick(props.index, product.id);
                  console.log("closing modal");
                  props.onClose(); }}
            >
              {config.render(product)}
            </TableCell>
          ))}
        </TableRow>
      ))
    : null;

  const renderHeaders = (
    <>
      {configs.map((config) => (
        <TableHeadCell
          className="p-4 text-left text-xs font-medium text-grey-500 uppercase tracking wider"
          key={config.label}
        >
          {config.label}
        </TableHeadCell>
      ))}
    </>
  );

  return (
    <>
      <Modal  dismissible
      show={props.isModalOpen} 
      onClose={props.onClose}>
        <ModalHeader>List of Products</ModalHeader>
        <ModalBody>
          <div className="bg-white rounded-lg p-4 sm:p-6 xl:p-8" tabIndex={-1}>
            <Table striped className="min-w-full divide-y divide-gray-200" ref = {refTable} tabIndex={0}>
              <TableHead>{renderHeaders}</TableHead>
              <TableBody className="divide-y">{renderRows}</TableBody>
            </Table>
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};
