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


// use it

import React, { useState, useEffect } from "react";
import { useAxiosFetch } from "../custom-hooks/useAxiosFetch";
const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const { fetchData, data, loading, error } = useAxiosFetch({
    method: "GET",
    url: "/tutorials",
    params: {
      title: searchTitle,
    },
  });
  useEffect(() => {
    if (data) {
      setTutorials(data);
      console.log(data);
    } else {
      setTutorials([]);
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  useEffect(() => {
    if (loading) {
      console.log("retrieving tutorials...");
    }
  }, [loading]);
  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const findByTitle = () => {
    fetchData();
  };
  // ...
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />
        <button type="button" onClick={findByTitle} >
          Search
        </button>
      </div>
      <div>
        <h4>Tutorials List</h4>
        {loading && <p>loading...</p>}
        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li key={index} >
                {tutorial.title}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default TutorialsList;
