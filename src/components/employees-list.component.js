import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import axios from 'axios';
import { Employee } from './employee.component';

export default class EmployeesList extends Component {
    constructor(props) {
        super(props)

        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.state = {
            employees: []
        }
        
    }

    getEmployees() {
        axios.get('http://localhost:5000/api/v1/employees')
        .then(res => {
            if(res.data.length > 0) {
                       this.setState({
                employees: res.data
            })
        } 
            
        }).catch((error)=>{console.log(error)})
    }

    componentDidMount() {
        this.getEmployees();
    }

    deleteEmployee(id) {
        axios.delete('http://localhost:5000/api/v1/employees/'+id)
        .then(res => {console.log(res.data)})
        this.setState({
            employees: this.state.employees.filter(e => e.id !== id)
        })
        window.location = '/';
    }

render() {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Birth Date</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.employees.map(currentEmployee => {
                    return <Employee employee={currentEmployee} deleteEmployee={this.deleteEmployee} key={currentEmployee._id}></Employee>
                 })}
                </tbody>
            </table>
        </div>
    );
}
}
