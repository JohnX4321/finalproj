import React from "react";
import axios from "axios";
import {Button, Card} from "react-bootstrap";

export default class ViewApp extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            appl: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:24555/schemesave').then((data)=>this.setState({appl: data.data}));
        console.log('fetched')
    }

    schemeGrant() {

    }

    render() {
        return(
            <div>
                {
                    this.state.appl.map((app)=>(
                        <Card>
                            <Card.Title>{app.title}</Card.Title>
                            <Card.Body>
                                <h1>{app.name+","+app.address+","+app.village}</h1>
                                <h5>{app.mobile}</h5>
                                <div>{app.docs.map(ap=>(
                                    <a href={ap}>ap</a>
                                ))}</div>
                            </Card.Body>
                            <Card.Footer>
                                {app.status==="APPLIED"?<Button variant="danger" onClick={()=>this.schemeGrant()}>APPLIED</Button>:<Button variant="success">SUCCESS</Button> }
                            </Card.Footer>
                        </Card>
                    ))
                }
            </div>
        )
    }
}
