import CardBox from 'src/components/shared/CardBox';
import { useEffect, useState } from 'react';
import { getDashboardRecent } from 'src/api';
import { RecentDashboard } from 'src/Models/Model';


const RecentTransactionCard = () => {
  const [summary, setSummary] = useState<RecentDashboard[] | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      const [summ] = await Promise.all([getDashboardRecent()]);

      setSummary(summ.data);

      console.log(summ);

      console.log(summary);
    };
    fetchAllData();
  }, []);

  return (
    <>
      <CardBox className="pb-2">
        <h5 className="card-title">Recent Transactions</h5>
        <div className="mt-6">
          {summary?.map((item, i) => (
            <div className="flex gap-x-3" key={i}>
              <div className="w-1/6 text-end">
                <span className="text-dark dark:text-white font-medium text-sm  opacity-80">
                  {item.date}
                </span>
              </div>
              <div className="relative">
                <div className="relative z-10 w-7 h-5 flex justify-center items-center ">
                  <div className={`h-3 w-3 rounded-full  bg-${item.textcolor}`}></div>
                </div>
                {item.line ? (
                  <div className="border-s border-gray-200 h-full -mt-2 ms-3.5"></div>
                ) : (
                  <div className="border-0"></div>
                )}
              </div>
              <div className="w-1/4 grow pt-0.5 pb-5">
                {item.boldtext ? (
                  <p className="text-dark dark:text-white font-semibold">{item.details}</p>
                ) : (
                  <p className="text-dark dark:text-white font-medium">{item.details}</p>
                )}

                {/* {item.link ? (
                  <Link to={item.url} className="text-primary text-sm">
                    {item.link}
                  </Link>
                ) : null} */}
              </div>
            </div>
          ))}
        </div>
      </CardBox>
    </>
  );
};

export default RecentTransactionCard;
