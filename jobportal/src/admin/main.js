import React from "react";
import {Button} from 'react-bootstrap';
import axios from 'axios';
import * as Const from '../const';
import {Link} from "react-router-dom";




export default class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            jobs: [],
            employer: '',
            empAddress: '',
            empVillage: '',
            job: '',
            duration: '',
            price: '',
            uid: this.props.match.params.id,
            applicants: [],
            appl: [],
            vis: false
        }
    }

    /*fetchApplicants(cat) {
        axios.get(`${Const.JA_GET}/${this.state.uid}`).then(()=>console.log("fetched"))
    }*/


    componentDidMount() {
        axios.get(Const.JOBPOST_GET+`/${this.state.uid}/`).then((data)=>this.setState({jobs: data.data}));
        axios.get('http://localhost:24555/job_apply/all/'+this.state.uid).then((data)=>this.setState({appl: data.data}))
        //console.log(this.state.jobs);
    }

    onSubmit() {
        //console.log(this.state);

    }

    onDelete(job) {
        axios.delete(`${Const.JOBPOS_URL}/${job}/delete`).then(()=>console.log("Deleted"))
    }

    render() {

        return(

            <div>
                <div className="jumbotron-fluid flex-fill">
                    <input type="text" value={this.state.employer} onChange={e=>this.setState({employer: e.target.value})} placeholder={'Name'} />
                    <input type="text" value={this.state.empAddress} onChange={e=>this.setState({empAddress: e.target.value})} placeholder={'Address'} />
                    <input type="text" value={this.state.empVillage} onChange={e=>this.setState({empVillage: e.target.value})} placeholder={'Village'} />
                    <input type="text" value={this.state.job} onChange={e=>this.setState({job: e.target.value})} placeholder={'Job'} />
                    <input type="text" value={this.state.duration} onChange={e=>this.setState({duration: e.target.value})} placeholder={'Duration'} />
                    <input type="text" value={this.state.price} onChange={e=>this.setState({price: e.target.value})} placeholder={'Price'} />
                    <input disabled={true} type="text" value={this.state.uid} onChange={e=>this.setState({uid: e.target.value})} placeholder={'Aadhar ID'} />

                    <Button type="primary" variant="primary" onClick={()=>{
                        if(this.state.jobs!==undefined) {
                            axios.post(Const.JOBPOST_CREATE, {
                                employer: this.state.employer,
                                empAddress: this.state.empAddress,
                                empVillage: this.state.empVillage,
                                job: this.state.job,
                                price: this.state.price,
                                duration: this.state.duration,
                                uid: this.state.uid
                            }).then((d) => console.log(d.toString() + "applied"))

                        }  else {document.getElementById("limit-info").style["color"]="red"}

                    }}>Submit</Button>

                </div>

                <div>
                    Only 1 job Ad can be posted per user
                </div>


                <div className="jumbotron-fluid" style={{marginTop: 40,margin: 10,padding: 10}} >

                    {
                        this.jobsList(this.state.jobs)
                    }

                </div>

            </div>

        )

    }
    jobsList(list) {
        //console.log(list)
        if (list!==undefined) {

            return (
                <div>
                    {list.map((job)=>(
                        <div className="flex-fill">
                            <div>{job.job}</div>
                            <Button variant="secondary" className="btn-danger" onClick={() => this.onDelete(job._id)}>Delete</Button>
                            <Button onClick={()=>this.setState({vis: true})}>View Applicants</Button>
                        </div>
                    ))}
                    <div>
                        {(this.state.vis&&this.state.appl.map((item)=>(
                            <div className=" row col-12">
                                <div className="col-3">{item.name}</div>
                                <div className="col-3">{item.mobile}</div>
                                <div className="col-3">{item.village}</div>
                            </div>
                        )))}
                    </div>
                </div>

            )
        } else return <div id="limit-info">No Postings Yet!!</div>
    }



}

