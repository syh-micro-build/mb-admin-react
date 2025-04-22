import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from "antd";
import zhCN from 'antd/locale/zh_CN';
// import enUS from 'antd/locale/en_US';
import 'dayjs/locale/zh-cn';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
