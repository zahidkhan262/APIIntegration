import React, { Component } from 'react'
import Tab from './Tab';
import TabNav from './TabNav';

export default class CustomTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'Home'
        }
    }
    setSelected = (tab) => {
        this.setState({ selected: tab });
    }
    render() {
        return (
            < div className='text-center mt-3'>
                <TabNav tabs={["Home", "About", "Profile"]} selected={this.state.selected} setSelected={this.setSelected} >
                    <Tab isSelected={this.state.selected === "Home"}>
                        <p>this is home </p>
                    </Tab>
                    <Tab isSelected={this.state.selected === "About"}>
                        <p>this is About </p>
                    </Tab>
                    <Tab isSelected={this.state.selected === "Profile"}>
                        <p>this is Profile </p>
                    </Tab>
                </TabNav>
            </div>
        )
    }
};

// custom useAxios
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/api";
export const useAxiosFetch = (url) => {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data, error, loading };
};
