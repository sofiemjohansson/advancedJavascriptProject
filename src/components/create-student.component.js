import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';
import Alert from '../utils/alert';

export default class CreateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      studentNbr: '',
      alertVariant: 'none',
      alertMsg: '',
    }
  }

  handleStudentNameChange = (evt) => {
    this.setState({
      name: evt.target.value,
    })
  }

  handleStudentEmailChange = (evt) => {
    this.setState({
      email: evt.target.value,
    })
  }

  handleStudentstudentNbrChange = (evt) => {
    this.setState({
      studentNbr: evt.target.value,
    })
  }

  handleSubmitDetails = () => {
    const { name, email, studentNbr } = this.state;
    const data = {
      name,
      email,
      studentNbr
    };

    if (name === '' || email === '' || studentNbr === '') {
      this.setState({
        alertVariant: 'danger',
        alertMsg: 'All field are required',
      })
    } else {
      axios.post('/students/create-student', data)
        .then((res) => {
          console.log(res.data);
          this.setState({
            alertVariant: 'success',
            alertMsg: 'Student successfully created'
          })
        }).catch((error) => {
          this.setState({
            alertVariant: 'danger',
            alertMsg: 'Something went wrong! Please try again later.',
          })
          console.log(error);
        })
      this.resetFormValue();
    }

  }

  resetFormValue = () => {
    this.setState({
      name: '',
      email: '',
      studentNbr: ''
    })
  }

  handleAlertClose = () => {
    this.setState({
      alertVariant: 'none',
      alertMsg: '',
    })
  }
  studentNbr;

  render() {
    const { name, email, rollno, alertVariant, alertMsg } = this.state;
    return (
      <div className="student-create-wapper">
        <h1> Create student list</h1>
        {
          alertVariant === 'none' ? null : <Alert alertVariant={alertVariant} alertMsg={alertMsg} handleAlertClose={this.handleAlertClose}/>
        }
        <Form>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(evt) => this.handleStudentNameChange(evt)} />
          </Form.Group>

          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(evt) => this.handleStudentEmailChange(evt)} />
          </Form.Group>

          <Form.Group controlId="Name">
            <Form.Label>Student number</Form.Label>
            <Form.Control type="number" value={this.studentNbr} min='0' onChange={(evt) => this.handleStudentstudentNbrChange(evt)} />
          </Form.Group>

          <Button variant="danger" size="lg" block="block" onClick={(evt) => this.handleSubmitDetails(evt)}>
            Create Student
          </Button>
        </Form>
      </div>
    );
  }
}
