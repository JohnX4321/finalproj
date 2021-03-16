import React from 'react';
import {Button, Card} from 'react-bootstrap';
import axios from 'axios';
import * as Const from '../const';
import langJSON from '../lang.json';


export default class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            jobs: [],
            addr_lbl: "Address",
            vlg_lbl: "Village",
            dur_lbl: "Duration",
            sal_lbl: "Salary",
            atmp:0
        }


    }

    applyJob(item) {
        //console.log(item);
        axios.post(Const.JA_CREATE+"/", {
            postid: item,
            name: "User 1",//this.props.name,
            village: "Bangalore",//this.props.village,
            mobile: "1234567890"//this.props.mobile
        }).then(()=>console.log("Applied successfully"))
            .then(()=>this.props.history.push('/'+this.state.atmp+'/success'));

    }


    componentDidMount() {
        axios.get(Const.JOBPOST_ALL).then((data)=>{
            console.log(data);
            this.setState({jobs: data.data});
        })
        var atmp = parseInt(this.props.match.params.lang);
        if (atmp!==0) {
            var a=atmp-1;
            this.setState({
                addr_lbl: langJSON.address[a],
                vlg_lbl: langJSON.village[a],
                dur_lbl: langJSON.duration[a],
                sal_lbl: langJSON.salary[a],
                atmp: atmp.toString()
            });
        }
    }

    render() {

        return (
            <div className="jumbotron">


                <div className="jumbotron-fluid">
                    Jobs Available near you
                    <div style={{position: "absolute",right: '16px', top: '8px'}}>
                        <Button title={"Close"} variant="danger" />
                    </div>
                </div>


                <div style={{marginTop: 20,padding: 10}}>

                    {
                        this.state.jobs.map((job)=>(
                            <div style={{padding: 10}} key={job.uid}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{job.job}</Card.Title>
                                        <Card.Text>
                                            {this.state.addr_lbl+": "+job.employer+", "+job.empAddress}<br/>
                                            {this.state.vlg_lbl+": "+job.empVillage}<br/>
                                            {this.state.dur_lbl+": "+job.duration}<br/>
                                            {this.state.sal_lbl+": \u20b9 "+job.price}
                                        </Card.Text>
                                        <Button variant="primary" onClick={()=>this.applyJob(job.uid)}>Apply Now</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    }

                </div>

            </div>
        )

    }

}
