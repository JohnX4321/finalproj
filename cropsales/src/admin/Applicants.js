import React from "react";
import axios from 'axios';

export default class ApplicantPage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            currId: this.props.match.params.id,
            appl: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:24555/cropsave/${this.state.currId}/all`)
            //.then((data)=>console.log(data));
            .then((data)=>this.setState({appl: data.data}));
        console.log(this.state.appl);
    }


    render() {

        return(

            <div className="jumbotron-fluid">
                {
                    this.state.appl.map((p)=>(
                        <div className="row" key={p.uid}>
                            <div className="col-sm-6">{"Village: "+p.village}</div>
                            <div className="col-sm-6">Aadhar ID: {p.uid}</div>
                        </div>
                    ))
                }
            </div>


        )

    }

}
