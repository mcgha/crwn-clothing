import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// switch wraps route
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

// import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
// used to create database
// import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { selectCurrentUser } from './redux/user/user.selector';
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
// used to create database
import { checkUserSession } from './redux/user/user.actions';

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  //only run useEffect if checkUserSession has changed
 
  // componentDidMount() {
  //   checkUserSession();

  //   // const { setCurrentUser, collectionsArray } = this.props;
  //   // used to create database 
  //     // addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
  //     //call to add collections to firestore database, passing destructured vaules we want
  // }
  
  return (
    <div className="App">
      {/* <HomePage /> */}
      {/* Header outside of the switch so it always appears regardless of navigation */}
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route 
          exact 
          path='/signin' 
          render={() => 
          currentUser ? (
          <Redirect to='/' />
          ) : (<SignInAndSignUpPage />)
          }
          />
      </Switch> 
    </div>
  );
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview
  // used to create objects in firestore database
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
