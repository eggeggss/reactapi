import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useState,useEffect } from 'react';
import TodoList from './todoList';

const MySwal = withReactContent(Swal)

let rawData = [{ id: 1, item: "把冰箱發霉的檸檬拿去丟", isdone: false, }, { id: 2, item: "打電話叫媽媽匯款給我", isdone: false, },
{ id: 3, item: "整理電腦資料夾", isdone: false, }, { id: 4, item: "繳電費水費瓦斯費", isdone: false, },
{ id: 5, item: "約vicky禮拜三泡溫泉", isdone: false, }, { id: 6, item: "約ada禮拜四吃晚餐", isdone: false, }];

const tabs = [{ id: 1, item: "全部", className: "active", }, { id: 2, item: "待完成", className: "", },
{ id: 3, item: "已完成", className: "", }];


const Main = () => {

    const [mytabs, settabs] = useState(tabs);
    const [todolist, setTodoList] = useState(rawData);
    const [undocount, setUndocount] = useState(0);
    const [currentinput, setCurrentInput] = useState("");

    //tab切換時更新Todolist
    useEffect(() => {

        watchData();

    }, [mytabs])

    //取得完成清單
    let getCompleteList = () => {

        let newlistcomplete = rawData.filter((item, idx) => {
            if (item.isdone === true) {
                return true;
            }
        })
        return newlistcomplete;
    }

    //取得未完成清單
    let getUndoList = () => {

        let undolistcomplete = rawData.filter((item, idx) => {
            if (item.isdone === false) {
                return true;
            }
        })
        return undolistcomplete;
    }

    //刷新畫面
    let watchData = () => {

        //取得目前是切換到哪個tab
        let tab = mytabs.find((item, idx) => {
            if (item.className === "active") {
                return true;
            }
        })

        //更新待完成項目的數字
        let undolist = getUndoList();
        setUndocount(undolist.length);

        switch (tab.item) {
            case '全部':
                setTodoList(rawData);
                break;
            case '待完成':
                setTodoList(undolist);
                break;
            case '已完成':
                let completelist = getCompleteList();
                setTodoList(completelist);
                break;
            default:
        }

    }

    //click checkbox
    const checkDoneItem = (id) => {

        let clone = [...todolist];
        let newitems = clone.map((item1, index) => {
            if (item1.id === id) {
                item1.isdone = !item1.isdone;
            }
            return item1;
        })

        setTodoList(newitems);

        let tab = mytabs.find((item, idx) => {
            if (item.className === "active") {
                return true;
            }
        })

        //更新待完成項目的數字
        let undolist = getUndoList();
        setUndocount(undolist.length);
        //setCompletecount(completelist.length);

        if (tab.item === "已完成") {
            let completelist = getCompleteList();
            setTodoList(completelist);

        } else if (tab.item === "待完成") {
            setTodoList(undolist);
        }

    }

    //click delete item
    const deleteItem = (id, name) => {

        let message = `刪除 ${name}`;
        MySwal.fire({
            title: 'Are you sure?',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                let clonetodolist = [...todolist];
                let newlist = clonetodolist.filter((item, idx) => {
                    if (item.id != id) {
                        return item;
                    }
                })

                for (var i = 0; i < rawData.length; i++) {
                    if (rawData[i].id == id) {
                        rawData.splice(i, 1);
                        break;
                    }
                }

                setTodoList(newlist);

                //更新待完成項目的數字
                let undolist = getUndoList();
                setUndocount(undolist.length);
            }
        })
    }

    //清除完成清單
    const deleteALLComplete = () => {

        rawData.forEach((item, index) => {
            item.isdone = false;
        })

        let tab = mytabs.find((item, idx) => {
            if (item.className === "active") {
                return true;
            }
        })

        //更新待完成項目的數字
        let undolist = getUndoList();
        setUndocount(undolist.length);
        //setCompletecount(completelist.length);

        switch (tab.item) {
            case '全部':
                setTodoList(rawData);
                break;
            case '待完成':
                setTodoList(undolist);
                break;
            case '已完成':
                let completelist = getCompleteList();
                setTodoList(completelist);
                break;
            default:
        }
    }

    const changeCurrentInput = (e) => {
        let input = e.target.value;
        setCurrentInput(input);
    }

    const keydown = (e) => {

        if (e.key === 'Enter') {

            //trigger + click
            addNewItem();

        }
    }

    const addNewItem = () => {

        if (currentinput.trim() == '') {
            MySwal.fire('請輸入待辦事項');
            return;
        }
        let maxid = rawData.length + 1;

        rawData.push({
            id: maxid,
            item: currentinput,
            isdone: false,
        })

        //更新畫面
        watchData();

        //清空input
        setCurrentInput('');

    }

    return (
        <div id="todoListPage" className="bg-half">
            <nav>
                <h1>
                    
                    <a href="#">ONLINE TODO LIST</a>
                
                </h1>
                <ul>
                    <li className="todo_sm">
                        
                        <a href="#">
                            
                            <span>王小明的代辦</span>
                        
                        </a>
                    
                    </li>
                    <li>
                        
                        <a href="#loginPage">登出</a>
                    
                    </li>
                </ul>
            </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <div className="inputBox">
                        <input type="text" placeholder="請輸入待辦事項"
                            value={currentinput}
                            onChange={changeCurrentInput}
                            onKeyPress={keydown}/>
                        <a href="#" onClick={addNewItem}>
                            <i className="fa fa-plus"></i>
                        </a>
                    </div>
                    <div className="todoList_list">
                        <ul className="todoList_tab">
                            {mytabs.map((item, idx) => {
                                return (
                                    <li key={idx}>
                                        <a
                                            href="#"
                                            onClick={() => {
                                                let newitem = mytabs.filter((child, idx) => {
                                                    if (item.id != child.id) {
                                                        child.className = "";
                                                    } else {
                                                        child.className = "active";
                                                    }
                                                    return child;
                                                });

                                                settabs(newitem);

                                            }}
                                            className={item.className}>{item.item}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>

                        <TodoList todolist={todolist}
                            undocount={undocount}
                            checkDoneItem={checkDoneItem}
                            deleteItem={deleteItem}
                            deleteALLComplete={deleteALLComplete}
                            getCompleteList={getCompleteList}
                            mytabs={mytabs}
                        />
                    </div>
                </div>
            </div>
            <h1>todopage</h1>
        </div>
    );
};

export default Main;