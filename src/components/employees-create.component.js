import React, { Component } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import ReactDOM from 'react-dom';


const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: #777;
  font-family: "Raleway", sans-serif;
  font-size: 0.8em;
  margin: 0.5em 0;
  position: relative;
`;

export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  width: 300px;
  height: 35px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const Select = styled.select`
  width: 300px;
  height: 35px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const Button = styled.button`
  width: 300px;
  height: 35px;
  background-color: #5995ef;
  color: #fff;
  border-radius: 3px;
`;

const Container = styled.div`
padding-left: 20px;
`
export default class EmployeeCreate extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.save = this.save.bind(this)

        this.state = {
            name: '',
            gender: '',
            dateOfBirth: new Date(),
            salary: 0.0,
            employees: []
        }
    }

    componentDidMount() {

        if(this.props.match.params.id) {
            axios.get('http://localhost:5000/api/v1/employees/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    gender: res.data.gender,
                    dateOfBirth: new Date(res.data.dateOfBirth),
                    salary: res.data.salary
                })
    
            })
        }
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            dateOfBirth: date
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangeSalary(e) {
        this.setState({
            salary: e.target.value
        });
    }

    save(e) {
        e.preventDefault();
        const employee = {
            name: this.state.name,
            gender: this.state.gender,
            dateOfBirth: this.state.dateOfBirth,
            salary: this.state.salary
        }
        console.log('employee', employee)

        if(this.props.match.params.id) {
            axios.patch('http://localhost:5000/api/v1/employees/'+this.props.match.params.id, employee)
            .then(res => {
                console.log('result will be',res);
    
            }); 
        } else {
            axios.post('http://localhost:5000/api/v1/employees/add', employee)
        .then(res => {
            console.log('result will be',res);

        });
        }
        window.location = '/';
    }

    getEmployees() {
        axios.get('http://localhost:5000/api/v1/employees')
        .then(res => {
            this.setState({
                employees: res.data
            })

        })
    }

    render() {
        return(
            <Container>
            <Form onSubmit={this.save}>
                <Label>
                    Name <Input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.onChangeName}/>
                </Label>
                <Label>
                    Gender
                    <Select onChange={this.onChangeGender}>
                        <option disabled defaultValue>Select</option>
                        <option name="gender" value="Male" >Male</option>
                        <option name="gender" value="Female">Female</option>
                    </Select>
                
                </Label>
                <Label>
                  Birth Date
                   <DatePicker name="dateOfBirth"  selected={this.state.dateOfBirth} onChange={this.onChangeDate}></DatePicker>
                </Label>
  
              <Label>
                  Salary
                   <Input type="number" name="salary" placeholder="Salary" value={this.state.salary} onChange={this.onChangeSalary}></Input>
              </Label>
               
              <Button type="submit">Save</Button>
            </Form>
          </Container>
        )
    }

}
