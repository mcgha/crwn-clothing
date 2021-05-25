import React from 'react';
import { withRouter } from 'react-router-dom';
//allows you access to history.push() and other parameters 
//must export default withRouter(component);
import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, match, linkUrl }) => (
    //can now pass history, match param because of withRouter
    <div 
    className={`${size} menu-item`} 
    onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <div 
            className='background-image'
            style={{
            backgroundImage: `url(${imageUrl})`
        }}
        />
                <div className='content'>
                    <h1 className='title'> {title.toUpperCase()}</h1>
                    <span className='subtitle'>Shop Now</span>
                </div>
            </div>
);

export default withRouter(MenuItem);