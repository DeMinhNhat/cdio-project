import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import CheckboxGroup from "./CheckboxGroup/CheckboxGroup";
import Loader from '../components/loader/loader';
import { Checkbox,message, Input, Upload, Button, Icon } from 'antd';

const plainOptions = [
    'Thông tin chung',
    'Mô tả môn học',
    'Mục tiêu môn học',
    'Chuẩn đầu ra môn học',
    'Kế hoạch giảng dạy lý thuyết',
    'Kế hoạch giảng dạy thực hành',
    'Đánh giá',
    'Tài nguyên môn học',
    'Các quy định chung'
];

class ExportFile extends Component {
    state = {
        selectedItem: [],
        loading: -1,
    }
    componentWillMount() {
        plainOptions.forEach((v, i) => {
            this.setState({ [v]: false });
        });
    }
    returnReducer = (pos) => {
        switch (pos) {
            case 1: {
                return this.props.itemLayout1Reducer.previewInfo;
            }
            case 2: {
                return this.props.itemLayout2Reducer.previewInfo;
            }
            case 3: {
                return this.props.itemLayout3Reducer.previewInfo;
            }
            case 4: {
                return this.props.itemLayout4Reducer.previewInfo;
            }
            case 5: {
                return this.props.itemLayout5Reducer.previewInfo;
            }
            case 6: {
                return this.props.itemLayout6Reducer.previewInfo;
            }
            case 7: {
                return this.props.itemLayout7Reducer.previewInfo;
            }
            case 8: {
                return this.props.itemLayout8Reducer.previewInfo;
            }
            case 9: {
                return this.props.itemLayout9Reducer.previewInfo;
            }
            default:
                return null;
        }
    }

    addDataMap = (callback) => {
        if (this.state.selectedItem.length > 0) {
            let data = new Map();
            for (let i = 0; i < plainOptions.length; i++) {
                data.set(plainOptions[i], "");
            }
            for (let j = 0; j < this.state.selectedItem.length; j++) {
                for (let i = 0; i < plainOptions.length; i++) {
                    if (this.state.selectedItem[j] === plainOptions[i]) {
                        let pos = i + 1;
                        data.set(plainOptions[i], JSON.stringify(this.returnReducer(pos)));
                    }
                }
            }

            const obj = {}
            for (let [k, v] of data) {
                if (v != "") {
                    obj[k] = v
                }
            }
            callback(obj);
        }else{
            message.error("Vui lòng chọn ít nhất 1 mục ");
        }

    }
    export = () => {
       
        let self = this;

        this.addDataMap(function (obj) {
            self.setState({ loading: 0 });
            axios.post('/exportfile', { data: JSON.stringify(obj) }).then(res => {
                if (res.data == 1) {
                    self.setState({ loading: 1 });
                }
            })

        })

    }
    handleChange = ({ target: { label, checked } }) => {

        this.setState({ [label]: checked });
        if (checked) { // checked
            this.setState({
                selectedItem: [...this.state.selectedItem, label]
            })
        } else {  // unchecked
            var array = [...this.state.selectedItem]; // make a separate copy of the array
            var index = array.indexOf(label)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({ selectedItem: array });
            }
        }
    }


    onCheckAllChange = (e) => {
        plainOptions.forEach((v, i) => {
            this.setState({ [v]: e.target.checked });
        });
        if (e.target.checked) {
            this.setState({ selectedItem: plainOptions });
        } else {
            this.setState({ selectedItem: [] });
        }
    }

    uploadDir = (file) => {
        console.log(file)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-1" >
                    </div>
                    <div className="col-sm-11" >
                        <br />
                        <h2 style={{ textAlign: "center" }}>XUẤT FILE PDF </h2>
                        <div style={{ marginLeft: "25%" }}>
                            <Checkbox
                                onChange={(e) => { this.onCheckAllChange(e) }}
                            >
                                Chọn tất cả
                                </Checkbox>
                        </div>
                        <div style={{ width: "50%", margin: "0 auto " }}>
                            <CheckboxGroup
                                {...this.state}
                                options={plainOptions}
                                handleChange={this.handleChange} />

                        </div>      
                        <br/>
                        <div style={{ width: "50%", margin: "0 auto " }}>
                            <button onClick={this.export} type="button" class="btn btn-success">Xuất file PDF</button>
                            <br /><br /><br />
                            <Loader loading={this.state.loading} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        itemLayout1Reducer: state.itemLayout1Reducer,
        itemLayout2Reducer: state.itemLayout2Reducer,
        itemLayout3Reducer: state.itemLayout3Reducer,
        itemLayout4Reducer: state.itemLayout4Reducer,
        itemLayout5Reducer: state.itemLayout5Reducer,
        itemLayout6Reducer: state.itemLayout6Reducer,
        itemLayout7Reducer: state.itemLayout7Reducer,
        itemLayout8Reducer: state.itemLayout8Reducer,
        itemLayout9Reducer: state.itemLayout9Reducer
    }
}

export default connect(mapStateToProps, null)(ExportFile);