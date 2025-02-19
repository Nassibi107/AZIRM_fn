import { Box } from "@mui/material";

const FlexAround = ({
  children,
  ...props
}) => <Box display="flex" alignItems="center" justifyContent='space-around'  {...props}>
    {children}
  </Box>;

export default FlexAround;