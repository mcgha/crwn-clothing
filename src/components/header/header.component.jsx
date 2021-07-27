import React from 'react';
// import { Link } from 'react-router-dom';
// imported in header.styles
import { connect } from 'react-redux';
//higher  order component, allows component to access reducers
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { signOutStart } from '../../redux/user/user.actions';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';


const Header = ({ currentUser, hidden, signOutStart }) => (
    <HeaderContainer>
        <LogoContainer to='/'> 
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                Shop
            </OptionLink>
            {/* <Link className='option' to='/contact'>
                Contact
            </Link> */}
            {
                currentUser ? 
                <OptionLink as='div' onClick={signOutStart}> Sign out ({currentUser.displayName})</OptionLink>   
                :
                <OptionLink to='/signin'> Sign In</OptionLink> 
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : 
            <CartDropdown />
        }
    </HeaderContainer>
);
//state from root reducer
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Header);