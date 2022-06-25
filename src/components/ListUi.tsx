import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import {Avatar, Comment, Table, Tooltip} from 'antd';
import moment from 'moment';
import React, { createElement, useState } from 'react';
import 'moment/locale/zh-cn';

import {commentType} from "../types/type";

moment.locale('zh-cn')
function ListUi({record, deleteComment}: {record: commentType, deleteComment :(idx: number)=>void}) {
    // console.log('ListUi更新')
    const [attitude, setAttitude] = useState<number>(record.attitude);
    const like = () => {
        setAttitude((prevState) => {
            const val = prevState === 1 ? 0 : 1
            record.attitude = val
            return val
        })
    };

    const dislike = () => {
        setAttitude((prevState) => {
            const val = prevState === -1 ? 0 : -1
            record.attitude = val
            return val
        })
    };
    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
          <span onClick={like}>
            {createElement(attitude === 1 ? LikeFilled : LikeOutlined)}
              {/*<span className="comment-action">{likes}</span>*/}
          </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
          <span onClick={dislike}>
            {React.createElement(attitude === -1 ? DislikeFilled : DislikeOutlined)}
              {/*<span className="comment-action">{dislikes}</span>*/}
          </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">回复</span>,
        <span onClick={() => {deleteComment(record.id)}} key="comment-basic-delete">删除</span>
    ];

    return (
        <Comment
            actions={actions}
            author={<a>{record.name}</a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt={record.name} />}
            content={
                <p>{record.text}</p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment(record.time).format('lll')}</span>
                </Tooltip>
            }
        />
    )
};

export default ListUi
