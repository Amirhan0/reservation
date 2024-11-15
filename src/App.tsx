import { Layout } from 'antd';
import { BrowserRouter, useLocation } from 'react-router-dom';
import './App.css';
import AppRouter from './routes/router';
import Navbar from './components/Navbar';
import AdminNavbar from './admin/components/AdminNavBar';

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isAdminRoute ? <AdminNavbar /> : <Navbar />}
      <Layout className="site-layout">
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <AppRouter />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
