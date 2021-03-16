import React from "react";
import axios from "axios";
import {Spinner} from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const catA="",catB="",catC="",catD="";
export default class GovtAnalytics extends React.Component {

    constructor() {
        super();

        this.state={
            adata: [],
            bdata: [],
            cdata: [],
            ddata: [],
            loading: true
        }

    }

    componentDidMount() {
        axios.get('http://localhost:24555/schemesave/all/'+catA)
            .then((data)=>this.setState({adata: data.data}));
        axios.get('http://localhost:24555/schemesave/all/'+catB).then((data)=>this.setState({bdata: data.data}));
        axios.get('http://localhost:24555/schemesave/all/'+catC).then((data)=>this.setState({cdata: data.data}));
        axios.get('http://localhost:24555/schemesave/all/'+catD).then((data)=>this.setState({ddata: data.data}));
    }

    render() {
        var aml={},bml={},cml={},dml={};

        this.state.adata.map((i)=>{
            if (aml[i.index]>=0)
                aml[i.index]=aml[i.index]+1
            else aml[i.index]=0;
        })
        this.state.bdata.map((i)=>{
            if (bml[i.index]>=0)
                bml[i.index]=bml[i.index]+1
            else bml[i.index]=0;
        })
        this.state.cdata.map((i)=>{
            if (cml[i.index]>=0)
                cml[i.index]=cml[i.index]+1
            else cml[i.index]=0;
        })
        this.state.ddata.map((i)=>{
            if (dml[i.index]>=0)
                dml[i.index]=dml[i.index]+1
            else dml[i.index]=0;
        })

        if (this.state.loading)
            return <Spinner animation={} />
            else {
                return (
                    <Tabs>
                        <TabList>
                            <Tab>One</Tab>
                            <Tab>Two</Tab>
                            <Tab>Three</Tab>
                            <Tab>Four</Tab>
                        </TabList>

                        <TabPanel>
                            <div>
                                {
                                    aml.map((a,b)=>(
                                        <h1>{a} : {b}</h1>
                                    ))
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div>
                                {
                                    bml.map((a,b)=>(
                                        <h1>{a} : {b}</h1>
                                    ))
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div>
                                {
                                    cml.map((a,b)=>(
                                        <h1>{a} : {b}</h1>
                                    ))
                                }
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div>
                                {
                                    dml.map((a,b)=>(
                                        <h1>{a} : {b}</h1>
                                    ))
                                }
                            </div>
                        </TabPanel>




                    </Tabs>
                )
        }




    }

}
