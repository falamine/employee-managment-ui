import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Button } from './navbar.component';


export const Employee = (props) => (
    <tr>
        <td>{props.employee.name}</td>
        <td>{props.employee.gender}</td>
        <td>{props.employee.dateOfBirth}</td>
        <td>{props.employee.salary}</td>
        <td><Link to={"/edit/"+props.employee._id}>edit</Link> | <Button onClick={() => {props.deleteEmployee(props.employee._id)}}>delete</Button></td>
    </tr>
)