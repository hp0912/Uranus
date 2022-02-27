import React, { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Advertisement01 } from '../components/Advertisement/Advertisement01';
import { Advertisement02 } from '../components/Advertisement/Advertisement02';
import { Content } from '../components/Content';
import { UranusAvatar } from '../components/UranusAvatar';
import { UranusMotto } from '../components/UranusMotto';
import { GetServerSideProps } from 'next';
import { wechatGameList } from '../utils/httpClient';
import { Input } from 'antd';
import { baseURL } from '../utils/constant';
import SafariOutlined from '../icons/SafariOutlined';

interface WechatGameList {
  version: number;
  helpList: string;
  game: Array<{
    name: string;
    py: string;
    appId: string;
    bundleId: string;
    pkg: string;
    cls: string;
    help: string;
    icon: string;
  }>;
}

const WechatScan = (props: { gameList: WechatGameList }) => {
  const [games, setGames] = useState(props.gameList.game);
  const [keyword, setKeyword] = useState('');

  const gamesRef = useRef(props.gameList.game);

  useEffect(() => {
    if (keyword) {
      const filterGames = gamesRef.current.filter(
        (game) => game.name.includes(keyword) || game.py.includes(keyword)
      );
      setGames(filterGames);
    } else {
      setGames(props.gameList.game);
    }
  }, [keyword]);

  const onSearch = useCallback((value: string) => {
    setKeyword(value);
  }, []);

  return (
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
        <div
          style={{
            backgroundColor: '#f4f4f4',
            padding: '15px 72px',
            margin: '10px',
            borderRadius: '6px',
          }}
        >
          <Input.Search
            placeholder="请输入游戏名称..."
            onSearch={onSearch}
            enterButton
          />
        </div>
        <div
          style={{
            backgroundColor: '#f4f4f4',
            padding: '5px 32px',
            margin: '16px 10px',
            borderRadius: '6px',
          }}
        >
          <h3>什么是扫码登录游戏 ？</h3>
          <p style={{ marginBottom: 0, fontSize: 13, color: '#444242' }}>
            扫码登录游戏，完美的解决了不上微信也能登录游戏。本站无任何广告，支持苹果、安卓系统，纯净无毒，永久免费，请广大玩家们放心使用。
          </p>
          <br />
          <h4>登录教程</h4>
          <p style={{ marginBottom: 3, fontSize: 13, color: '#444242' }}>
            打开要登录的应用，注销当前登录。
            <br />
            登录页如有用户协议等，需要先勾选协议。
            <br />
            <br />
            上号者：使用任意浏览器(苹果设备只能使用自带的
            <span style={{ color: 'red' }}>Safari</span>
            <SafariOutlined style={{ fontSize: 14 }} />
            浏览器)打开对应的游戏链接(比如
            <a href={`${baseURL}/api/wechat-scan/tencentappcente?key=wzry`}>
              王者荣耀
            </a>
            )，截图二维码，发给号主，然后
            <span style={{ color: 'red' }}> 立即回到浏览器二维码界面 </span>
            等待对方扫码，否则将无法正常跳转游戏！
            <br />
            扫码者：必须使用微信“扫一扫”后置摄像头扫描，授权成功后上号者将自动跳转游戏；不可以长按识别哦！
            <br />
            <span style={{ color: '#ff8f00' }}>
              温馨提示：链接可以直接在微信内打开。
            </span>
          </p>
        </div>
        {games.map((game, index) => {
          return (
            <a
              key={index}
              style={{
                backgroundColor: '#f4f4f4',
                padding: '5px 24px',
                margin: '8px 10px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
              href={`${baseURL}/api/wechat-scan/tencentappcente?key=${game.py}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                style={{ width: 50, height: 50, borderRadius: 10 }}
                src={`https://img.houhoukang.com/uranus/system/games/${game.py}`}
                alt={game.name}
              />
              <span style={{ marginLeft: 8, fontSize: 12 }}>{game.name}</span>
            </a>
          );
        })}
      </Content>
    </>
  );
};

export default WechatScan;

export const getServerSideProps: GetServerSideProps = async () => {
  const resp = await wechatGameList();
  return {
    props: {
      gameList: resp?.data?.data || {},
    },
  };
};
