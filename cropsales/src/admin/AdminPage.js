import React from "react";

import axios from 'axios';

import {Button, Card, Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

const schema={
    "carrot": "https://www.flaticon.com/svg/static/icons/svg/1041/1041355.svg",
    "onion": "https://www.flaticon.com/svg/static/icons/svg/1998/1998121.svg",
    "tomato": "https://www.flaticon.com/svg/static/icons/svg/2909/2909894.svg",
    "cucumber": "https://www.flaticon.com/svg/static/icons/svg/3456/3456583.svg"
};

export default class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            posts: [],
            curr: '',
            crop: 'Crop Type',
            retailer: '',
            loc: '',
            criteria: '',
            amt: '',
            quantity: '',
            keys: Object.keys(schema)
        }
    }


    componentDidMount() {
        axios.get('http://localhost:24555/retail/all').then(data=>this.setState({posts: data.data}))
            .then(()=>console.log("Fetched posts"))
        //console.log(this.state.posts);
    }

    deletePost(id) {
        axios.delete('http://localhost:24555/retail/'+id+'/delete').then(()=>console.log("Deleted"))
    }

    submitPost() {
        axios.post('http://localhost:24555/retail/create',{
            crop: this.state.crop,
            retailer: this.state.retailer,
            location: this.state.loc,
            criteria: this.state.criteria,
            amount_unit: this.state.amt,
            quantity: this.state.quantity
        }).then(()=>console.log("Posted"))
    }

    render() {


        return(
            <div className="jumbotron">

                <form className="form-group">
                    <input type="text" value={this.state.retailer} placeholder={"Retailer"} name="retailer" onChange={e=>this.setState({retailer: e.target.value})}/>
                    <input type="text" value={this.state.loc} placeholder={"Location"} name="rloc" onChange={e=>this.setState({loc: e.target.value})}/>
                    <textarea value={this.state.criteria} placeholder={"Desc"} name="criteria" onChange={e=>this.setState({criteria: e.target.value})}/>
                    <input type="text" value={this.state.amt} placeholder={"Amt / kg"} name="retailer" onChange={e=>this.setState({amt: e.target.value})}/>
                    <input type="text" value={this.state.quantity} placeholder={"Kg"} name="retailer" onChange={e=>this.setState({quantity: e.target.value})}/>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">{this.state.crop}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                this.state.keys.map((p)=>(
                                    <Dropdown.Item key={p} onSelect={()=>this.setState({crop: p})}>{p}</Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button variant="success" onClick={()=>this.submitPost()}>Submit</Button>

                </form>

                {
                    this.state.posts.map((ad)=>(
                        <div key={ad._id}>
                        <Card>
                            <div className="row">
                                <div className="col-sm-2 border border-primary"> {"Crop: "+ad.crop} </div>
                                <div className="col-sm-2 border border-info"> {"Retailer: "+ad.retailer} </div>
                                <div className="col-sm-2 border border-danger"> {"Location: "+ad.location} </div>
                                <div className="col-sm-2 border border-dark"> {"Criteria: "+ad.criteria} </div>
                                <div className="col-sm-2 border border-warning"> {"Unit Rate: \u20b9 "+ad.amount_unit} </div>
                                <div className="col-sm-2 border border-success"> {"Quantity: "+ad.quantity+" kg"} </div>
                                    <div className="col-sm-2 border border-secondary">{"Payment: \u20b9 "+(parseInt(ad.quantity)*parseInt(ad.amount_unit))}</div>
                                </div>

                            <Button variant="danger" onClick={()=>this.deletePost(ad._id)}>Delete</Button>
                            <Card.Footer>
                                <Link to={`/${ad._id}/app`} >Applicants</Link>
                            </Card.Footer>
                        </Card>
                        </div>
                    ))
                }

            </div>
        )

    }

}
