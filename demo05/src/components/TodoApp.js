import React, { Component } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import '../style/TodoApp.css'
/**
 * 备忘录组件
 */
export default class TodoApp extends Component {

    //构造函数，this.state = {...} 相当与getInitialSate()
    constructor() {
        super();
        //设置初始状态
        this.state = this._loadData()||{
            todos: [], //存储备忘列表
            filter: '全部', //存储当前的过滤字段
            order: 'time' //存储当前的排序字段
        };
    }

    _loadData = ()=>{
        try{
            return JSON.parse(window.localStorage.getItem('todos'));
        } catch(e){
            return null;
        }
    }

    /** 根据数据元素的某个属性对数组进行排序 */
    _sortArryByProp = (arr, prop, reverse = false) => {
        return arr.sort((a, b) => {
            return reverse ? a[prop] > b[prop] : a[prop] < b[prop];
        });
    }

    _saveData = (data)=>{
        try{
            window.localStorage.setItem('todos',JSON.stringify(data));
        } catch(e){

        }
    }

    /*添加备忘录 */
    _handleAdd = (text, date, time) => {
        //setState是异步的，在设置state完成后存储当前的state
        this.setState({
            todos: this.state.todos.concat([{
                color:'#fffff',
                text,
                time:date+' '+time,
                done:false
            }])
        },()=>this._saveData(this.state));
    }

    _handleStateToggle = () => {

    }

    _handleColorChange = () => {

    }

    _handleDelete = () => {

    }

    _handleChangeOrder = ()=>{

    }

    _handleChangeFilter = ()=>{

    }

    render() {
        let filter = this.state.filter;
        let items = this._sortArryByProp(this.state.todos.filter(memo => {
            return filter === '全部' ? true : filter === '已完成' ? memo.done : !memo.done;
        }), this.state.order);
        return (
            <div className='todo-app'>
                <Header onClickAdd={this._handleAdd} onChangeOrder={this._handleChangeOrder}
                    onChangeFilter={this._handleChangeFilter} />
                <TodoList title={filter} items={items} onToggleState={this._handleStateToggle}
                    onChangeColor={this._handleColorChange} onDelete={this._handleDelete} />
            </div>
        );
    }

}