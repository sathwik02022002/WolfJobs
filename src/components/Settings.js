

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {clearAuthState, editUser} from '../actions/auth'

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.auth.user.name,
      id: props.auth.user._id,
      password: '',
      confirmPassword: '',
      editMode: false,
      role:'',
      address:'',
      phonenumber:'',
      hours:'',
      dob:'',
      gender:'',
      skills:''
    };
  }

  handleChange = (fieldName,val) => {

    this.setState({
        [fieldName]: val
    })

  }
  
  handleSave = () => {

    const {password, confirmPassword, name,address,phonenumber,hours,dob,gender,skills} = this.state;

    const {user} = this.props.auth;

    this.props.dispatch(editUser(name,password,confirmPassword,user._id,user.role,address,phonenumber,hours,dob,gender,skills))

  }

  componentWillUnmount(){
      this.props.dispatch(clearAuthState())
  }

  componentDidMount(){
      console.log("Inside component did mount");
      fetch("http://localhost:8000/api/v1/users/getprofile/" + this.props.auth.user._id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            name: result.data.user.name,
            password: result.data.user.password,
            confirmPassword: '',
            role:'',
            address:result.data.user.address,
            phonenumber:result.data.user.phonenumber,
            hours:result.data.user.hours,
            dob:result.data.user.dob,
            gender:result.data.user.gender,
            skills:result.data.user.skills
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { user,error } = this.props.auth;
    const { editMode } = this.state;

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://icons-for-free.com/download-icon-person-1324760545186718018_512.png"
            alt="user-dp"
          />
        </div>

        {error && <div className="alert error-dailog">{error}</div>}
        {error ===false && <div className="alert success-dailog">Successfully Updated Profile</div>}

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('name',e.target.value)}
              value={this.state.name}
            />
          ) : (
            <div className="field-value">{user.name}</div>
          )}
        </div>

        {editMode && (
          <div className="field">
            <div className="field-label">New Password</div>
            <input
              type="password"
              onChange={(e) => this.handleChange('password',e.target.value)}
              value={this.state.password}
            />
          </div>
        )}

        {editMode && (
          <div className="field">
            <div className="field-label">Confirm Password</div>
            <input
              type="password"
              onChange={(e) => this.handleChange('confirmPassword',e.target.value)}
              value={this.state.confirmPassword}
            />
          </div>
        )}
        <div className="field">
          <div className="field-label">Address</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('address',e.target.value)}
              value={this.state.address}
              placeholder='Address'
            />
          ) : (
            
            <div className="field-value">{this.state.address}</div>
          )}
        </div>
        <div className="field">
          <div className="field-label">Phone Number</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('phonenumber',e.target.value)}
              value={this.state.phonenumber}
              placeholder='Phone Number'
            />
          ) : (
            
            <div className="field-value">{this.state.phonenumber}</div>
          )}
        </div>
        <div className="field">
          <div className="field-label">Available Hours</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('hours',e.target.value)}
              value={this.state.hours}
              placeholder='Hours'
            />
          ) : (
            
            <div className="field-value">{this.state.hours}</div>
          )}
        </div>
        <div className="field">
          <div className="field-label">DOB</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('dob',e.target.value)}
              value={this.state.dob}
              placeholder='DOB'
            />
          ) : (
            
            <div className="field-value">{this.state.dob}</div>
          )}
        </div>
        <div className="field">
          <div className="field-label">Gender</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('gender',e.target.value)}
              value={this.state.gender}
              placeholder='Gender'
            />
          ) : (
            
            <div className="field-value">{this.state.gender}</div>
          )}
        </div>
        <div className="field">
          <div className="field-label">Skills</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('skills',e.target.value)}
              value={this.state.skills}
              placeholder='Skills'
            />
          ) : (
            
            <div className="field-value">{this.state.skills}</div>
          )}
        </div>

        <div className="btn-grp">
            {editMode ? <button className="button save-btn" onClick={this.handleSave} >Save</button> :
            <button className="button edit-btn" onClick={() => this.handleChange('editMode',true)}>Edit Profile</button> }
        </div>

        {editMode && <div className="go-back" onClick={() => this.handleChange('editMode',false)}>
            Go Back</div>}

        
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(Settings);
