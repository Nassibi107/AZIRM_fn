import { Card, useTheme } from "@mui/material";
import merge from "lodash.merge";
import Chart from "react-apexcharts";
// CUSTOM COMPONENTS
import { FlexBetween } from "@/components/flexbox";
import { Paragraph } from "@/components/typography";
import { MoreButton } from "@/components/more-button"; // CUSTOM UTILS METHOD

import { baseChartOptions } from "@/utils/baseChartOptions"; // ==============================================================

// ==============================================================
const Transactions = ({
  type = "bar"
}) => {
  const theme = useTheme(); // REACT CHART CATEGORIES LABEL

  const chartCategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // REACT CHART DATA SERIES

  const chartSeries = [{
    name: "Income",
    data: [480, 400, 220, 300, 280 ,200, 480, 250, 200, 440, 250, 150]
  }, {
    name: "Expense",
    data: [420, 350, 280, 150, 200, 300, 450, 200, 300, 410, 350, 150]
  }]; // REACT CHART OPTIONS

  const chartOptions = merge(baseChartOptions(theme), {
    colors: [theme.palette.primary.main, theme.palette.grey[200]],
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: theme.palette.divider
    },
    xaxis: {
      crosshairs: {
        show: false
      },
      categories: chartCategories,
      labels: {
        show: true,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      min: 0,
      show: true,
      max: 500,
      tickAmount: 5,
      labels: {
        formatter: value => value / 1000 + "K",
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        formatter: val => `$${val}`
      }
    },
    chart: {
      stacked: false
    },
    stroke: {
      show: true,
      ...(type === "bar" && {
        width: 3,
        colors: ["transparent"]
      })
    },
    legend: {
      show: true,
      position: "top",
      fontSize: "14px",
      itemMargin: {
        horizontal: 12
      },
      fontFamily: theme.typography.fontFamily,
      onItemClick: {
        toggleDataSeries: false
      },
      onItemHover: {
        highlightDataSeries: false
      },
      markers: {
        radius: 30,
        width: 8,
        height: 8
      }
    },
    ...(type === "bar" && {
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: "43%",
          borderRadiusApplication: "end"
        }
      },
      responsive: [{
        breakpoint: 550,
        options: {
          chart: {
            height: 450
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          xaxis: {
            min: 0,
            show: true,
            max: 50000,
            tickAmount: 5,
            labels: {
              formatter: value => value / 1000 + "K",
              style: {
                colors: theme.palette.text.secondary
              }
            }
          },
          yaxis: {
            show: true,
            labels: {
              style: {
                fontWeight: 500,
                colors: theme.palette.text.secondary,
                fontFamily: theme.typography.fontFamily
              }
            }
          }
        }
      }]
    })
  });
  return <Card sx={{
    p: 3,
    pb: 0
  }}>
      <FlexBetween mb={2}>
        <Paragraph fontSize={18} fontWeight={500}>
          Transactions
        </Paragraph>

        <MoreButton size="small" />
      </FlexBetween>

      <Chart type={type} height={275} options={chartOptions} series={chartSeries} />
    </Card>;
};

export default Transactions;