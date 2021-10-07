import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";

import IntlMessages from "helpers/IntlMessages";
import { LineChart } from "components/charts";
import { ThemeColors } from "helpers/ThemeColors";

const colors = ThemeColors();

const SalesChartCard = ({ linechart }) => {
  const [lineChartData, setLineChartData] = useState({});
  const [lineChartOptions, setLineChartOptions] = useState({});
  useEffect(() => {
    if (linechart) {
      let tempdata = {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            borderColor: colors.themeColor1,
            pointBackgroundColor: colors.foregroundColor,
            pointBorderColor: colors.themeColor1,
            pointHoverBackgroundColor: colors.themeColor1,
            pointHoverBorderColor: colors.foregroundColor,
            pointRadius: 6,
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            fill: false,
          },
        ],
      };
      let min = Object.keys(linechart).length>0?linechart[Object.keys(linechart)[0]].count:0,
        max = 0;
      Object.keys(linechart).map((chartday) => {
        tempdata.labels.push(chartday);
        tempdata.datasets[0].data.push(linechart[chartday].count);
        if (max < linechart[chartday].count) {
          max = linechart[chartday].count;
        }
        if(min >linechart[chartday].count)
        {
          min = linechart[chartday].count;
        }
      });
      setLineChartData(tempdata);

      const chartTooltip = {
        backgroundColor: ThemeColors().foregroundColor,
        titleFontColor: ThemeColors().primaryColor,
        borderColor: ThemeColors().separatorColor,
        borderWidth: 0.5,
        bodyFontColor: ThemeColors().primaryColor,
        bodySpacing: 10,
        xPadding: 15,
        yPadding: 15,
        cornerRadius: 0.15,
      };

      let tempLineChartOptions = {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: chartTooltip,
        plugins: {
          datalabels: {
            display: false,
          },
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                lineWidth: 1,
                color: "rgba(0,0,0,0.1)",
                drawBorder: false,
              },
              ticks: {
                beginAtZero: true,
                stepSize: Math.floor((max-min)/10),
                min: (min-5)>0?(min-5):0,
                max: max+5,
                padding: 20,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      };
      setLineChartOptions(tempLineChartOptions);
    }
  }, [linechart]);
  return lineChartData ? (
    <Card>
      <div className="position-absolute card-top-buttons">
        <UncontrolledDropdown>
          <DropdownToggle color="" className="btn btn-header-light icon-button">
            <i className="simple-icon-refresh" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <IntlMessages id="dashboards.sales" />
            </DropdownItem>
            <DropdownItem>
              <IntlMessages id="dashboards.orders" />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.sales" />
        </CardTitle>
        <div className="dashboard-line-chart">
          <LineChart lineChartOptions={lineChartOptions} shadow data={lineChartData} />
        </div>
      </CardBody>
    </Card>
  ) : (
    ""
  );
};

export default SalesChartCard;
