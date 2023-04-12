import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import { DoughnutChart } from 'components/charts';

import { doughnutChartData } from 'data/charts';

const ProductCategoriesDoughnut = () => {
  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
          Product Categories
        </CardTitle>
        <div className="dashboard-donut-chart">
          <DoughnutChart shadow data={doughnutChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCategoriesDoughnut;
