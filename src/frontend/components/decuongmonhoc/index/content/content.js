import React, { Component } from 'react'
import {MENUITEM} from './../../../../Constant/ActionType';
import ThongTinChung from '../../../../Layout1/thong-tin-chung';
import Home from '../../../trangchu/index/index';
import Layout2 from '../../../../Layout2/Layout2';
import Layout3 from '../../../../Layout3/Layout3';
import Layout4 from '../../../../Layout4/Layout4';
import Layout5 from '../../../../Layout5/Layout5';
import Layout6 from '../../../../Layout6/Layout6';
import Layout9 from '../../../../Layout9/Layout9';
import Layout7 from '../../../../Layout7/Layout7';
import Layout8 from '../../../../Layout8/Layout8';
import ExportFile from '../../../../ExportFIle/ExportFile';
import Page404 from '../../../../NotFound/Page404';
import { Button, Icon} from 'antd';
import { Link } from "react-router-dom";
export default class Content extends Component {
    state = {
        decuong: ["Phương pháp lập trình hướng đối tượng", "Design Pattern"],
        tab2: ["Mạng máy tính", "Kiến trúc phần mềm"]
    }
    addSubject = (type) => {
        switch(type) {
            case "de-cuong-mon-hoc": {
            let index = this.state.decuong.length;
            const data = this.state.decuong.concat(`Subject${index + 1}`);
            this.setState({ decuong: data });
            }
            
            case "tab-2": {
            let index = this.state.tab2.length;
            const data = this.state.tab2.concat(`Subject${index + 1}`);
            this.setState({ tab2: data });
            }

            default: {}
        }
        
    }
    render() {
        let content_layout;
        const decuongSub = this.state.decuong.map((key, id) => 
        {
            return <div key={key}><Link to={`de-cuong-mon-hoc/${key}/thong-tin-chung`}>
            <Button style={{width: "100%"}}><Icon type="book" />{this.state.decuong[id]}</Button>
        </Link>
        <div style={{height: "20px"}} /></div>
        }
    )
    const tab2Sub = this.state.tab2.map((key, id) => 
        {
            return <div key={key}><Link to={`tab-2/${key}/thong-tin-chung`}>
            <Button style={{width: "100%"}}><Icon type="book" />{this.state.tab2[id]}</Button>
        </Link>
        <div style={{height: "20px"}} /></div>
        }
    )
        switch (this.props.content_type) {
            case MENUITEM.THONG_TIN_CHUNG: {
                return content_layout = (
                    <React.Fragment>
                        <ThongTinChung />
                    </React.Fragment>
                );
            }
            case MENUITEM.MO_TA_MON_HOC: {
                return content_layout = (
                    <React.Fragment>
                        <Layout2 />
                    </React.Fragment>
                );
            } 
            case MENUITEM.MUC_TIEU_MON_HOC: {
                return content_layout = (
                    <React.Fragment>
                        <Layout3 />
                    </React.Fragment>
                );
            } 
            case MENUITEM.CHUAN_DAU_RA: {
                return content_layout = (
                    <React.Fragment>
                        <Layout4 />
                    </React.Fragment>
                );
            }   
            case MENUITEM.GIANG_DAY_LY_THUYET: {
                return content_layout = (
                    <React.Fragment>
                        <Layout5 />
                    </React.Fragment>
                );
            }   
            case MENUITEM.GIANG_DAY_THUC_HANH: {
                return content_layout = (
                    <React.Fragment>
                        <Layout6/>
                    </React.Fragment>
                );
            }             
            case MENUITEM.DANH_GIA:{
                return content_layout = (
                    <React.Fragment>
                        <Layout7/>
                    </React.Fragment>
                )
            }   
            case MENUITEM.TAI_NGUYEN_MON_HOC: {
                return content_layout = (
                    <React.Fragment>
                        <Layout8/>
                    </React.Fragment>
                );
            }
            case MENUITEM.QUY_DINH_CHUNG: {
                return content_layout = (
                    <React.Fragment>
                    <Layout9/>
                    </React.Fragment>
                    );
            }

            case MENUITEM.XUAT_FILE_PDF:{
                return content_layout = (
                    <React.Fragment>
                        <ExportFile/>
                    </React.Fragment>
                );
            }

            case "de-cuong-mon-hoc":{
                return content_layout = (
                    <React.Fragment>
                        {decuongSub}
                        <Button onClick={() => this.addSubject(this.props.content_type)} style={{width: "100%"}}><Icon type="plus" />New</Button>
                    </React.Fragment>
                );
            }

            case "tab-2":{
                return content_layout = (
                    <React.Fragment>
                        {tab2Sub}
                        <Button onClick={() => this.addSubject(this.props.content_type)} style={{width: "100%"}}><Icon type="plus" />New</Button>
                    </React.Fragment>
                );
            }
            default: {
                content_layout = (
                    <React.Fragment>
                        <Page404/>
                    </React.Fragment>
                );
            }
        }

        return (
            <React.Fragment>
                {content_layout}
            </React.Fragment>
        )
    }
}
