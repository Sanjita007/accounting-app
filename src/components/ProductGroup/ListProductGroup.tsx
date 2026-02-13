import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { deleteProduct, getProducts } from 'src/api';
import { Product } from 'src/Models/Model';

interface Config {
  label: string;
  render: (product: Product) => React.ReactNode;
}


const handleDelete = async(id: number) => {
  alert("Product Id is:"+id);
  if(confirm('Are you sure you want to delete this product?') == true){
          var res = await deleteProduct(id);
          if(res?.status==200){
            alert("Item deleted successfully!");
          }
          else{
            alert(res?.statusText);
            
          }
      }
  };




const ListProduct = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const navigate = useNavigate();
  const handleEdit = (product: Product) => {
  console.log('Edit button clicked');
    navigate(`/product/edit/${product.id}`, {replace: true});

};
const configs: Config[] = [
  { label: 'id', render: (p) => p.id },
  { label: 'English Name', render: (p) => p.engName },
  { label: 'Nepali Name', render: (p) => p.nepName },
  { label: 'Sales Rate', render: (p) => p.salesRate },
  { label: 'Remarks', render: (p) => p.engName },
  {
    label: 'Action',
    render: (p) => {
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(p)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(p.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      );
    },
  },
];
  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      setProducts(result.data);
    };
    fetchData();
  }, []);

  const renderRows = products
    ? products.map((product) => (
        <tr key={product.id}>
          {configs.map((config) => (
            <td
              key={config.label}
              className="p-4 whitespace-nowrap text-m font-normal text-grey-900"
            >
              {config.render(product)}
            </td>
          ))}
        </tr>
      ))
    : null;

  const renderHeaders = (
    <tr>
      {configs.map((config) => (
        <th
          className="p-4 text-left text-xs font-medium text-grey-500 uppercase tracking wider"
          key={config.label}
        >
          {config.label}
        </th>
      ))}
    </tr>
  );

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 xl:p-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>{renderHeaders}</thead>
        <tbody>{renderRows}</tbody>
      </table>
    </div>
  );
};

export default ListProduct;
