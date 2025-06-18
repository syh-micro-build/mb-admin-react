import { useState } from 'react';
import { Dropdown } from 'antd';
import { getLocale, setLocale, type SupportLocale } from '.';

interface LocalData {
  lang: string,
  label?: string,
  icon?: string,
  title?: string,
}

interface SelectLangProps {
  globalIconClassName?: string;
  postLocalesData?: (locales: LocalData[]) => LocalData[];
  className?: string;
  reload?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

const defaultLangUConfigMap = {
  'en-US': {
    lang: 'en-US',
    label: 'English',
    icon: '🇺🇸',
    title: 'Language'
  },
  'zh-CN': {
    lang: 'zh-CN',
    label: '简体中文',
    icon: '🇨🇳',
    title: '语言'
  },
};

const SelectLang: React.FC<SelectLangProps> = (props) => {
  const {
    globalIconClassName,
    postLocalesData,
    icon,
    style,
    reload,
    ...restProps
  } = props;

  const [selectedLang, setSelectedLang] = useState(() => getLocale());

  const handleClick = ({ key }: { key: string }) => {
    setLocale(key as SupportLocale, reload);
    setSelectedLang(getLocale())
  };

  const menuItemStyle = { minWidth: "160px" };
  const menuItemIconStyle = { marginRight: "8px" };

  const defaultLangUConfigArray = Object.values(defaultLangUConfigMap);

  const langMenu = {
    selectedKeys: [selectedLang],
    onClick: handleClick,
    items: defaultLangUConfigArray.map((localeObj) => ({
      key: localeObj.lang,
      style: menuItemStyle,
      label: (
        <>
          <span role="img" aria-label={localeObj?.label || 'en-US'} style={menuItemIconStyle}>
            {localeObj?.icon || '🌐'}
          </span>
          {localeObj?.label || 'en-US'}
        </>
      ),
    })),
  };

  const inlineStyle = {
    cursor: "pointer",
    padding: "12px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    verticalAlign: "middle",
    ...style,
  };

  return (
    <Dropdown menu={langMenu} placement="bottomRight" {...restProps}>
      <span className={globalIconClassName} style={inlineStyle}>
        <i className="anticon" title={defaultLangUConfigMap[selectedLang]?.title}>
          {icon ?
            icon : (
              <svg
                viewBox="0 0 24 24"
                focusable="false"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                  className="css-c4d79v"
                />
              </svg>
            )}
        </i>
      </span>
    </Dropdown>
  );
}

export default SelectLang;