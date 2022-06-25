import React, {Key, memo, useEffect, useState} from 'react';
import {observer} from "mobx-react";
import 'antd/dist/antd.css';


import AddComment from "./components/AddComment";
import {useStore} from "./mobx/rootStore";
import TableUi from "./components/TableUi";
import {List} from "./mobx/store";


function App() {
    const {comment} = useStore()
    const [current, setCurrent] = useState(1)
    const pageSize = 10
    const TableUiProps = {
        comment,
        current,
        pageSize,
        setCurrent
    }
    useEffect(() => {
        comment.getList()
        comment.getListByNumber(0, pageSize)
        setCurrent(1)
    }, [])
    console.log('App更新')
    console.log(current)
    const TA = observer(TableUi)
    return (
        <div className="App">
            <TA {...TableUiProps}/>
            <AddComment current={current} pageSize={pageSize} comment={comment}/>
            {/*<Test comment={comment}/>*/}
        </div>
    );
}


// const Test = function Test() {   //1. 为啥在更新APP页面这个函数也会更新？他不是没有接收任何状态吗？  除非写成memo
//     console.log('Test更新')
//     return (
//         <div>
//             Test
//         </div>
//     )
// }

const Test = memo(function Test({comment}:{comment: List}) {   //2. 但是写成memo后, list更新，Test也不更新
    console.log('Test更新')
    return (
        <div>
            {comment.list.toLocaleString()}
        </div>
    )
})
export default App;


