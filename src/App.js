import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import styled from 'styled-components'
import EmployeesList from './components/employees-list.component';
import EmployeeCreate from './components/employees-create.component';
import Navbar from './components/navbar.component';

const Container = styled.div`
text-align: center;
padding-top: 20px;
` 
const Button = styled.button`
padding: 0.25em 1em;
color: grey;
border: 1px solid lightgrey;
border-radius: 2px;
`

function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      <Route path="/" exact component={EmployeesList}></Route>
      <Route path="/create" component={EmployeeCreate}></Route>
      <Route path="/edit/:id" component={EmployeeCreate}></Route>
    </Router>
  );
}

export default App;
