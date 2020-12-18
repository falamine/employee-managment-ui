import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Button = styled.button`
padding: 0.25em 1em;
border: none;
`
export default class Navbar extends Component {
    render() {
        return ( 
        <nav>
            <div>
                <Button><Link to="/">Employees managment</Link></Button>
                <Button><Link to="/">Employees</Link></Button>
                <Button><Link to="/create">Add Employee</Link></Button>
            </div>
        </nav>   
        )
    }
}