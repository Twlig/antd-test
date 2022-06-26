import React, {Key, memo, useEffect, useState} from 'react';
import {observer} from "mobx-react";
import 'antd/dist/antd.css';


import AddComment from "./components/AddComment";
import {useStore} from "./mobx/rootStore";
import TableUi from "./components/TableUi";
import {List} from "./mobx/store";
import {commentType} from "./types/type";


function App() {
    const {comment} = useStore()
    // const [list, setList] = useState(comment.list)
    const pageSize = 10
    const TableUiProps = {
        comment,
        pageSize
    }
    console.log('App更新')
    const TA = observer(TableUi)
    return (
        <div className="App">
            <TA {...TableUiProps}/>
            <AddComment comment={comment}/>
            {/*<Test comment={comment}/>*/}
            {/*<Input list={list} setList={setList}/>*/}
            {/*{list.toLocaleString()}*/}
        </div>
    );
}


// const Test = observer(function Test({comment}:{comment: List}) {   //1. 为啥在更新APP页面这个函数也会更新？他不是没有接收任何状态吗？
//     console.log('Test更新')
//     return (
//         <div>
//             {comment.length}
//         </div>
//     )
// })


// const Test = ({comment}:{comment: List}) => {
//     console.log('Test更新')
//     return (
//         <div>
//             {comment.length}
//         </div>
//     )
// }

// const Input = function ({list, setList}:{list: commentType[], setList: (a: commentType[]) => void}) {
//     console.log('input更新')
//     const [val, setVal] = useState('')
//     return (
//         <div>
//             <input value={val}  onChange={e => {
//                 setVal(e.target.value)
//                 setList([])
//             }
//             }/>
//             {val}
//         </div>
//     )
// }

//上面两种写法都可以，第一种是通过监听
export default App;


