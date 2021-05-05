import { options, mockData } from '../assets/charts/BarChartConfig'; 
import Chart from 'react-apexcharts';

const BarChart: React.FC = () => {

  return (
    <Chart 
      options={{...options, xaxis:mockData.labels}} 
      series={mockData.series}
      type="bar"
      height="240"
    />
  )
    
}

export default BarChart;