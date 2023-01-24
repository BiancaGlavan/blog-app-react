import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminNav from "../components/admin/AdminNav";
import AdminSidebar from "../components/admin/AdminSidebar";
import { styled } from "@mui/material/styles";

const StyledAdminLayout = styled('div')`
  display: flex;

  .main {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

`;

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <StyledAdminLayout className="AdminLayout">
      {!isMobile && <AdminSidebar />}
      <Box className="main">
        <AdminNav />
        <Outlet />
      </Box>
    </StyledAdminLayout>
  );
};

export default AdminLayout;
