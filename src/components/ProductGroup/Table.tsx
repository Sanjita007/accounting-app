import { useEffect, useState } from 'react';
import { getProducts } from 'src/api';
import { Product } from 'src/Models/Model';

type Props = {};

const configs = [
  {
    label: 'id',
    render: (company: Product) => company.id,
  },
  {
    label: 'English Name',
    render: (company: Product) => company.engName,
  },
  {
    label: 'Nepali Name',
    render: (company: Product) => company.nepName,
  },
  {
    label: 'Sales Rate',
    render: (company: Product) => company.salesRate,
  },
  {
    label: 'Remarks',
    render: (company: Product) => company.engName,
  },
];

const Table = (prop: Props) => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      setProducts(result);
    };
    fetchData();
  }, []);

  const renderRows = products
    ? products.map((product) => {
        return (
          <tr key={product.id}>
            {configs.map((val: any) => {
              return (
                <td className="p-4 whitespace-nowrap text-m font-normal text-grey-900">
                  {val.render(product)}
                </td>
              );
            })}
          </tr>
        );
      })
    : null;

  const renderHeaders = configs.map((config: any) => {
    return (
      <th
        className="p-4 text-left text-xs font-medium text-grey-500 uppercase tracking wider"
        key={config.lebel}
      >
        {config.label}
      </th>
    );
  });
  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 xl:p-8">
      <table>
        <thead className="min-w-full divide-y divide=gray-200 m-5">{renderHeaders}</thead>
        <tbody>{renderRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
