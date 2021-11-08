import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
	const { logoutUser } = useContext(AuthContext);
	const logout = () => logoutUser();
	return (
		<NavContainer className="navbar">
			<ul className="nav-links">
				<li className="link">
					<Link to="/" exact="true">
						Home
					</Link>
				</li>
				<li className="link">
					<Link to="/add">Add Todo</Link>
				</li>
				<li className="link">
					<button onClick={logout}>Logout</button>
				</li>
			</ul>
		</NavContainer>
	);
};

const NavContainer = styled.div`
	.nav-links {
		display: flex;
		justify-content: center;
	}
	.link {
		margin: 1rem;
		a {
			padding: 0.5rem;
			font-weight: 500;
			:hover {
				border-bottom: 1px solid var(--clr-black);
			}
		}
	}
	@media (min-width: 800px) {
		padding: 2rem;
	}
`;
export default Header;
