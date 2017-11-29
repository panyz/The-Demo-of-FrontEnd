import React,{Component} from 'react';
import '../style/Memo.css';
/**
 * 备忘事项组件
 */
export default class Memo extends Component{

    _handleCheckboxChange = (memo)=>{
        this.props.onToggleState(memo)
    }

    _handleColorChange = (memo,e)=>{
        this.props.onChangeColor(memo,e.target.value)
    }

    _handleDelete = (memo)=>{
        this.props.onDelete(memo)
    }

    render(){
        let memo = this.props.memo;
        let classNames = 'todo-item' + (memo.done ? 'done' : '');
        return(
            <div className={classNames}>
                <input type='checkbox' checked={memo.done} onChange={this._handleCheckboxChange(memo)}/>
                <input className='color' type='color' value={memo.color} onChange={this._handleColorChange(memo)} />
                <span className='text'>{memo.text}</span>
                <span className='pull-right del' onClick={this._handleDelete(memo)}>X</span>
                <a className='pull-right'>{new Date(memo.time).toLocaleString()}</a>
            </div>
        );
    }
}