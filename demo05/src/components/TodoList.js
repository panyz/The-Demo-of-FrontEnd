import React, { Component } from 'react';
import Memo from './Memo';

/**
 * 备忘列表组件
 */
export default class TodoList extends Component {

    // _handleMemo = (memo)=>{
    //     return <Memo memo={memo} onToggleState={this.props.onToggleState}
    //      onChangeColor={this.onChangeColor} onDelete={this.props.onDelete} />
    // }

    render() {
        let todolist = this.props.items.map(memo=>(
            <Memo memo={memo} onToggleState={this.props.onToggleState}
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