import Icon, * as IconSource from '@ant-design/icons';

/**
 * 通用图标组件，支持动态加载Ant Design图标
 * @param name 图标名称，对应Ant Design Icon的组件名（首字母大写）
 * @param style 图标样式，颜色、字体大小等
 * @param className 自定义类名
 * @param onClick 点击事件
 * @returns React组件
 */
const DynamicIcon = ({
  name,
  style,
  className,
  onClick,
}: {
  name: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}) => {
  const IconComponentName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <Icon
      className={className}
      {...(style && { style })}
      component={IconSource[IconComponentName as keyof typeof IconSource] as React.ForwardRefExoticComponent<any>}
      onClick={onClick}
    />
  );
};

export default DynamicIcon;
