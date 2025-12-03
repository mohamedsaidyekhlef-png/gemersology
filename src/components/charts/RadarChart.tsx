import React from 'react';
import ReactECharts from 'echarts-for-react';

interface RadarChartProps {
  data: number[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const option = {
    backgroundColor: 'transparent',
    radar: {
      indicator: [
        { name: 'AIM', max: 100 },
        { name: 'SENSE', max: 100 },
        { name: 'UTIL', max: 100 },
        { name: 'MOVE', max: 100 },
        { name: 'TEAM', max: 100 },
        { name: 'CONS', max: 100 },
      ],
      shape: 'polygon',
      splitNumber: 4,
      axisName: {
        color: '#9CA3AF',
        fontFamily: 'JetBrains Mono',
        fontSize: 10,
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      splitArea: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: data,
            name: 'Performance',
            symbol: 'none',
            lineStyle: {
              color: '#9D00FF',
              width: 2,
            },
            areaStyle: {
              color: 'rgba(157, 0, 255, 0.2)',
            },
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
};
