import React, { Component } from 'react';
import { connect } from 'react-redux';

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
            <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler} isAuth={this.props.isAuth} token={this.props.token}/>
            <SideDrawer open={this.state.SideDrawerShow} closeHandler={this.SideDrawerClose} isAuth={this.props.isAuth} token={this.props.token} />
            <main className="Content">
                {this.props.children}
            </main>
        </HOC>
     )   
    }
}    

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token!=null,
        token: state.auth.token!=null
    }
};

export default connect(mapStateToProps)(Layout);