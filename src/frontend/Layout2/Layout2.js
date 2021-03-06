import React, { Component } from 'react';
import FormMoTa from './Component/Main/FormMoTa';
import { Tooltip, Button } from 'antd';
import TableItem from './Component/Table/TableItem';
import LogForm from '../Log/LogForm';

class Layout2 extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-1" >
                    </div>
                    <div className="col-sm-11" >
                        <br />
                        <h1 style={{textAlign: "center"}}>MÔ TẢ MÔN HỌC</h1>
                        {this.props.isReview === true ? null : <FormMoTa />}
                        <br />
                        <Tooltip placement="topLeft" >
                            <Button style={{color: "red", margin: "auto", width: "100%"}}>(Hướng dẫn: một đoạn văn mô tả tóm tắt về nội dung của môn học)</Button>
                        </Tooltip>
                        <TableItem isReview={this.props.isReview}/>
                        <br/>
                        <br/>
                        <LogForm/>
                    
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}
export default Layout2;