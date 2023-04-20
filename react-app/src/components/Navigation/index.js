import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from './logo.png'
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="navbarmain">
			<div className="nomargin">
				<NavLink exact to="/"><img src={logo} alt={"NA logo"} className='logoimg nomargin'></img></NavLink>
			</div>
			{isLoaded && (
				<div className="nomargin">
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;