import React from "react";
import axios from 'axios';
import {Button, Card} from "react-bootstrap";
import langJSON from '../lang.json'

const schema={
    "carrot": "https://www.flaticon.com/svg/static/icons/svg/1041/1041355.svg",
    "onion": "https://www.flaticon.com/svg/static/icons/svg/1998/1998121.svg",
    "tomato": "https://www.flaticon.com/svg/static/icons/svg/2909/2909894.svg",
    "cucumber": "https://www.flaticon.com/svg/static/icons/svg/3456/3456583.svg"
};

var utterance = new window.SpeechSynthesisUtterance("");
//utterance.voice = this.selected;
utterance.text = ""
utterance.lang = 'en-GB';
utterance.pitch = 0.8;
utterance.rate = 1;
utterance.volume =  1

var f;
export default class UserPage extends React.Component {


    constructor() {
        super();
        this.state= {
            a: 100,
            posts: [],
            c_type: "Crop Type",
            retailer: "Retailer",
            retailer_loc: "Retailer Location",
            criteria: "Criteria",
            amt: "Amount",
            quantity: "Quantity",
            apply: "Apply",
        }


        //console.log(this.props.match.params.lan);
    }

    componentDidMount() {
        var atmp=parseInt(this.props.match.params.lan);
        console.log(a);
        axios.get('http://localhost:24555/retail/all').then((data)=>this.setState({posts: data.data}))
        if (atmp!==0) {
            var a=atmp-1;
            this.setState({
                a: atmp,
                c_type: langJSON.c_type[a],
                retailer: langJSON.retailer[a],
                retailer_loc: langJSON.retailer_loc[a],
                criteria: langJSON.criteria[a],
                amt: langJSON.amt[a],
                quantity: langJSON.quantity[a],
                apply: langJSON.apply[a]
            });
        }
    }

    applyCrop(id) {
        axios.post('http://localhost:24555/cropsave/create',{
            index: id,
            village: this.props.match.params.village,
            uid: this.props.match.params.id
        }).then(()=>console.log("Applied successfully"))
            .then(()=>this.props.history.push('/'+this.state.a+'/success'))
    }

    render() {

        return (
            <div className="jumbotron-fluid">

                <div className="container-fluid">
                    <div className="row">
                {
                    this.state.posts.map((ad)=>(
                        <div className="col-md-4" key={ad._id}>
                        <Card style={{width: 400}} key={ad._id}>
                            <Card.Img variant="top" src={schema[ad.crop]} />
                            <Card.Body>
                            <div>{this.state.c_type}: {(this.state.a!==100)?langJSON[ad.crop][this.state.a]:ad.crop}</div>
                            <div>{this.state.retailer}: {ad.retailer}</div>
                            <div>{this.state.retailer_loc}: {ad.location}</div>
                            <div>{this.state.criteria}: {ad.criteria}</div>
                            <div>{this.state.amt}: {"\u20b9 "+ad.amount_unit}</div>
                            <div>{this.state.quantity}: {ad.quantity} kg</div>
                                <div className="border border-info">{this.state.amt}: {"\u20b9 "+parseInt(ad.quantity)*parseInt(ad.amount_unit)}</div>
                            </Card.Body>
                            <Card.Footer>

                                <Button variant="secondary" onClick={()=>{
                                    window.speechSynthesis.cancel();
                                    utterance.text=ad.crop + ' ' + ad.retailer + ' ' + ad.location + ' ' + ad.quantity + 'kilogram ' + parseInt(ad.quantity)*parseInt(ad.amount_unit) + ' Rupees';
                                    window.speechSynthesis.speak(utterance);
                                }}>Speak</Button>

                            </Card.Footer>
                            <Button variant="primary" onClick={()=>this.applyCrop(ad._id)}>{this.state.apply}</Button>
                        </Card>
                        </div>

                    ))
                }
                    </div>
                </div>

            </div>
        )

    }

}
/*

<Button variant="secondary" onClick={()=>{
                                    var t=ad.crop+' '+ad.retailer+' '+ad.location+' '+ad.quantity+' '+this.state.amt+' Rupees';
                                }}>Speak</Button>
 */
