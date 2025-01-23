import React from "react";
import { Layout, Menu, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "../styles/DashboardLayout.css"; 

const { Header, Content, Sider, Footer } = Layout;

const DashboardLayout = ({ setIsAuthenticated, userRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/"); // Logout and redirect to login page
  };

  const menuItems = [
    {
      key: "1",
      label: "Profile",
      onClick: () => navigate("/dashboard/profile"),
    },
    {
      key: "2",
      label: "Menu",
      children: [
        {
          key: "2-1",
          label: "Collection",
          onClick: () => navigate("/dashboard/menu/collection"),
        },
        {
          key: "2-2",
          label: "E-Filing",
          onClick: () => navigate("/dashboard/menu/efiling"),
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
    <Layout className="layout-container">
      {/* Sidebar for larger screens */}
      <Sider className="sider" breakpoint="lg" collapsedWidth="0">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="menu"
          items={menuItems}
        />
        <div style={{ position: "absolute", bottom: 0, width: "100%", padding: "10px" }}>
          <Button
            onClick={handleLogout}
            danger
            className="logout-btn"
            icon={<UserOutlined />}
          >
            Logout
          </Button>
        </div>
      </Sider>

      <Layout>
        {/* Header */}
        <Header className="header">
          <div className="header-logo">
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ height: "40px", objectFit: "contain", marginTop: "20px" }}
            />
          </div>
          <div className="header-user">
            <UserOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
            <h2 onClick={() => navigate("/dashboard/profile")}>{userRole}</h2>
          </div>
        </Header>

        {/* Mobile Navbar (below header) */}
        <Menu
          className="mobile-navbar"
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          style={{ display: "none" }} // Default hidden on larger screens
        />

        {/* Content */}
        <Content className="content">
          <Outlet />
        </Content>

        {/* Footer */}
        <Footer className="footer">
          ©2025 Created by Riski Sembiring
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
