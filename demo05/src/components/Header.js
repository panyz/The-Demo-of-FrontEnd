import React, { Component } from 'react';
import '../style/Header.css';

/**
 * 头部组件，包含新建备忘及排序和过滤功能
 */
export default class Header extends Component {

    /*构造函数，初始化state */
    constructor() {
        super();
        this.state = this._getInitialValues();
    }

    /*当日期、时间单位字符串长度为1位时，前面补充0 */
    _fillZero = (str) => {
        return ('' + str).length === 1 ? '0' + str : str;
    }

    /*获取输入项的默认值 */
    _getInitialValues = () => {
        let now = new Date();
        let dateStr = now.getFullYear() + "-" + this._fillZero(now.getMonth() + 1) + "-" + this._fillZero(now.getDate());
        let timeStr = this._fillZero(now.getHours()) + ":" + this._fillZero(now.getMinutes());
        return {
            value: '',
            date: dateStr,
            time: timeStr
        };
    }

    /*点击添加时的处理函数 */
    _handleAdd = ()=>{
        this.props.onClickAdd(this.state.value,this.state.date,this.state.time);
        this.setState(this.getInitialValues);
    }

    /*备忘录内容变更时的处理函数 */
    _handleTextChange = (e)=>{
        this.setState({
            value: e.target.value
        });
    }

    /*备忘录日期变更时的处理函数 */
    _handleDateChange = (e)=>{
        this.setState({
            date: e.target.value
        });
    }

    /*备忘录时间变更时的处理函数 */
    _handleTimeChange = (e)=>{
        this.setState({
            time: e.target.value
        });
    }

    render() {
        return (
            <div className='header'>
                <h3 className='title'>备忘录</h3>
                <button type='button' disabled={!this.state.value} onClick={this._handleAdd}>添加</button>

                <div className='input-wrapper'>
                    <input value={this.state.value} placeholder="备忘录内容" onChange={this._handleTextChange} />
                    <input className='date' type='date' value={this.state.date} onChange={this._handleDateChange} />
                    <input className='time' type='time' value={this.state.time} onChange={this._handleTimeChange} />
                </div>

                <div className='bar'>
                    <strong>排序</strong>
                    <span onClick={()=>this.props.onChangeOrder('color')}>颜色</span>
                    <span onClick={()=>this.props.onChangeOrder('time')}>时间</span>
                    <strong style={{marginLeft:20}}>过滤</strong>
                    <span onClick={()=>this.props.onChangeFilter('全部')}>全部</span>
                    <span onClick={()=>this.props.onChangeFilter('待做')}>待做</span>
                    <span onClick={()=>this.props.onChangeFilter('已完成')}>已完成</span>
                </div>

            </div>
        );
    }
}