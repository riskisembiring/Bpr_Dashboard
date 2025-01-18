import React from "react";
import { Layout, Menu, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";  // Import icon user

const { Header, Content, Sider, Footer } = Layout;

const DashboardLayout = ({ setIsAuthenticated, userRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");  // Logout and redirect to login page
  };

  const menuItems = [
    {
      key: "1",
      label: "Profile",
      onClick: () => navigate("/dashboard/profile"),
    },
    {
      key: "2",
      label: "Maintenance",
      children: [
        {
          key: "2-1",
          label: "Collection",
          onClick: () => navigate("/dashboard/maintenance/collection"),
        },
        {
          key: "2-2",
          label: "E-Filing",
          onClick: () => navigate("/dashboard/maintenance/efiling"),
        },
      ],
    },
    {
      key: "3",
      label: "About Us",
      onClick: () => navigate("/dashboard/about-us"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}  // Default to Profile menu after login
          style={{
            paddingTop: "60px",
            height: "calc(100% - 60px)",
          }}
          items={menuItems.map((item) =>
            item.key !== "4"
              ? { ...item, style: { marginBottom: "12px", ...item.style } }
              : item
          )}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            padding: "10px",
            background: "#001529",
          }}
        >
          <Button
            onClick={handleLogout}
            danger
            style={{
              width: "100%",
            }}
          >
            Logout
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#001529",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ height: "40px", objectFit: "contain", marginTop: "20px" }}
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", color: "#fff" }}
          >
            <UserOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
            <h2
              style={{ margin: 0, cursor: "pointer" }}
              onClick={() => navigate("/dashboard/profile")}
            >
              {userRole}
            </h2>
          </div>
        </Header>
        <Content
          style={{
            margin: "0px",
            background: "#fff",
            padding: "20px",
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©2025 Created by Riski Sembiring
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
