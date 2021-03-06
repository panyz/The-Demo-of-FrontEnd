import React, { Component } from 'react';
import Memo from './Memo';
import '../style/TodoList.css';

/**
 * 备忘列表组件
 */
export default class TodoList extends Component {


    render() {
        let todolist = this.props.items.map(memo=>(
            <Memo key={1} memo={memo} onToggleState={this.props.onToggleState}
                onChangeColor={this.props.onChangeColor} onDelete={this.props.onDelete} />
        ));
        return (
            <div className='todo-list-wrapper'>
                <div>{this.props.title}</div>
                <div className='todo-list'>{todolist}</div>
            </div>
        );
    }
}