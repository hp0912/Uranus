import { MessageOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, List, message, Modal, Popconfirm, Tag, Tooltip } from 'antd';
import React, { FC, useState } from 'react';
import { format } from 'timeago.js';
import {
  CommentType,
  ICommentEntity,
  IUranusNode,
  IUserEntity,
} from '../../types';
import { formatDate } from '../../utils';
import { CommentEditor } from './CommentEditor';

// 样式
import styles from './comment.module.css';

interface ICommentListProps {
  className?: string;
  commentType: CommentType;
  targetId: string;
  parentId: string;
  user: IUserEntity | null;
  initLoading: boolean;
  replyComment: ICommentEntity | null;
  comments: ICommentEntity[];
  onReplyClick: (comment: ICommentEntity) => void;
  onSubmit: (
    parentId: string,
    comment: { rows: IUranusNode[][] }
  ) => Promise<void>;
  onDelete: (comment: ICommentEntity) => Promise<void>;
  onLoadMore: (params: {
    commentType: CommentType;
    targetId: string;
    parentId: string;
    lastCommentId?: string;
  }) => Promise<ICommentEntity[]>;
}

interface ICommentListState {
  loadMoreLoading: boolean;
  noMore: boolean;
}

export const CommentList: FC<ICommentListProps> = (props) => {
  const {
    className,
    initLoading,
    comments,
    replyComment,
    user,
    onReplyClick,
    onSubmit,
    onDelete,
  } = props;

  const [commListState, setCommListState] = useState<ICommentListState>({
    loadMoreLoading: false,
    noMore: false,
  });

  const onLoadMore = async () => {
    try {
      const { commentType, targetId, parentId } = props;
      const result = await props.onLoadMore({
        commentType,
        targetId,
        parentId,
        lastCommentId: comments.length
          ? comments[comments.length - 1].id!
          : undefined,
      });

      if (result.length === 0) {
        message.warning('没有更多数据了');
        setCommListState({ loadMoreLoading: false, noMore: true });
      } else {
        setCommListState({ loadMoreLoading: false, noMore: false });
      }
    } catch (ex) {
      Modal.error({
        title: '错误',
        content: ex instanceof Error ? ex.message : '未知错误',
      });
      setCommListState({ loadMoreLoading: false, noMore: false });
    }
  };

  const loadMore =
    !initLoading && !commListState.noMore && comments.length > 0 ? (
      <Button
        type="link"
        block
        onClick={onLoadMore}
        loading={commListState.loadMoreLoading}
      >
        加载更多
      </Button>
    ) : null;

  return (
    <div className={`${styles.comment_list} ${className ? className : ''}`}>
      <List
        loading={initLoading}
        itemLayout="horizontal"
        size="default"
        loadMore={loadMore}
        dataSource={comments}
        locale={{ emptyText: '赞无评论' }}
        split={false}
        renderItem={(item) => (
          <List.Item>
            <div className={styles.comment_item}>
              <div className={styles.avatar_box}>
                <div
                  className={styles.avatar}
                  style={{ backgroundImage: `url(${item.userAvatar})` }}
                />
              </div>
              <div
                style={{ flex: '1 1 auto', borderBottom: '1px solid #f1f1f1' }}
              >
                <div className={styles.meta_box}>
                  <span style={{ paddingRight: 10 }}>{item.userNicname}</span>
                  <Tag
                    color={
                      '#' + (4095 - item.userAccessLevel! * 300).toString(16)
                    }
                  >
                    {'Lv' + item.userAccessLevel}
                  </Tag>
                </div>
                <div
                  className={styles.container}
                  style={{ marginTop: 8 }}
                  dangerouslySetInnerHTML={{ __html: item.content! }}
                />
                <div className={styles.reply_stat}>
                  <Tooltip title={formatDate(item.addtime!)}>
                    <time className={styles.time}>
                      {format(item.addtime!, 'zh_CN')}
                    </time>
                  </Tooltip>
                  {user && user.id === item.userId && (
                    <Popconfirm
                      title="确定要删除吗？"
                      okText="确认"
                      cancelText="取消"
                      icon={<QuestionCircleOutlined />}
                      onConfirm={() => {
                        onDelete(item);
                      }}
                    >
                      <span className={styles.delete}>· 删除</span>
                    </Popconfirm>
                  )}
                  {user !== null ? (
                    <div
                      className={styles.action_box}
                      onClick={() => {
                        onReplyClick(item);
                      }}
                    >
                      <MessageOutlined />
                      <span style={{ marginLeft: 6, marginRight: 6 }}>
                        回复
                      </span>
                    </div>
                  ) : (
                    <div className={styles.action_box}>
                      <MessageOutlined />
                      <span style={{ marginLeft: 6 }}>登录后回复</span>
                    </div>
                  )}
                </div>
                {replyComment && replyComment.id === item.id && (
                  <CommentEditor
                    parentId={item.parentId === '0' ? item.id! : item.parentId!}
                    autoFocus
                    avatarVisible={false}
                    user={user}
                    onSubmit={onSubmit}
                  />
                )}
                {item.children && item.children.length > 0 && (
                  <CommentList
                    className={styles.sub_comment_list}
                    commentType={props.commentType}
                    targetId={props.targetId}
                    parentId={item.id!}
                    initLoading={initLoading}
                    comments={item.children}
                    replyComment={replyComment}
                    user={user}
                    onReplyClick={onReplyClick}
                    onSubmit={onSubmit}
                    onDelete={onDelete}
                    onLoadMore={props.onLoadMore}
                  />
                )}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
