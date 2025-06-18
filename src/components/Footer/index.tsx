import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="Powered by Micro Build"
      links={[
        {
          key: 'Micro Build React',
          title: 'Micro Build React',
          href: 'https://github.com/syh-micro-build/mb-admin-react',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/syh-micro-build/mb-admin-react',
          blankTarget: true,
        },
        {
          key: 'Micro Build',
          title: 'Micro Build',
          href: 'https://github.com/syh-micro-build',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
