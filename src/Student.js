import React from 'react';
import ReactDOM from 'react-dom';
const url = 'https://institute-backend.herokuapp.comapi/v1/students/'

class Student extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      courses: [],
      id: '',
      logged_in: false,
      student: []
    }
    this.rollnoChange = this.rollnoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  rollnoChange(event) {
    this.setState({id: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var this_url = url+this.state.id
    console.log(this_url)
    fetch(this_url)
    .then(data => data.json())
    .then(data => {
      if (data.student) {
        this.setState({logged_in: true, student: data.student })
      } else {
        alert('wrong rollnumber')
      }
    })
  }

  render() { 
    const { error, courses, logged_in, student} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (logged_in == false) {
      return(
        <div className='col-sm-6 offset-3 text-center'>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label>Student Roll Number</label>
              <input type="number" className='form-control' value={this.state.rollno} onChange={this.rollnoChange} />
            </div>
            <div className='form-group mt-4'>
              <input type="submit" value="Submit" className='btn btn-success' />
            </div>
          </form>
        </div>
      )
    }
    else {
      return(
        <div className='container'>
          <br/>
          <br/>
          <div className='row'>
            <div className='col-sm-3'>Student Roll.No</div>
            <div className='col-sm-1'>{student.id}</div>
            <div className='col-sm-3'>Student name</div>
            <div className='col-sm-5'>{student.name}</div>
          </div>
          <div className='row'>
            <hr/>
            <h6 className='text-center'>Courses</h6>
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                { student.courses.map(course => (
                  <tr>
                    <td>{course.name}</td>
                    <td>{course.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }
}

export default Student;