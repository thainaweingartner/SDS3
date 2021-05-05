import { options, mockData } from '../assets/charts/DonutChartConfig'; 
import Chart from 'react-apexcharts';

const DonutChart: React.FC = () => {

  return (
    <Chart 
      options={{...options, labels: mockData.labels}} 
      series={mockData.series}
      type="donut"
      height="240"
    />
  )
    
}

export default DonutChart;