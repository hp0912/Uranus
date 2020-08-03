import {
  CommentOutlined,
  FileProtectOutlined,
  GlobalOutlined,
  MessageOutlined,
  TagOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Result } from 'antd';
import { ClickParam } from "antd/lib/menu";
import React, { FC, useCallback, useContext, useState } from 'react';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import UserAvatar from '../../components/Header/UserAvatar';
import { UserContext } from '../../store/user';
import { ArticleEdit } from './ArticleEdit';
import { ArticleManagement } from './ArticleManagement';
import { CommentManagement } from './CommentManagement';
import { MessageManagement } from './MessageManagement';
import { TagManagement } from './TagManagement';
import { UserManagement } from './UserManagement';
import { WebsiteManagement } from './WebsiteManagement';

// 样式
import './admin.css';

const { Content, Sider, Header } = Layout;

export enum AdminMenuKey {
  article_management = 'article_management',
  tag_management = 'tag_management',
  comment_management = 'comment_management',
  message_management = 'message_management',
  user_management = 'user_management',
  website_management = 'website_management',
}

const Admin: FC = (props) => {
  const history = useHistory();
  const match = useRouteMatch();
  const loc = useLocation();
  const userContext = useContext(UserContext);

  const [siderCollapsed, setSiderCollapsed] = useState<boolean>(false);

  const onSiderCollapse = useCallback((collapsed: boolean) => {
    setSiderCollapsed(collapsed);
  }, []);

  const goHome = useCallback(() => {
    history.push('/');
  }, [history]);

  const onMenuClick = useCallback((param: ClickParam) => {
    if (param.key === AdminMenuKey.article_management) {
      history.push(`/admin`);
    } else {
      history.push(`/admin/${param.key}`);
    }
  }, [history]);

  const selectedKeysMatch = loc.pathname.match(/^\/admin\/([^/]+?)(?:\/|\?|$)/);
  const selectedKeys: string[] = [];

  if (selectedKeysMatch && selectedKeysMatch[1]) {
    if (selectedKeysMatch[1] === 'article_edit') {
      selectedKeys.push(AdminMenuKey.article_management);
    } else {
      selectedKeys.push(selectedKeysMatch[1]);
    }
  } else {
    selectedKeys.push(AdminMenuKey.article_management);
  }

  if (!userContext.userState || userContext.userState.accessLevel < 6) {
    return (
      <Result
        status="403"
        className="uranus-403"
        title="403"
        subTitle="亲, 您没有权限访问此页面呢..."
        extra={<Button type="primary" href="/">返回首页</Button>}
      />
    );
  }

  return (
    <Layout className="uranus-layout">
      <Sider collapsible collapsed={siderCollapsed} onCollapse={onSiderCollapse}>
        <div className="uranus-admin-logo" onClick={goHome} />
        <Menu theme="dark" defaultSelectedKeys={selectedKeys} mode="inline" onClick={onMenuClick}>
          <Menu.Item key={AdminMenuKey.article_management} icon={<FileProtectOutlined />}>
            文章管理
          </Menu.Item>
          <Menu.Item key={AdminMenuKey.tag_management} icon={<TagOutlined />}>
            标签管理
          </Menu.Item>
          <Menu.Item key={AdminMenuKey.comment_management} icon={<CommentOutlined />}>
            评论管理
          </Menu.Item>
          <Menu.Item key={AdminMenuKey.message_management} icon={<MessageOutlined />}>
            留言管理
          </Menu.Item>
          <Menu.Item key={AdminMenuKey.user_management} icon={<UserOutlined />}>
            用户管理
          </Menu.Item>
          <Menu.Item key={AdminMenuKey.website_management} icon={<GlobalOutlined />}>
            网站管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="uranus-admin-header">
          <UserAvatar isBackend={true} avatarColor="#000" avatarSize={38} />
        </Header>
        <Content className="uranus-admin-content">
          <Switch>
            <Route path={match.path} exact component={ArticleManagement} />
            <Route path={`${match.path}/article_edit/:articleId`} exact component={ArticleEdit} />
            <Route path={`${match.path}/${AdminMenuKey.tag_management}`} exact component={TagManagement} />
            <Route path={`${match.path}/${AdminMenuKey.comment_management}`} exact component={CommentManagement} />
            <Route path={`${match.path}/${AdminMenuKey.message_management}`} exact component={MessageManagement} />
            <Route path={`${match.path}/${AdminMenuKey.user_management}`} exact component={UserManagement} />
            <Route path={`${match.path}/${AdminMenuKey.website_management}`} exact component={WebsiteManagement} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
