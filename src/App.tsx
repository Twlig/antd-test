import React, {useEffect, useState} from 'react';
import {Button, PaginationProps, Space, Table, Tag} from "antd";
import {observer} from "mobx-react";
import {ColumnsType} from "antd/lib/table";
import 'antd/dist/antd.css';

import {commentType} from "./types/type";
import List from "./components/List";
import AddComment from "./components/AddComment";
import {useStore} from "./mobx/rootStore";
import Page from "./components/page";
import {TableRowSelection} from "antd/lib/table/interface";

import store from "./mobx/store";


// export const dataSource: commentType[] = [  //数据项一定要有一个key的字段，不然会报错。估计是默认会以key字段做每一行的key标识
//     {
//         key: 1,
//         name: '胡彦斌',
//         text: '西湖区湖底公园1号',
//         time: '2020-09-10 08:10:45',
//         attitude: 0
//     },
//     {
//         key: 2,
//         name: '吴彦祖',
//         text: 'nice',
//         time: '2020-09-10 08:40:45',
//         attitude: 1
//     },
// ];

function ListContainer({record} : {record: commentType}) {
    const {comment} = useStore()
    const deleteItem = () => {
        comment.deleteComment(record.id)
    }
    return <List deleteItem={deleteItem} record={record} />
}

const columns: ColumnsType<commentType> = [
    {
        title: '评论展示',
        key: 'action',
        render: (_, record) => {
            return <ListContainer record={record}/>
        }
        // render: (_, record) => {
        //     const {comment} = useStore()
        //     const deleteItem = () => {
        //         comment.deleteComment(record.id)
        //     }
        //     return <List deleteItem={deleteItem} record={record} />
        // }
    }
];



function App() {
    const {comment} = useStore()
    let pageSize = 10
    const [current, setCurrent] = useState(1)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    useEffect(() => {
        store.getList()
        // comment.getList()
        // comment.getListByNumber(0, pageSize)
        setCurrent(1)
    }, [])
    //还存在一个问题，就算是在Table上监听，this.list增加新数据，也不会触发视图更新
    const TA = observer(()=>{
        // const list = [...store.list]
        let list = [...comment.listPage]

        const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
            // console.log('selectedRowKeys changed: ', selectedRowKeys);
            setSelectedRowKeys(newSelectedRowKeys);
        };
        const onChange: PaginationProps['onChange'] = page => {
            comment.getListByNumber(pageSize*(page - 1), pageSize*page)
            list = [...comment.listPage]
            // console.log(list)
            setCurrent(page);
        };
        const rowSelection: TableRowSelection<commentType> = {
            selectedRowKeys,
            onChange: onSelectChange,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                Table.SELECTION_NONE,
                {
                    key: 'odd',
                    text: 'Select Odd Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        });
                        setSelectedRowKeys(newSelectedRowKeys);
                    },
                },
                {
                    key: 'even',
                    text: 'Select Even Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        });
                        setSelectedRowKeys(newSelectedRowKeys);
                    },
                },
            ],
        };
        function deletePatch() {
            // comment.deleteCommentPatch([...])
            comment.deleteCommentPatch(Array.from(selectedRowKeys.values()))
            setTimeout(() => {
                comment.getListByNumber(pageSize*(current - 1), pageSize*current)
                console.log('delete-----------------------')
                console.log(comment.listPage)
                list = [...comment.listPage]
            }, 1000)
            // console.log(Array.from(selectedRowKeys.values()))
        }
        return (
            <div>
                <Button onClick={deletePatch}>删除</Button>
                <Table rowSelection={rowSelection} pagination={{defaultCurrent: 1, pageSize, total: comment.length, current, onChange}} dataSource={store.list} columns={columns} />
            </div>
        )

        //感觉后面不更新是因为Table中使用的数据是
    }) //要监听整个App才能有效，如果是监听List组件则不更新

    return (
        <div className="App">
            <TA />
            {/*<Table dataSource={store.list} columns={columns} />*/}
            <AddComment />
            {/*<Page />*/}
        </div>
    );
}

function Test({val} : {val: commentType}) {
    return (
        <li>{val.text}</li>
    )
}
export default App;


