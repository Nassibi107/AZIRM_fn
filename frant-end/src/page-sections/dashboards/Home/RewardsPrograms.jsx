import { Box, Card, Stack, useTheme } from "@mui/material";
import merge from "lodash.merge";
import { FlexBetween } from "@/components/flexbox";
import { Paragraph } from "@/components/typography";
import { MoreButton } from "@/components/more-button";
import { baseChartOptions } from "@/utils/baseChartOptions";
import { isDark } from "@/utils/constants";
import { StatusBadge } from "@/components/status-badge";

const RewardsPrograms = () => {
    const theme = useTheme();

    const chartOptions = (base, track) => {
        return merge(baseChartOptions(theme), {
          labels: ["Audits"],
          colors: [base],
          plotOptions: {
                radialBar: {
                track: {
                    background: track
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        color: base,
                        fontWeight: 500,
                        offsetY: 6
                    }
                },
                hollow: {
                    size: "40%",
                    dropShadow: {
                        enabled: true,
                        opacity: 0.2
                    }
                }
                }
            }
        });
    };

  return <Card sx={{
        p: 3,
        height: "100%"
    }}>
        <FlexBetween mb={4}>
            <Box>
                <Paragraph fontSize={18} fontWeight={500}>Reward Programs</Paragraph>
            </Box>

            <MoreButton size="small" />
        </FlexBetween>

        <Stack spacing={3}>
            <FlexBetween sx={{
                borderRadius: 3,
                backgroundColor: isDark(theme) ? "grey.700" : "primary.25"
            }}>
                <Box pl={3}>
                    <Paragraph fontSize={16} fontWeight={600}>
                        1 Year 
                    </Paragraph>

                    <Paragraph color="text.secondary" fontWeight={500}>
                        Reward
                    </Paragraph>
                </Box>

                {/* <Chart width={130} height={140} series={[100]} type="radialBar" options={chartOptions(theme.palette.primary.main, theme.palette.primary[100])} /> */}
                <StatusBadge type="primary" sx={{ my : 4 , mx : 2 }}>
                    Earned
                </StatusBadge>
            </FlexBetween>

            <FlexBetween sx={{
                borderRadius: 3,
                backgroundColor: isDark(theme) ? "grey.700" : "primary.25"
            }}>
                <Box pl={3}>
                    <Paragraph fontSize={16} fontWeight={600}>
                        1 Year
                    </Paragraph>

                    <Paragraph color="text.secondary" fontWeight={500}>
                        1 year
                    </Paragraph>
                </Box>

                {/* <Chart width={130} height={140} series={[30]} type="radialBar" options={chartOptions(theme.palette.grey[500], theme.palette.grey[200])} /> */}
                <StatusBadge type="primary" sx={{ my : 4 , mx : 2 }}>
                    Earned
                </StatusBadge>
            </FlexBetween>
        </Stack>
    </Card>;
};

export default RewardsPrograms;