import React from 'react';
import ReactECharts from 'echarts-for-react';

interface PerformanceChartProps {
  data: { date: string; rating: number }[];
  color?: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ data, color = '#FFD700' }) => {
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1A0B2E',
      borderColor: '#9D00FF',
      textStyle: { color: '#fff' },
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '10%',
      containLabel: false,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map(d => d.date),
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
      min: (value: { min: number }) => value.min - 100,
    },
    series: [
      {
        data: data.map(d => d.rating),
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: color,
          width: 3,
          shadowColor: 'rgba(255, 215, 0, 0.5)',
          shadowBlur: 10
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 215, 0, 0.3)' }, 
              { offset: 1, color: 'rgba(255, 215, 0, 0)' }, 
            ],
          },
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};
