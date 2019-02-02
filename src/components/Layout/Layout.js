import React, { Component } from 'react';
import HOC from '../../hocomponents/HOC';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import './Layout.css';

class Layout extends Component{
    state = {
        SideDrawerShow: false
    }

    SideDrawerClose = () => {
        this.setState({SideDrawerShow: false});
    }

    SideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {SideDrawerShow: !prevState.SideDrawerShow };
        } );
    }

    render(){
     return(
        <HOC>
            <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
            <SideDrawer open={this.state.SideDrawerShow} closeHandler={this.SideDrawerClose}/>
            <main className="Content">
                {this.props.children}
            </main>
        </HOC>
     )   
    }
}    

export default Layout;