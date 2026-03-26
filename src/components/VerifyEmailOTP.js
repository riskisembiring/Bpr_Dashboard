import React, { useState } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css"; // Reuse login styles

const { Link, Text } = Typography;

const VerifyEmailOTP = ({ setIsAuthenticated, setUserRole }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: send OTP, 2: verify OTP
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [hasTempUsername, setHasTempUsername] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get username/email from location state or localStorage
  React.useEffect(() => {
    const tempUsername = localStorage.getItem("temp_username");
    const storedUsername = tempUsername || localStorage.getItem("username");
    const storedEmail = localStorage.getItem("temp_email");
    if (storedUsername) {
      setUsername(storedUsername);
      if (tempUsername) setHasTempUsername(true);
    }
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const sendOTP = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("https://api-nasnus.vercel.app/api/send-email-otp", {
        username: values.username || username,
        email: values.email || email,
      });
      message.success("OTP berhasil dikirim ke email!");
      setStep(2);
    } catch (error) {
      message.error(error.response?.data?.message || "Gagal mengirim OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("https://api-nasnus.vercel.app/api/verify-email-otp", {
        username: username || localStorage.getItem("username"),
        email: email,
        otp: values.otp,
      });
      message.success("Email berhasil diverifikasi!");
      // Update localStorage
      localStorage.setItem("emailVerified", "true");
      localStorage.removeItem("temp_username");
      localStorage.removeItem("temp_email");
      // Redirect to login or dashboard
      if (setIsAuthenticated && setUserRole) {
        setIsAuthenticated(true);
        setUserRole(localStorage.getItem("role"));
        navigate("/dashboard/profile");
      } else {
        navigate("/");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "OTP salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" title="Verifikasi Email OTP">
        {step === 1 ? (
          <>
            <Typography.Text style={{ display: 'block', marginBottom: '20px', textAlign: 'center' }}>
              Masukkan email terkait untuk mengirim OTP verifikasi.
            </Typography.Text>
            <Form name="send-otp" onFinish={sendOTP} layout="vertical" initialValues={{}}>
              {hasTempUsername ? (
                <Typography.Text style={{ display: 'block', marginBottom: '16px', textAlign: 'center', fontSize: '16px' }}>
                  Username: <strong>{username}</strong>
                </Typography.Text>
              ) : (
                <Form.Item name="username" label="Username">
                  <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Item>
              )}
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type: 'email', message: "Masukkan email valid!" }]}
              >
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  Kirim OTP
                </Button>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <Typography.Text style={{ display: 'block', marginBottom: '20px', textAlign: 'center' }}>
              Masukkan kode OTP yang dikirim ke email Anda (6 digit).
            </Typography.Text>
            <Form name="verify-otp" onFinish={verifyOTP} layout="vertical">
              <Form.Item
                label="OTP Code"
                name="otp"
                rules={[{ required: true, len: 6, message: "OTP harus 6 digit!" }]}
              >
                <Input placeholder="123456" maxLength={6} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                  Verifikasi OTP
                </Button>
              </Form.Item>
              <Button onClick={() => setStep(1)} style={{ marginTop: 10 }}>
                Kirim Ulang OTP
              </Button>
            </Form>
          </>
        )}
        <div className="register-link">
          <Typography.Text>
            <Link onClick={() => navigate("/")}>Kembali ke Login</Link>
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
};

export default VerifyEmailOTP;

