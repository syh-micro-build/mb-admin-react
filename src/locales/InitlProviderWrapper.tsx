import { useState, useEffect } from 'react'
import {
  IntlProvider,
} from 'react-intl';
import { ConfigProvider } from "antd";
import { Locale } from 'antd/es/locale';
import 'dayjs/locale/zh-cn';
import antdEnUS from 'antd/locale/en_US';
import antdZhCN from 'antd/locale/zh_CN';
import { initIntl, getLocale } from './index';

const antdLocales = {
  'zh-CN': antdZhCN,
  'en-US': antdEnUS,
};

// 创建 Intl 提供者组件，官方声明所有使用 React Intl 的应用都必须使用 <IntlProvider>
function IntlProviderWrapper ({children} : { children: React.ReactNode }) {
  const [locale, setLocale] = useState(getLocale());
  const [messages, setMessages] = useState({});
  const [antdLocale, setAntdLocale] = useState<Locale>();
  const [loading, setLoading] = useState(true);

  // 组件挂载时初始化
  useEffect(() => {
    const bootstrapper = async () => {
      // 创建 Intl 实例
      const { locale, messages } = await initIntl();

      setLocale(locale);
      setMessages(messages);
      setAntdLocale(antdLocales[locale]);
      setLoading(false);
    };
    bootstrapper();
  }, []);

  if (loading) return <div>Loading translations...</div>;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <ConfigProvider locale={antdLocale}>
        {children}
      </ConfigProvider>
    </IntlProvider>
  );
};

export default IntlProviderWrapper;