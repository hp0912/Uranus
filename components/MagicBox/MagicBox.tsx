import { SketchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Card, Tooltip } from 'antd';
import React, { FC } from 'react';
import { QRCodeGen } from './QRCodeGen';
import { Video2GIF } from './Video2GIF';
import MusicOutlined from '../../icons/MusicOutlined';
import WatermelonOutlined from '../../icons/WatermelonOutlined';
import ExpectOutlined from '../../icons/ExpectOutlined';
import WechatScanOutlined from '../../icons/WechatScanOutlined';

// 样式
import componentStyles from '../components.module.css';
import styles from './magicBox.module.css';

export const MagicBox: FC = () => {
  return (
    <div className={componentStyles.uranus_card}>
      <Card title="更多功能" size="small" extra={<SketchOutlined />}>
        <div className={styles.box_content}>
          <a href="/uranus-music" target="_blank" rel="noopener noreferrer">
            <Tooltip title="腾讯音乐、网易云音乐VIP格式解码">
              <MusicOutlined style={{ fontSize: 36 }} />
            </Tooltip>
          </a>
          <span>
            <QRCodeGen />
          </span>
          <span>
            <Video2GIF />
          </span>
          <span>
            <Link href="/daxigua">
              <Tooltip title="DIY合成大西瓜">
                <WatermelonOutlined style={{ fontSize: 36 }} />
              </Tooltip>
            </Link>
          </span>
          <span>
            <Link href="/wechat-scan">
              <Tooltip title="微信扫码登录">
                <WechatScanOutlined style={{ fontSize: 36 }} />
              </Tooltip>
            </Link>
          </span>
          <span>
            <ExpectOutlined style={{ fontSize: 36 }} />
          </span>
        </div>
      </Card>
    </div>
  );
};
