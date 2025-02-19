import { Card, LinearProgress, useTheme } from "@mui/material";
import merge from "lodash.merge";
import Chart from "react-apexcharts";
// CUSTOM COMPONENTS
import { FlexBetween } from "@/components/flexbox";
import { Paragraph } from "@/components/typography";
import { MoreButton } from "@/components/more-button"; // CUSTOM UTILS METHOD

import { baseChartOptions } from "@/utils/baseChartOptions";

const Earnings = () => {
  const theme = useTheme(); // REACT CHART OPTIONS

  const chartOptions = merge(baseChartOptions(theme), {
    labels: ["Audits"],
    colors: [theme.palette.primary.main],
    plotOptions: {
      radialBar: {
        track: {
          show: false
        },
        dataLabels: {
          show: false
        },
        hollow: {
          margin: 15,
          size: "50%",
          background: theme.palette.primary.main,
          dropShadow: {
            enabled: true,
            opacity: 0.2
          }
        }
      }
    },
    stroke: {
      lineCap: "round"
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: val => `${val}`
      },
      style: {}
    }
  });
  return <Card sx={{
    p: 3,
    height: "100%"
  }}>
      <FlexBetween>
        <Paragraph fontSize={18} fontWeight={500}>
            Earnings
        </Paragraph>

        <MoreButton size="small" />
      </FlexBetween>

      <Chart type="radialBar" height={230} series={[70]} options={chartOptions} />

      <Paragraph lineHeight={1.2} fontSize={20} fontWeight={500}>
        $ 6078.76
      </Paragraph>

      <Paragraph mb={0.5} color="text.secondary">
        Total Expense
      </Paragraph>

      <LinearProgress value={60} variant="determinate" sx={{
      height: 8
    }} />
    </Card>;
};

export default Earnings;