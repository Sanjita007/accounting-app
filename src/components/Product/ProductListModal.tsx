import {
  Button,
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
import { useEffect, useState } from 'react';
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
  onRowClick: (id: number) => void;
};

export const ProductListModal = (props: Props) => {
  const [openModal, setOpenModal] = useState(props.isModalOpen);
  const [products, setProducts] = useState<Product[] | null>(null);

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

  const renderRows = products
    ? products.map((product) => (
        <TableRow key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
          {configs.map((config) => (
            <TableCell
              key={config.label}
             className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
              onDoubleClick={() => {console.log(product.id); props.onRowClick(product.id); setOpenModal(false); }}
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
      <Modal dismissible={true} show={props.isModalOpen} onClose={props.onClose}>
        <ModalHeader>List of Products</ModalHeader>
        <ModalBody>
          <div className="bg-white rounded-lg p-4 sm:p-6 xl:p-8">
            <Table striped className="min-w-full divide-y divide-gray-200">
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
