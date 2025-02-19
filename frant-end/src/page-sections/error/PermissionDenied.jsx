// MUI COMPONENTS
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container"; // CUSTOM COMPONENTS

import { H1, Paragraph } from "@/components/typography"; // CUSTOM DEFINED HOOK

import useNavigate from "@/hooks/useNavigate";

const PermissionDenied = () => {
  const navigate = useNavigate();
  return <Container>
      <Box textAlign="center" py={6}>
        <H1 fontSize={{
        sm: 52,
        xs: 42
      }}>403; Access denied</H1>
        <Paragraph mt={6} fontSize={18} color="text.secondary">
          Not premitted to access this server
        </Paragraph>

        <Button onClick={() => navigate("/")}>Go Home</Button>
        <Box py={0} maxWidth={600} margin="auto">
          <img src="/static/pages/PermissionDenied.png" alt="error" width="100%" />
        </Box>

      </Box>
    </Container>;
};

export default PermissionDenied;