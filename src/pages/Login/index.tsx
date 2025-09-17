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
  type ProFormInstance,
} from '@ant-design/pro-components';
import { Space, Tabs, Alert, message, theme } from 'antd';
import SelectLang from '../../locales/SelectLang';
import type { CSSProperties } from 'react';
import { useState, useRef } from 'react';
import { LoginLayout } from '../../components/Layout';
import moduleStyles from './login.module.css';
import MicroBuildLogo from '/logo.png';
import { useIntl } from 'react-intl';
import { loginApi, getAdminRoleApi } from './api';
import { useAppDispatch, useAppSelector } from "../../stores"
import { setAutoLogin, setLoginInfo, setUserInfo, setRoleInfo } from "../../stores/authSlice";
import { useNavigate } from 'react-router';

type LoginType = 'phone' | 'account';
export type LoginFormType = {
  username?: string,
  password?: string,
}

const {
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
  const formRef = useRef<ProFormInstance>(null);
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const { token } = theme.useToken();
  let autoLoginStatus = useAppSelector((state) => state.auth.autoLogin);
  const loginInfo = useAppSelector((state) => state.auth.loginInfo);
  const [loginState, setLoginState] = useState(true);
  const [loginType, setLoginType] = useState<LoginType>('account');

  const iconStyles: CSSProperties = {
    color: setAlpha(token.colorTextBase, 0.2),
  };

  const loginFun = async (values: LoginFormType) => {
    const res = await loginApi(values);
    if (res.code !== 200 || res.data.code !== 200) {
      setLoginState(false);
      return;
    } else {
      autoLoginStatus = formRef.current?.getFieldValue('autoLogin');
      dispatch(setAutoLogin(autoLoginStatus));
      // 如果自动登录状态为true，则保存用户名和密码，否则清除
      dispatch(setLoginInfo(autoLoginStatus ? {
        username: values.username,
        password: values.password,
      } : undefined));
      dispatch(setUserInfo(res.data.data));
      await getRole(res.data.data.role);
      navigate('/', { replace: true });
    }
  };

  const getRole = async (roleName: string) => {
    const res = await getAdminRoleApi({ roleName });
    dispatch(setRoleInfo(res.data.data));
  }

  return (
    <LoginLayout>
      <SelectLang className={lang} />
      <LoginForm
        formRef={formRef}
        logo={MicroBuildLogo}
        title="Micro Build"
        subTitle={formatMessage({ id: 'login.subTitle' })}
        onFinish={loginFun}
        initialValues={{
          autoLogin: autoLoginStatus,
          username: loginInfo?.username,
          password: loginInfo?.password,
        }}
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
        {!loginState && loginType === 'account' && (
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
    </LoginLayout>
  );
};

export default Login;