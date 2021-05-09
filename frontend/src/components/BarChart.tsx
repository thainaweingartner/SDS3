import { options } from '../assets/charts/BarChartConfig'; 
import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'utils/requests';
import { SaleSuccess } from 'types/sale';
import { round } from 'utils/format';

type SeriesData = {
  name: string;
  data: number[];
}

type ChartData = {
  labels: {
    categories: string [];
  };
  series: SeriesData[];
}

const BarChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels:{
      categories:[]
    }, 
    series: [
      {
        name: '',
        data: [],
      }
    ]
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/success-by-seller`)
      .then(res => {
        const data = res.data as SaleSuccess[];
        const myLabels = data.map(x => x.sellerName);
        const mySeries = data.map(x => round(100 * x.deals / x.visited, 1));
        setChartData({ 
          labels: {
            categories: myLabels
          }, 
          series: [
            {
              name: '% Success',
              data: mySeries
            }
          ] 
        });
      })
  }, [])

  return (
    <Chart 
      options={{...options, xaxis:chartData.labels}} 
      series={chartData.series}
      type="bar"
      height="240"
    />
  )
    
}

export default BarChart;