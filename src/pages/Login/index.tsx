import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from '@ant-design/pro-components';
import { Space, Tabs, Alert, message, theme } from 'antd';
import SelectLang from '../../locales/SelectLang';
import Footer from '../../components/Footer';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import moduleStyles from './login.module.css';
import MicroBuildLogo from '/logo.png';
import { useIntl } from 'react-intl';
import { loginApi } from './api';

type LoginType = 'phone' | 'account';
export type LoginFormType = {
  username?: string,
  password?: string,
}

const {
  pageContainer,
  otherLoginIcon,
  lang
} = moduleStyles;

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login = () => {
  const { formatMessage } = useIntl();

  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState<LoginType>('account');

  const iconStyles: CSSProperties = {
    color: setAlpha(token.colorTextBase, 0.2),
  };

  const loginFun = async (values: LoginFormType) => {
    const res = await loginApi(values);
    console.log(res);

  };

  return (
    <div className={pageContainer}>
      <SelectLang className={lang} />
      <LoginForm
        logo={MicroBuildLogo}
        title="Micro Build"
        subTitle={formatMessage({ id: 'login.subTitle' })}
        onFinish={loginFun}
        actions={
          <Space>
            {formatMessage({ id: 'login.loginWith' })}
            <AlipayCircleOutlined className={otherLoginIcon} style={iconStyles} />
            <TaobaoCircleOutlined className={otherLoginIcon} style={iconStyles} />
            <WeiboCircleOutlined className={otherLoginIcon} style={iconStyles} />
          </Space>
        }
      >
        <Tabs
          centered
          activeKey={loginType}
          items={[
            {
              label: formatMessage({ id: 'login.accountLogin.tab' }),
              key: 'account',
            },
            {
              label: formatMessage({ id: 'login.phoneLogin.tab' }),
              key: 'phone',
            },
          ]}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        />
        {loginType === 'account' && (
          <LoginMessage
            content={formatMessage({ id: 'login.accountLogin.errorMessage' })}
          />
        )}
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={formatMessage({ id: 'login.username.placeholder' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'login.username.required' }),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={formatMessage({ id: 'login.password.placeholder' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'login.password.required' }),
                },
              ]}
            />
          </>
        )}
        {loginType === 'phone' && <LoginMessage content={formatMessage({ id: 'login.phoneLogin.errorMessage' })} />}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'} />,
              }}
              name="mobile"
              placeholder={formatMessage({ id: 'login.phoneNumber.placeholder' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'login.phoneNumber.required' }),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({ id: 'login.phoneNumber.invalid' }),
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={formatMessage({ id: 'login.captcha.placeholder' })}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${formatMessage({ id: 'getCaptchaSecondText' })}`;
                }
                return formatMessage({ id: 'login.phoneLogin.getVerificationCode' });
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'login.captcha.required' }),
                },
              ]}
              onGetCaptcha={async () => {
                message.success(formatMessage({ id: 'login.phoneLogin.successMessage' }));
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            {formatMessage({ id: 'login.rememberMe' })}
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            {formatMessage({ id: 'login.forgotPassword' })}
          </a>
        </div>
      </LoginForm>
      <Footer />
    </div>
  );
};

export default Login;