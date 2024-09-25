/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Layout,
  Menu,
  theme,
  Row,
  Col,
  Typography,
  Card,
  Statistic,
  Button,
} from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  WarningOutlined,
  UserOutlined,
  BranchesOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExperimentOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Customers from "../../admin/customers/Customers"; // Import the Customers component
import Dashboard from "../disease/Dashboard";
import Home from "../plant/plantMain"; // Import the plantMain component
import Fertilizer from "../fertilizer/displayFertilizer";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const mainColor = "#001529"; // Bright blue
const secondaryColor = "#52c41a"; // Green
const accentColor = "#faad14"; // Yellow
const dangerColor = "#f5222d"; // Red

const StyledCard = styled(Card)`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const StyledStatistic = styled(Statistic)`
  .ant-statistic-title {
    font-size: 16px;
    color: #3f3f3f;
  }
  .ant-statistic-content {
    font-size: 24px;
    font-weight: bold;
    color: #1e1e1e;
  }
`;

const CenteredMenu = styled(Menu)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  background-color: ${mainColor};
  color: white;

  .ant-menu-item {
    color: white !important;
  }

  .ant-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }

  .ant-menu-item-selected {
    background-color: ${secondaryColor} !important;
    color: white !important;
  }

  .anticon {
    color: white !important;
  }import Home from './../../plant/plantMain';

`;

const StyledLogoutButton = styled(Button)`
  background-color: ${dangerColor};
  border-color: ${dangerColor};
  color: white;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    background-color: #ff7875;
    border-color: #ff7875;
    color: white;
  }
`;

const StyledFeatureCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  margin-bottom: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);
  }

  .ant-card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;

  ${StyledFeatureCard}:hover & {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #3f3f3f;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
  flex: 1;
`;

const CardButton = styled(Button)`
  align-self: flex-start;
  background-color: ${secondaryColor};
  border-color: ${secondaryColor};

  &:hover {
    background-color: #73d13d;
    border-color: #73d13d;
  }
`;

const FeatureCard = ({
  imageUrl,
  title,
  description,
  buttonText = "Go to",
  onButtonClick,
}) => (
  <StyledFeatureCard cover={<CardImage src={imageUrl} alt={title} />}>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
    <CardButton type="primary" onClick={onButtonClick}>
      {buttonText}
    </CardButton>
  </StyledFeatureCard>
);

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

const Layouts = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { key: "1", icon: <HomeOutlined />, label: "Dashboard" },
    { key: "2", icon: <BranchesOutlined />, label: "Plants" },
    { key: "3", icon: <WarningOutlined />, label: "Diseases" },
    { key: "5", icon: <ExperimentOutlined />, label: "Fertilizers" },
    { key: "4", icon: <UserOutlined />, label: "Customers" },
  ];

  const cardData = [
    {
      title: "Total Plants",
      value: 1254,
      icon: (
        <BranchesOutlined style={{ fontSize: 24, color: secondaryColor }} />
      ),
      color: "#f6ffed",
    },
    {
      title: "Identified Diseases",
      value: 28,
      icon: <WarningOutlined style={{ fontSize: 24, color: accentColor }} />,
      color: "#fff7e6",
    },
    {
      title: "Active Users",
      value: 4367,
      icon: <UserOutlined style={{ fontSize: 24, color: mainColor }} />,
      color: "#e6f7ff",
    },
    {
      title: "Total Revenue",
      value: 15480,
      prefix: "$",
      icon: (
        <DollarCircleOutlined style={{ fontSize: 24, color: secondaryColor }} />
      ),
      color: "#f6ffed",
    },
  ];

  const featureCardData = [
    {
      imageUrl:
        "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg",
      title: "Plant Identification",
      description:
        "Instantly identify plants using our AI-powered image recognition technology.",
      buttonText: "Identify Plants",
      onButtonClick: () => {},
    },
    {
      imageUrl:
        "https://hips.hearstapps.com/hmg-prod/images/colorado-beetle-eats-a-potato-leaves-young-royalty-free-image-542328690-1531259828.jpg",
      title: "Disease Detection",
      description:
        "Detect and diagnose plant diseases early to protect your garden.",
      buttonText: "Detect Diseases",
      onButtonClick: () => {},
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case "2":
        return <Home />;
      case "3":
        return <Dashboard />;
      case "4":
        return <Customers />;
        case "5":
        return <Fertilizer />;
      default:
        return (
          <>
            <Title level={2} style={{ marginBottom: 24, color: "#3f3f3f" }}>
              Dashboard Overview
            </Title>
            <Row gutter={[16, 16]}>
              {cardData.map((card, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <StyledCard hoverable style={{ background: card.color }}>
                    <StyledStatistic
                      title={card.title}
                      value={card.value}
                      prefix={card.prefix}
                      suffix={card.icon}
                    />
                  </StyledCard>
                </Col>
              ))}
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              {featureCardData.map((card, index) => (
                <Col xs={24} md={12} key={index}>
                  <FeatureCard {...card} />
                </Col>
              ))}
            </Row>
          </>
        );
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          boxShadow: "2px 0 8px 0 rgba(29,35,41,.05)",
          backgroundColor: mainColor,
        }}
      >
        <CenteredMenu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
          items={menuItems}
        />
      </Sider>
      <Layout
        style={{ marginLeft: collapsed ? 80 : 200, transition: "all 0.2s" }}
      >
        <Header
          style={{
            padding: 0,
            background: mainColor,
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            boxShadow: "0 2px 8px #f0f1f2",
          }}
        >
          <Row
            justify="space-between"
            align="middle"
            style={{ height: "100%", padding: "0 16px" }}
          >
            <Col>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                  style: {
                    fontSize: "18px",
                    cursor: "pointer",
                    color: "#fff",
                  },
                }
              )}
            </Col>
            <Col>
              <StyledLogoutButton
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </StyledLogoutButton>
            </Col>
          </Row>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#ffffff",
            borderRadius: borderRadiusLG,
            overflow: "initial",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;
