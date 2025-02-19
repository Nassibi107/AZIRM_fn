import { Box, Card, useTheme } from "@mui/material";
import merge from "lodash.merge";
import Chart from "react-apexcharts";
// CUSTOM COMPONENTS
import { FlexBox } from "@/components/flexbox";
import { Percentage } from "@/components/percentage";
import { H6, Paragraph, Span } from "@/components/typography"; // CUSTOM UTILS METHODS

import { numberFormat } from "@/utils/numberFormat";
import { baseChartOptions } from "@/utils/baseChartOptions";
const EnigmaCount = () => {
    const theme = useTheme(); // REACT CHART CATEGORIES LABEL
    const chartCategories = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // REACT CHART DATA SERIES

    const chartSeries = [{
      name: "Tasks",
      data: [22, 30, 46, 50, 46, 30, 22, 22, 30, 46, 50 , 22]
    }]; // REACT CHART OPTIONS
  
    const chartOptions = merge(baseChartOptions(theme), {
      stroke: {
        show: false
      },
      xaxis: {
        categories: chartCategories
      },
      colors: [theme.palette.divider, theme.palette.success.main],
      plotOptions: {
        bar: {
          borderRadius: 2,
          distributed: true,
          columnWidth: "50%",
          borderRadiusApplication: "end"
        }
      },
      tooltip: {
        y: {
          formatter: (val, {
            dataPointIndex,
            w
          }) => {
            return `${w.globals.labels[dataPointIndex]} : ${val}`;
          }
        }
      }
    });
    return <Card>
        <Box p={3} pb={0}>
          <FlexBox alignItems="center" gap={1}>
            <H6>
              {numberFormat(826)}
            </H6>
            <Percentage type="success">+12.5%</Percentage>
          </FlexBox>
  
          <Paragraph color="text.secondary">Enigma Count Subscription</Paragraph>
        </Box>
  
        <Chart type="bar" series={chartSeries} options={chartOptions} height={130} />
      </Card>;
}

export default EnigmaCount