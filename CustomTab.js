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
}
