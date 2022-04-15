import ChartBar from './ChartBar';
import "./Chart.css";

const Chart = ({dataPoints}) => {
    const maxValue = Math.max(...dataPoints.map(x=>x.value));
    return (
        <div className='chart'>
            {dataPoints.map(item => 
                <ChartBar 
                key = {item.id}
                value = {item.value}
                maxValue = {maxValue}
                label =  {item.label}  />)}
        </div>
    );
};

export default Chart;