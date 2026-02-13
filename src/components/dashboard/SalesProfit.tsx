import Chart from 'react-apexcharts';
import CardBox from '../shared/CardBox';
import { ProfitLossDashboard } from 'src/Models/Model';
import { useEffect, useMemo, useState } from 'react';
import { getDashboardSalesPurch } from 'src/api';

const SalesProfit = () => {
  const [summary, setSummary] = useState<ProfitLossDashboard | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      const [summ] = await Promise.all([getDashboardSalesPurch()]);

      setSummary(summ.data);

      console.log(summ);
     
      console.log(summary);
    };
    fetchAllData();
  }, []);

  // use memo is to reload the value when summary is loaded from the api call
  const optionexpenses: any = useMemo(() => ({
    series: [
      {
        name: 'Sales',
        data: summary?.salesAmounts || [],
      },
      {
        name: 'Purchase',
        data: summary?.purchAmounts || [],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: 375,
      offsetY: 10,
      offsetX: -18,
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: 'rgba(0,0,0,.1)',
    },
    colors: ['var(--color-primary)', 'var(--color-error)'],
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: false,
        columnWidth: '30%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 5,
      colors: ['transparent'],
    },
    xaxis: {
      type: 'category',
      categories: summary?.months || [],

      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: '#a1aab2',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#a1aab2',
        },
      },
      //min: 0,
      // max: 12,
      tickAmount: 5,
    },

    fill: {
      opacity: 1,
      colors: ['var(--color-primary)', 'var(--color-error)'],
    },
    tooltip: {
      theme: 'dark',
    },
    legend: {
      show: false,
    },

    responsive: [
      {
        breakpoint: 767,
        options: {
          stroke: {
            show: false,
            width: 5,
            colors: ['transparent'],
          },
        },
      },
    ],
  }), [summary]);

  return (
    <CardBox>
      <div className="flex justify-between items-center">
        <h5 className="card-title">Sales & Purchase</h5>
      </div>
      <div>
        <Chart
          options={optionexpenses}
          series={optionexpenses.series}
          type="bar"
          height="375px"
          width={'100%'}
        />
      </div>
    </CardBox>
  );
};

export default SalesProfit;
