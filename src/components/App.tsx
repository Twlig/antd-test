import React from 'react';
import {Space, Table, Tag} from "antd";

import 'antd/dist/antd.css';

import '../App.css';
import {ColumnsType} from "antd/lib/table";


//key一样哎。
interface dataType {
  key: string,
  name: string,
  age: number,
  address: string,
  tags: string[]
}

const dataSource: dataType[] = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
    tags: ['nice']
  },
];

const columns: ColumnsType<dataType> = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    render: (_, {tags}) => (
        <>
          {
            tags.map(tag => <Tag key={tag}>{tag}</Tag>)
          }
        </>
    )
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>delete</a>
        </Space>
    )
  }
];

function App() {
  return (
    <div className="App">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default App;


