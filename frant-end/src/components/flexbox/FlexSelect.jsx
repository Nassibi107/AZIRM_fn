import { Box } from "@mui/material";

const FlexSelect = ({ isActive ,children, ...props }) => (
  <Box
    display="flex"
    sx={{
      boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      borderRadius: "5px",
      paddingTop: 1,
      color: "#6950E8",width:"90%",
      paddingBottom: 1,
      alignItems: "center",
      justifyContent: "space-evenly",
      transition: "box-shadow borderStyle 0.3s",
      color: isActive ? "#6950E8" : "#000",
      "&:hover": {
        boxShadow: "rgba(0, 0, 0, 0.25) 2.95px 2.95px 3.6px",
        cursor: "pointer"
      },
    }}
    {...props}
  >
    {children}
  </Box>
);

export default FlexSelect;
