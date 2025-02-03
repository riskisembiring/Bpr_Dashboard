import React, { useState } from "react";
import { Layout, Menu, Dropdown, Modal } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import "../styles/DashboardLayout.css";

const { Header, Content, Sider, Footer } = Layout;

const DashboardLayout = ({ setIsAuthenticated, userRole }) => {
  const navigate = useNavigate();
  const [selectedMenuKey, setSelectedMenuKey] = useState("1");
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/"); 
  };

  const handleMenuClick = (key, path) => {
    setSelectedMenuKey(key);
    navigate(path);
  };

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalVisible(false);
    handleLogout();
  };

  const handleCancelLogout = () => {
    setIsLogoutModalVisible(false);
  };

  const menuItems = [
    {
      key: "1",
      label: "Profile",
      onClick: () => handleMenuClick("1", "/dashboard/profile"),
    },
    {
      key: "2",
      label: "Menu",
      children: [
        {
          key: "2-1",
          label: "Collection",
          onClick: () => handleMenuClick("2-1", "/dashboard/menu/collection"),
        },
        {
          key: "2-2",
          label: "E-Filing",
          children: [
            {
              key: "2-2-1",
              label: "Deposito",
              onClick: () => handleMenuClick("2-2-1", "/dashboard/menu/efiling/deposito"),
            },
            {
              key: "2-2-2",
              label: "Kredit",
              onClick: () => handleMenuClick("2-2-2", "/dashboard/menu/efiling/kredit"),
            },
          ],
        },
        {
          key: "2-3",
          label: "Pengajuan Kredit",
          onClick: () => {
            const targetPath =
              userRole === "marketing"
                ? "/dashboard/menu/pengajuanKreditAo"
                : userRole === "adminKredit"
                ? "/dashboard/menu/pengajuanKreditAk"
                : "/not-authorized"; // Default jika role tidak cocok
            handleMenuClick("2-3", targetPath);
          },
        },
        {
          key: "2-4",
          label: "Cetak MAK",
          onClick: () => handleMenuClick("2-4", "/dashboard/menu/cetakMAK"),
        },
      ],
    },
    {
      key: "3",
      label: "About Us",
      onClick: () => handleMenuClick("3", "/dashboard/about-us"),
    },
  ];
  

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => handleMenuClick("1", "/dashboard/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={showLogoutModal} danger>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="layout-container">
      {/* Sidebar */}
      <Sider className="sider" breakpoint="lg" collapsedWidth="0">
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenuKey]}
          className="menu"
          items={menuItems}
        />
      </Sider>

      <Layout>
        {/* Header */}
        <Header className="header">
          <div className="header-logo">
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ height: "25px", objectFit: "contain", marginTop: "20px", marginRight: "20px" }}
            />
          </div>
          <div className="header-user">
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <div className="header-user-container">
                <UserOutlined style={{ fontSize: "18px", marginRight: "8px", cursor: "pointer" }} />
                <h2
                  style={{
                    display: "inline",
                    margin: 0,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {userRole === "collector" ? "C" : userRole === "direksi" ? "D" : "V"}
                </h2>
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* Mobile Navbar */}
        <Menu
          className="mobile-navbar"
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedMenuKey]}
          items={menuItems}
          style={{ display: "none" }}
        />

        {/* Content */}
        <Content className="content">
          <Outlet />
        </Content>

        {/* Footer */}
        <Footer className="footer">
          ©2025 Created by <a href="https://riskisembiring.github.io/Portfolio/" target="_blank" rel="noopener noreferrer">Riski Sahputra Sembiring</a>
        </Footer>

        {/* Logout Confirmation Modal */}
        <Modal
          closable={false}
          title="Konfirmasi Logout"
          visible={isLogoutModalVisible}
          onOk={handleConfirmLogout}
          onCancel={handleCancelLogout}
          okText="Ya"
          cancelText="Tidak"
        >
          <p>Apakah anda ingin Logout?</p>
        </Modal>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
