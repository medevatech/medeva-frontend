import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import { RadarChart } from 'components/charts';

import { radarChartData } from 'data/charts';

const OrderStockRadarChart = () => {
  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
          Order Stock
        </CardTitle>
        <div className="chart-container">
          <RadarChart shadow data={radarChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderStockRadarChart;
