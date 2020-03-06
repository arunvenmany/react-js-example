import React, { Component } from 'react'
import ApiService from "../../service/ApiService";

class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            age: '',
            salary: '',
            message: null,
            errors: {
               username: '',
               password: '',
               firstname: '',
               lastname: '',
               age: '',
               salary: '',
            }
        }
        this.saveUser = this.saveUser.bind(this);
    }

    validateForm = (errors) => {
      let valid = true;
      Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
      );
      return valid;
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, password: this.state.password, firstname: this.state.firstname, lastname: this.state.lastname, age: this.state.age, salary: this.state.salary};
        Object.keys(user).map((key) =>{
            let errors=this.checkValidity(key,user[key]);
            this.setState({errors});
        });
        if(this.validateForm(this.state.errors)) {
           console.info('Valid Form')
           console.log("id is"+window.localStorage.getItem("userId"));
           ApiService.addUser(user)
                .then(res => {
                    this.setState({message : 'User added successfully.'});
                    this.props.history.push('/users');
                })
                .catch(err => {
                    this.setState({message : 'Error while saving user!!'});
                    console.log(err);
           });
        }else{
              console.error('Invalid Form')
              this.setState({message : 'Form Validation failed!!'})
        }

    }

    onChange = (e) =>{
       e.preventDefault();
       const { name, value } = e.target;
       let errors=this.checkValidity(name,value);
       this.setState({errors, [e.target.name]: e.target.value });
    }

    checkValidity=(name,value)=>{
       let errors = this.state.errors;
       switch (name) {
         case 'username':
           errors.username =
             value.length < 5
               ? 'User name must be 5 characters long!': '';
           break;
         case 'password':
           errors.password =
             value.length < 8
               ? 'Password must be 8 characters long!': '';
           break;
         case 'firstname':
           errors.firstname =
             value.length < 1
               ? 'First name should not be empty!': '';
          break;
         case 'lastname':
          errors.lastname =
            value.length < 1
              ? 'Last name should not be empty!': '';
          break;
         case 'age':
           errors.age =
             value < 1
               ? 'Age should >zero!': '';
           break;
         case 'salary':
           errors.salary =
             value < 1
             ? 'Salary should be >zero!': '';
           break;
         default:
           break;
       }
       return errors;
    }

    render() {
        return(
            <div>
                <h2 className="text-center">Add User</h2>
                <form>
                <div className="form-group">
                    <label>User Name:</label>
                    <input type="text" placeholder="username" name="username" className="form-control" value={this.state.username} onChange={this.onChange}/>
                    {this.state.errors.username.length > 0 &&
                                    <span className='error'>{this.state.errors.username}</span>}
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" placeholder="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                    {this.state.errors.password.length > 0 &&
                                                        <span className='error'>{this.state.errors.password}</span>}
                </div>

                <div className="form-group">
                    <label>First Name:</label>
                    <input placeholder="First Name" name="firstname" className="form-control" value={this.state.firstname} onChange={this.onChange}/>
                    {this.state.errors.firstname.length > 0 &&
                                                        <span className='error'>{this.state.errors.firstname}</span>}
                </div>

                <div className="form-group">
                    <label>Last Name:</label>
                    <input placeholder="Last name" name="lastname" className="form-control" value={this.state.lastname} onChange={this.onChange}/>
                    {this.state.errors.lastname.length > 0 &&
                                                        <span className='error'>{this.state.errors.lastname}</span>}
                </div>

                <div className="form-group">
                    <label>Age:</label>
                    <input type="number" placeholder="age" name="age" className="form-control" value={this.state.age} onChange={this.onChange}/>
                    {this.state.errors.age.length > 0 &&
                                                        <span className='error'>{this.state.errors.age}</span>}
                </div>

                <div className="form-group">
                    <label>Salary:</label>
                    <input type="number" placeholder="salary" name="salary" className="form-control" value={this.state.salary} onChange={this.onChange}/>
                    {this.state.errors.salary.length > 0 &&
                                                       <span className='error'>{this.state.errors.salary}</span>}
                </div>

                <button className="btn btn-success" onClick={this.saveUser}>Save</button>
            </form>
                <h4 className="text-left">{this.state.message}</h4>
    </div>
        );
    }
}

export default AddUserComponent;