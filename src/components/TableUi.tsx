import React, {Key, useEffect, useState} from "react";
import {Button, PaginationProps, Select, Table} from "antd";
import {TableRowSelection} from "antd/lib/table/interface";
import {commentType} from "../types/type";
import {ColumnsType} from "antd/lib/table";
import ListUi from "./ListUi";
import {List} from "../mobx/store";

const { Option } = Select;

type TableUiProps = {
    comment: List,
    // listPage: commentType[], //使用这种方式会导致值不更新，listPage指向原本的引用地址数据没变。而更新数据是开辟新的对象。
    pageSize: number
}

export default function TableUi({comment, pageSize} : TableUiProps) {
    console.log('table更新')
    console.log('len' + comment.length)
    const {deleteComment, getListByNumber, deleteCommentPatch, getListByName, getList} = comment
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [current, setCurrent] = useState(1)
    useEffect(() => {
        console.log('eeffccc')
        Promise.resolve().then(getList).then(
            () => getListByNumber(0, pageSize)
        )
        setCurrent(1)
    }, [])
    const columns: ColumnsType<commentType> = [
        {
            title: '评论展示',
            key: 'action',
            render: (_, record) => {
                return <ListUi deleteComment={deleteComment} record={record} />
            }
        }
    ]
    // console.log(comment.listPage)
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const onChange: PaginationProps['onChange'] = page => {
        getListByNumber(pageSize*(page - 1), pageSize*page)
        setCurrent(page);
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        Promise.resolve().then(() => getListByName(value))
            .then(() => {
                comment.listPage = comment.list.slice(0, comment.length)
            })
    };
    const rowSelection: TableRowSelection<commentType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE
        ],
    };
    function deletePatch() {
        deleteCommentPatch(Array.from(selectedRowKeys.values()))
        setTimeout(() => {
            getListByNumber(pageSize*(current - 1), pageSize*current)
        }, 1000)
    }
    return (
        <div>
            <Button onClick={deletePatch}>删除</Button>
            <Select style={{ width: 120 }} onChange={handleChange}>
                <Option value='ZZY'>ZZY</Option>
                <Option value='小王'>小王</Option>
                <Option value='小李'>小李</Option>
            </Select>
            <div>{'长度为' + comment.length}</div>
            <Table rowSelection={rowSelection} pagination={{defaultCurrent: 1, pageSize, total: comment.length, current, onChange}} dataSource={comment.listPage} columns={columns} />
        </div>
    )
}