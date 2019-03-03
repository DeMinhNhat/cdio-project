import React, { Component } from 'react';
import { Button, Checkbox } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

import CheckboxGroup from "./CheckboxGroup/CheckboxGroup";

const plainOptions = [
    'Thông tin chung',
    'Mô tả môn học',
    'Mục tiêu môn học',
    'Chuẩn đầu ra môn học',
    'Kế hoạch giảng dạy lý thuyết',
    'Kế hoạch giảng dạy thực hành',
    'Đánh giá ',
    'Tài nguyên môn học',
    'Các quy định chung',
];

class ExportFile extends Component {
    state = {
        indeterminate: true,
        checkAll: false,
        selectedItem: []
    }
    returnReducer = (pos) => {
        switch (pos) {
            case 2: {
                return this.props.itemLayout2Reducer.description;
            }
            case 3: {
                return this.props.itemLayout3Reducer.previewInfo;
            }
            case 5: {
                return this.props.itemLayout5Reducer.previewInfo;
            }
        }
    }
    addDataMap = (callback) => {
        let data = new Map();
        for (let j = 0; j < this.state.selectedItem.length; j++) {
            for (let i = 0; i < plainOptions.length; i++) {
                if (this.state.selectedItem[j] === plainOptions[i]) {
                    let pos = i + 1;
                    data.set(plainOptions[i], JSON.stringify(this.returnReducer(pos)));
                }
            }
        }
        callback(data);
    }
    export = () => {

        this.addDataMap(function (data) {
            
            console.log(data);
            axios.post('/exportfile', { data: data }).then(res => {
                console.log(res);
            })
            
        })

    }
    handleChange = ({ target: { label, checked } }) => {
        this.setState({ [label]: checked });
        var newArray = this.state.selectedItem.slice();
        newArray.push(label);
        this.setState({ selectedItem: newArray })
    }


    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-1" >
                    </div>
                    <div className="col-sm-11" >
                        <br />
                        <h2 style={{ textAlign: "center" }}>DANH SÁCH KẾ HOẠCH GIẢNG DẠY LÝ THUYẾT</h2>
                        <div style={{ width: "50%", margin: "0 auto " }}>
                            <CheckboxGroup
                                {...this.state}
                                options={plainOptions}
                                handleChange={this.handleChange} />
                            {/* <Checkbox
                                indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange}
                                checked={this.state.checkAll}
                            >
                                Check all
                            </Checkbox> */}
                        </div>
                        <br />
                        <div style={{ width: "50%", margin: "0 auto " }}>
                            <button onClick={this.export} type="button" class="btn btn-success">Success</button>
                        </div>
                    </div>
                </div>
            </div>



        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        itemLayout2Reducer: state.itemLayout2Reducer,
        itemLayout3Reducer: state.itemLayout3Reducer,
        itiemLayout5Reducer: state.itemLayout5Reducer
    }
}

export default connect(mapStateToProps, null)(ExportFile);