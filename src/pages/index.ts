import React from "react";
import AboutUs from "./AboutUs";
import { ArticleDetailPage } from "./ArticleDetail";
import { ArticleListPage } from "./ArticleList";
import Banner from "./Banner";
import MessageBoard from "./MessageBoard";

export default {
  Home: Banner,
  ArticleList: ArticleListPage,
  ArticleDetail: ArticleDetailPage,
  MessageBoard: React.lazy<typeof MessageBoard>(() => import('./MessageBoard')),
  AboutUs: React.lazy<typeof AboutUs>(() => import('./AboutUs')),
};