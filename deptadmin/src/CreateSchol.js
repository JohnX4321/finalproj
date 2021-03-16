import React from "react";
import axios from "axios";
import DatePicker from "react-date-picker";

export default class CreateSchol extends React.Component {

    constructor() {
        super();
        this.state={
            title: "",
            category: "",
            description: "",
            deadline: "",
            doc: "",
            age: 0
        }
    }

    createScholarship() {
        axios.post('',{
            title: this.state.title,
            category: this.state.category,
            description: this.state.description,
            deadline: this.state.deadline,
            doc: this.state.doc,
            age: this.state.age
        }).then(()=>console.log("Posted"));
    }

    render() {
        return(
            <div className="jumbotron-fluid">
                <div>
                    <label>Title</label>
                    <input type="text" value={this.state.title} onChange={e=>this.setState({title: e.target.value})}/>
                </div>
                <div>
                    <label>category</label>
                    <input type="text" value={this.state.category} onChange={e=>this.setState({category: e.target.value})}/>
                </div>
                <div>
                    <label>description</label>
                    <input type="text" value={this.state.description} onChange={e=>this.setState({description: e.target.value})}/>
                </div>
                <div>
                    <label>Doc</label>
                    <input type="text" value={this.state.doc} onChange={e=>this.setState({doc: e.target.value})}/>
                </div>
                <div>
                    <label>Age</label>
                    <input type="text" value={this.state.age} onChange={e=>this.setState({age: e.target.value})}/>
                </div>
                <div>
                    <label>Deadline</label>
                    <DatePicker value={this.state.deadline} onChange={e=>this.setState({deadline: e})} />
                </div>
            </div>
        )
    }

}
