import React, { Component } from 'react';
import '../style/Memo.css';
/**
 * 备忘事项组件
 */
export default class Memo extends Component {

    render() {
        let memo = this.props.memo;
        let classNames = 'todo-item' + (memo.done ? ' done' : '');
        return (
            <div className={classNames}>
                <input type='checkbox' checked={memo.done} onChange={() => this.props.onToggleState(memo)} />
                <input className='color' type='color' value={memo.color} onChange={(e) => this.props.onChangeColor(memo, e.target.value)} />
                <span className='text'>{memo.text}</span>
                <span className='pull-right del' onClick={() => this.props.onDelete(memo)}>X</span>
                <a className='pull-right'>{new Date(memo.time).toLocaleString()}</a>
            </div>
        );
    }
}