import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

const Page = () => {
    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default Page;