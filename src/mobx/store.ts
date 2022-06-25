import {makeAutoObservable, runInAction} from "mobx";
import axios from "axios";
import {CommentItem, commentType} from "../types/type";
import {createContext, Key, useContext} from "react"
const request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000
})

export class List {
    constructor() {
        // this.list = []   ?为什么在这里申明会报错
        makeAutoObservable(this, {}, {autoBind: true})
    }
    list = [] as commentType[]
    listPage = [] as commentType[]
    get length() {
        console.log('list length' + this.list.length)
        return this.list.length
    }
    async getList() {
        await request.get('/list').then(res => {
            runInAction(()=>{
                console.log('lisssssssssssssssssssst')
                this.list = res.data
            })
        }, err => {
            console.log(err)
        })
    }
    async getListByNumber(start: number, end: number) {
        console.log('sliceccccccccccccccc')
        await request.get('/list').then(res => {
            runInAction(()=>{
                this.listPage = res.data.slice(start, end)
            })
        }, err => {
            console.log(err)
        })
    }
    async addComment(item: CommentItem, start?: number, end?: number) {
        const newObj = {
            id: this.list.length + 1,
            key: this.list.length + 1,
            name: item.name,
            text: item.text,
            time: item.time,
            attitude: 0
        }
        await request.post('/list', newObj).then(()=> {
            this.getList()
            if(start !== undefined && end !== undefined) {
                this.getListByNumber(start, end)
            }
        }).catch(console.error)
    }
    async deleteComment(id: number) {
        console.log('原本的数据长度' + this.length)
        await request.delete('/list/' + id).then(this.getList).catch(console.error)
        console.log('删除成功')
    }
    async deleteCommentPatch(ids: Key[]) {
        await ids.forEach(id => {
            request.delete('/list/' + id).then(res => {
                runInAction(() => {
                    this.list = this.list.filter(item => item.id !== id)
                })
                console.log(this.list.length)
            }, err => {
                console.log(err)
            })
        })
    }
}
const list = new List()
export default list
// class RootStore {
//     list = list
// }
// const store = new RootStore()
// const context = createContext(store)
// export default useContext(context)