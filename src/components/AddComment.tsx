import { Avatar, Button, Comment, Form, Input } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

import {useStore} from "../mobx/rootStore";
import {List} from "../mobx/store";


const { TextArea } = Input;

interface EditorProps {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}


const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

function AddComment ({current, pageSize, comment} : {current: number, pageSize: number, comment: List}) {
    // console.log('ADDUi更新')
    const {addComment} = comment
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        if (!value) return;
        setSubmitting(false);
        setTimeout(() => {
            setSubmitting(false);
            setValue('');
            addComment({
                name: 'ZZY',
                text: value,
                time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }, pageSize*(current - 1), pageSize*current)
        }, 1000);
        // comment.addComment({
        //     name: '小林',
        //     text: value,
        //     time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        // })
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    return (
        <>
            <Comment
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="ZZY" />}
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
        </>
    );
};


export default AddComment;