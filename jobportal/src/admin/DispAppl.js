import React from "react";
import axios from 'axios';

export default class DispApplPage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            appl: []
        }

    }

    componentDidMount() {
        axios.get(`/${this.props.id}`).then((data)=>this.setState({appl: data.data}));
    }


    render() {

        return <div>Hello</div>

    }

}
