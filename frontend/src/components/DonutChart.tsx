import { options } from '../assets/charts/DonutChartConfig'; 
import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'utils/requests';
import { SaleSum } from 'types/sale';

type ChartData = {
  labels: string[];
  series: number[];
}

const DonutChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({labels: [], series: []});

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/amount-by-seller`)
      .then(res => {
        const data = res.data as SaleSum[];
        const myLabels = data.map(x => x.sellerName);
        const mySeries = data.map(x => x.sum);
        setChartData({ labels: myLabels, series: mySeries });
      })
  }, [])

  return (
    <Chart 
      options={{...options, labels: chartData.labels}} 
      series={chartData.series}
      type="donut"
      height="240"
    />
  )
    
}

export default DonutChart;