import { Fragment } from "react";
import { Grid, Box, Divider } from "@mui/material"; // CUSTOM COMPONENTS

import { H3, H6, Paragraph } from "@/components/typography";
import { FlexRowAlign } from "@/components/flexbox"; // =========================================================================

// =========================================================================
const Layout = ({
  children,
  login
}) => {
  return <>
       
          {children}
      
  
    </>;
};

export default Layout;