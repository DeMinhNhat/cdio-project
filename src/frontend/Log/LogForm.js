import React, { Component } from "react";
import "./1.css"
import { Comment, Tooltip, List, Avatar } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
import { IS_LOAD_LOG } from "../Constant/ActionType"
import {convertTime} from "../utils/Time"

const ExampleComment = ({ children, content, timestamp, nguoi_gui }) => (
    <Comment 
        actions={[<span>Reply to</span>]}
        author={<a>{nguoi_gui}</a>}
        datetime={timestamp ? <b style={{color: "red"}}>{convertTime(timestamp)}</b>: ""}
        avatar={(
            <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
            />
        )}
        content={<p>{content}</p>}
    >
        {children}
    </Comment>
);

  
const log = [
    {
        key:1,
        id: 1,
        logContent : "log1",
    },
    {
        key:2,
        id: 2,
        logContent : "log2",
    }
]

const comment = [
    {
        key:1,
        id : 1,
        log_id : 1,
        content : "comment1",
    },
]

class LogForm extends Component {

    constructor (props) {
        super(props)
        this.state = {
            logData: [],
            contentTab: ""
        }
    }

    async componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        
        this.setState({contentTab: nextProps.logReducer.contentTab})   
        let data = await this.getData(nextProps.logReducer.contentTab);
        this.setState({logData: data})       
    }

    async getData(contentTab) {        
        let data = {
            subjectid: this.props.subjectid,
            contentTab: contentTab
        }              
        return axios.post(`/get-log`, {data}).then(res => {
            return res.data
        })
    }

    // async componentDidMount() {
              
    //     // this.props.setFlag(true);   
        
    // }

    render() {
        this.state.logData.sort((a,b) => {
            return b.thoi_gian - a.thoi_gian
        })        
        let LogComment = this.state.logData.map((itemparent, ich) => {
            let con = comment.map((itemchilren, ic) => {
                if(itemchilren.log_id === itemparent.id){
                    return  <ExampleComment content={itemchilren.content}/>;
                }else return;
                }) 
                    return <ExampleComment children={con} 
                        content={itemparent.noi_dung} timestamp={itemparent.thoi_gian}
                        nguoi_gui={itemparent.nguoi_gui}/>
                })
        return (
            <div className="container1">
                <div className="center-col">
                {LogComment}
                    
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    subjectid: state.subjectid,
    logReducer: state.logReducer
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // setFlag: (idLoaded) => {
    //     dispatch({ type: IS_LOAD_LOG, idLoaded });         
    //   },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogForm);