import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminNav from "../components/admin/AdminNav";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminPage from "../pages/AdminPage";

const AdminLayout = () => {
  return (
    <div>
      <AdminNav />
      <Grid container>
        <Grid item lg={2}>
          <AdminSidebar />
        </Grid>
        <Grid item lg={10}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminLayout;
