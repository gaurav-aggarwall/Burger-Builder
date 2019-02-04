import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Login from './containers/Auth/Login';
import Logout from './containers/Auth/Logout';
import SignUp from './containers/Auth/SignUp';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.onLoading();
  }

  render() {
    let isAuthenticated = (
        <Switch>
          <Route path='/login' component={Login}/> 
          <Route path='/join' component={SignUp}/> 
          <Route path='/' exact component={BurgerBuilder}/>  
          <Redirect to='/' />
        </Switch>
        );
    if(this.props.isAuth){
      isAuthenticated = (
        <Switch>
          <Route path='/checkout' component={Checkout}/> 
          <Route path='/logout' component={Logout}/> 
          <Route path='/orders' component={Orders}/> 
          <Route path='/' exact component={BurgerBuilder}/> 
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
    <div>
      <Layout>
        <Switch>
          {isAuthenticated}
        </Switch>
      </Layout>
    </div>
    );
  }
}

const mapsStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoading: () => dispatch(actions.authCheckState())
  }
};

export default withRouter(connect(mapsStateToProps , mapDispatchToProps)(App));
