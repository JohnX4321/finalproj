import React from 'react';
import successPic from '../checked.png';
import langJSON from '../lang.json';

export default class SuccessPage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            succ: "Thank you for using Gramin Genie. This page will close now."
        }
    }

    componentDidMount() {
        var a=parseInt(this.props.match.params.lang);
        if (a!==0) {
            this.setState({
                succ: langJSON.close[a-1]
            });
        }
        console.log(a);
    }


    render() {

        return(

            <div className="container-fluid">

                <div className="jumbotron">
                    <img src={successPic} style={{width: 256,height: 256}} alt="Success Picture"/>

                    <h1>{this.state.succ}</h1>


                </div>

            </div>

        )

    }

}
