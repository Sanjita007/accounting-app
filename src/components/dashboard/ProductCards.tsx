import { Button } from 'flowbite-react';

import { Link } from 'react-router';
import CardBox from '../shared/CardBox';
import { IconBasket } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { ProductDashboard } from 'src/Models/Model';
import { getDashboardProducts } from 'src/api';

const ProductCards = () => {

   const [summary, setSummary] = useState<ProductDashboard[] | null>(null);
  
    useEffect(() => {
      const fetchAllData = async () => {
        const [summ] = await Promise.all([getDashboardProducts()]);
  
        setSummary(summ.data);
      
      };
      fetchAllData();
    }, []);
  

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {summary?.map((item, i) => (
          <div className="lg:col-span-3 md:col-span-6 col-span-12" key={i}>
            <CardBox className="p-0 overflow-hidden group card-hover">
              <div className="relative">
                <Link to="#">
                  <div className="overflow-hidden h-[280px] w-full">
                    <img
                      src={item.image}
                      alt="Spike"
                      height={280}
                      width={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-6 pt-4">
                  <div className="flex justify-between items-center -mt-8 ">
                    <div className="ms-auto">
                      <Button
                        color={'primary'}
                        className="btn-circle ms-auto p-0 w-8 h-8 rounded-full!"
                      >
                        <IconBasket size={18} />
                      </Button>
                    </div>
                  </div>
                  <h6 className="text-base line-clamp-1 group-hover:text-primary">{item.productName}</h6>
                  <div className="flex justify-between items-center mt-1">
                    <h5 className="text-base flex gap-2 items-center">
                      ${item.salesPrice}{' '}
                      <span className="font-normal text-sm text-dark/50 line-through">
                        ${item.salesPrice + 5}
                      </span>
                    </h5>                                   
                  </div>
                </div>
              </div>
            </CardBox>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCards;
