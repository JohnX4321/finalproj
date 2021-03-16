import React from "react";
import {Button} from "react-bootstrap";
import axios from "axios";

export default class RegAadhar extends React.Component {

    constructor() {
        super();
        this.state={
            name: '',
            uid: '',
            address: '',
            village: '',
            mobile: '',
            state: ''
        }
    }

    componentDidMount() {
    }

    registerID() {
        axios.post('http://localhost:24555/aadhar/create',{
            uid: this.state.uid,
            name: this.state.name,
            address: this.state.address,
            village: this.state.village,
            mobile: this.state.mobile,
            state: this.state.state
        }).then(()=>console.log("Registered Successfully"))
    }

    render() {
        return (

            <div className="jumbotron-fluid">
                <input type="text" value={this.state.name} placeholder={'Name'} onChange={e=>this.setState({name: e.target.value})}/>
                <input type="text" value={this.state.uid} placeholder={'UID'} onChange={e=>this.setState({uid: e.target.value})}/>
                <textarea value={this.state.address} onChange={e=>this.setState({address: e.target.value})} placeholder={'Address'} />
                <input type="text" value={this.state.village} placeholder={'Village'} onChange={e=>this.setState({village: e.target.value})}/>
                <input type="text" value={this.state.state} placeholder={'State'} onChange={e=>this.setState({state: e.target.value})} />
                <input type="mobile" value={this.state.mobile} placeholder={'Mobile'} onChange={e=>this.setState({mobile: e.target.value})}/>
                <Button type="submit" variant="primary" onClick={()=>this.registerID()} title={"Submit"} />
            </div>

        )
    }

}
