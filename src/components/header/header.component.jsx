import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//higher  order component, allows component to access reducers
import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'> 
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                Shop
            </Link>
            <Link className='option' to='/contact'>
                Contact
            </Link>
            {
                currentUser ? 
                <div className='option' onClick={() => auth.signOut()}> Sign out ({currentUser.displayName})</div>   
                :
                <Link className='option' to='/signin'> Sign In</Link> 
            }
            <CartIcon />
        </div>
        {
            hidden ? null : 
            <CartDropdown />
        }
    </div>
);
//state from root reducer
const mapStateToProps = ({user: {currentUser}, cart: { hidden }}) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header);