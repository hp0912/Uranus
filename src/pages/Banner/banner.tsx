import { Avatar } from "antd";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import jinrishici from "../../utils/jinrishici";
import "./banner.css";
import { Gl } from "./canvas";

const avatar = require("../../assets/images/avatar.jpg");
const GlList: Gl[] = [];

export const Banner: FC = (props) => {
  const history = useHistory();

  const canvas = useRef<HTMLCanvasElement>(null);
  const [canvasContext2D, setCanvasContext2D] = useState<CanvasRenderingContext2D>();
  const [scale] = useState(0);
  const [poem, setPoem] = useState('');

  // 随机生成描边颜色
  const gc = useCallback((): string => {
    const s = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += s[Math.ceil(Math.random() * 15)];
    }
    return color;
  }, []);

  const anim = useCallback(() => {
    window.requestAnimationFrame(anim);
    if (canvasContext2D) {
      canvasContext2D.fillStyle = 'rgba(0,0,0,0.1)';
      canvasContext2D.fillRect(0, 0, window.innerWidth, window.innerHeight);
      GlList.forEach((item) => {
        item.draw();
      });
    }
  }, [canvasContext2D]);

  const render = useCallback(() => {
    const x = window.innerWidth;
    const y = window.innerHeight;

    if (canvasContext2D) {
      for (let i = 0; i < Math.floor(x / 2); i++) {
        GlList.push(new Gl(canvasContext2D, x / 2, y / 2, gc(), Math.random() / 300));
      }
      anim();
    }
  }, [canvasContext2D, anim, gc]);

  useEffect(() => {
    const cn = canvas.current;
    if (cn) {
      cn.height = window.innerHeight;
      cn.width = window.innerWidth;
      setCanvasContext2D(cn.getContext('2d') as CanvasRenderingContext2D);
      // 加载完毕生成画布
      render();
    }

  }, [render]);

  useEffect(() => {
    if (!poem) {
      // 加载生成诗词
      jinrishici.load((result) => {
        const { status, data } = result;
        if (status === 'success') {
          setPoem(data.content);
        } else {
          setPoem('吟诗失败');
        }
      }, () => {
        setPoem('吟诗失败');
      });
    }
  }, [poem]);

  // 点击切换至首页
  const toBlogList = useCallback(() => {
    history.push('/frontend');
  }, [history]);

  return (
    <div className="blog_banner">
      <canvas ref={canvas}>你的浏览器不支持canvas，请更换为Chrome打开</canvas>
      <div className="blog_banner_text">
        <p>{poem}</p>
        <div
          className="blog_banner_btn"
          onClick={toBlogList}
        >
          <Avatar size={140} src={avatar} />
        </div>
      </div>
      <div className="blog_banner_circle">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx={window.innerWidth / 2} cy={window.innerHeight / 2} r={scale} fill="#fff" />
        </svg>
      </div>
    </div>
  );
};
