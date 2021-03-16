import React from "react";
import axios from "axios";
import {Button} from "react-bootstrap";


export default class CreateScheme extends React.Component {


    constructor() {
        super();
        this.state={
            title: "",
            category: "",
            description: "",
            deadline: "",
            department: "",
            doc: "",
            hinTitle: "",
            auth: 0
        }
    }

    createScheme() {
        axios.post('http://localhost:24555/schemes/create',{
            title: this.state.title,
            hinTitle: this.state.hinTitle,
            category: this.state.category,
            description: this.state.description,
            deadline: this.state.deadline,
            department: this.state.department,
            doc: this.state.doc,
            auth: this.state.auth
        }).then(()=>console.log("Success"));
    }


    render() {
        return(
            <div className="jumbotron-fluid">
                <div>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={e=>this.setState({title: e.target.value})} placeholder={"Title"}/>
                </div>

                <div>
                    <label>Hindi Title</label>
                    <input type="text" value={this.state.hinTitle} onChange={e=>this.setState({hinTitle: e.target.value})} placeholder={"Hindi Title"}/>
                </div>

                <div>
                    <label>category</label>
                    <input type="text" value={this.state.category} onChange={e=>this.setState({category: e.target.value})} placeholder={"Category"}/>
                </div>
                <div>
                    <label>description</label>
                    <textarea value={this.state.description} onChange={e=>this.setState({description: e.target.value})} placeholder={"Description"}/>
                </div>
                <div>
                    <label>Department</label>
                    <input type="text" value={this.state.department} onChange={e=>this.setState({department: e.target.value})}/>
                </div>
                <div>
                    <label>Deadline</label>
                    <input type="date" onSelect={e=>this.setState({deadline: e.currentTarget.value})}/>
                </div>
                <div>
                    <label>Documents needed</label>
                    <input type="text" value={this.state.doc} onChange={e=>this.setState({doc: e.target.value})} placeholder={"Separated by ,,"}/>
                </div>
                <div>
                <label>Auth needed</label>
                <input type="number" value={this.state.auth} placeholder={"Auth"} onChange={e=>this.setState({auth: e.target.value})}/>
                </div>
                <Button variant={"success"} onClick={()=>this.createScheme()} >Create</Button>
            </div>
        )
    }

}
