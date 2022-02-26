import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Advertisement01 } from '../components/Advertisement/Advertisement01';
import { Advertisement02 } from '../components/Advertisement/Advertisement02';
import { Content } from '../components/Content';
import { UranusAvatar } from '../components/UranusAvatar';
import { UranusMotto } from '../components/UranusMotto';
import { PageLoading } from '../components/PageLoading';

const WatermelonWithNoSSR = dynamic(() => import('../components/Watermelon'), {
  ssr: false,
  loading: ({ isLoading }) => {
    if (isLoading) {
      return <PageLoading />;
    }
    return null;
  },
});

const WechatScan = () => (
  <>
    <Head>
      <title>腾讯游戏扫码登录</title>
      <meta
        name="keywords"
        content="微信扫码，扫码登录，微信登录，王者荣耀微信扫码登录,天涯明月刀微信扫码登录,使命召唤扫码登录,和平精英微信扫码登录,街霸：对决微信扫码登录,剑侠情缘2：剑歌行微信扫码登录,一人之下微信扫码登录,鸿图之下微信扫码登录,荒野乱斗微信扫码登录"
      />
      <meta name="description" property="og:description" content="自动登录" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
    </Head>
    <Content
      left={
        <>
          <UranusAvatar />
          <Advertisement01 />
        </>
      }
      right={
        <>
          <UranusMotto />
          <Advertisement02 />
        </>
      }
    >
      <WatermelonWithNoSSR />
    </Content>
  </>
);

export default WechatScan;
