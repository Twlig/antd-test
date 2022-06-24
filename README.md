# A Comment page base on antd + react + mobx

`List` and `AddComment` are the two main components.  `class List` is set of states, computed and actions `makeAutoObservable`  by mobx. `type.ts` declare data types.  `data.json` is the service port data create by server-json.



## List

`ListUi`  is a pure view component,  `ListContainer`  is a container component, which define some props and action for `ListUi` and `ListUi` can get them by props. They need get states and action from mobx store. Also, we need `observer`  these components for view update.



## AddComment

A simple component that doesn't need to be observed, just calls the mobx store action.



## Table

Because of using Table component from antd, we need to observe the whole Table. Although the function is implemented, the logic is temporarily confused and needs to be refactored.



## data.json

run this command for server

`json-server ./data.json --port 8080`