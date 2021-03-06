import React, { useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, Divider, makeStyles } from '@material-ui/core';
import Chart from 'chart.js/auto';
import { DailyData } from '../../helpers/processData';
export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    height: '500px',
    position: 'relative',
    padding: theme.spacing(2),
  },
}));

export type ChartData = {
  label: string;
  value: string | number;
};
export type MainChartProps = {
  data?: ChartData[];
};

const MainChart = (props: MainChartProps) => {
  const classes = useStyles();

  const { data = [] } = props;
  const mainChartRef = React.createRef<HTMLCanvasElement>();

  let chartLabels: string[] = [];
  let chartData: (string | number)[] = [];

  data.forEach((item) => {
    chartLabels.push(item.label);
    chartData.push(item.value);
  });

  let mainChart;
  const MAX_BAR_THICKNESS = 12;

  useEffect(() => {
    if (mainChartRef.current) {
      mainChart = new Chart(mainChartRef.current, {
        type: 'bar',
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: 'Expense',
              data: chartData,
              backgroundColor: '#0417E3',
              maxBarThickness: MAX_BAR_THICKNESS,
              barThickness: 12,
              barPercentage: 0.5,
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                borderDash: [2],
                borderDashOffset: 2,
                drawBorder: false,
              },
            },
            x: {
              grid: {
                display: false,
                drawBorder: false,
              },
            },
          },
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    }
  }, []);

  return (
    <Card className={classes.root}>
      <CardHeader title="Latest" />
      <Divider />
      <div className={classes.content}>
        <canvas ref={mainChartRef} id="mainChart"></canvas>
      </div>
    </Card>
  );
};

export default MainChart;
