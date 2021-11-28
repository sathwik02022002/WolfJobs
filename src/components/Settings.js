

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {clearAuthState, editUser, generateOtp, verifyOtp} from '../actions/auth'

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.auth.user.name,
      password: '',
      confirmPassword: '',
      editMode: false,
      role:'',
      address:'',
      phonenumber:'',
      hours:'',
      dob:'',
      gender:'',
      skills:'',
      showOtpField: false,
      otp: ''
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
  render() {
    const { user,error } = this.props.auth;
    const { editMode } = this.state;

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://cdn-icons.flaticon.com/png/512/668/premium/668709.png?token=exp=1636045281~hmac=01dc4c9a3c91ca3c5bae9c160e2fb7c6"
            alt="user-dp"
          />
        </div>

        {error && <div className="alert error-dailog">{error}</div>}
        {error ===false && <div className="alert success-dailog">Successfully Updated Profile</div>}

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        {(!this.props.auth.user.isVerified && !this.state.showOtpField) && (
          <div className="field" style={{
            border: '1px solid #ccc',
            textAlign: 'center',
            padding: '5px',
            borderRadius: '5px',
            borderColor: '#F00',
            color: '#F00',
            cursor: 'pointer'
          }} onClick={
            () => {
              this.setState({
                showOtpField: true
              })
              this.props.dispatch(generateOtp(this.props.auth.user._id));
            }
          }>
            Email not verified. Click here to verify
          </div>
        )}
        {
          this.state.showOtpField && (!this.props.auth.user.isVerified) && (
            <div className="field" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  style={{
                    textAlign: 'center',
                    color: '#F00',
                    border: '1px solid #FOO',
                    borderColor: '#F00',
                    marginTop: '0px',
                  }}
                  onChange={(e) => {
                    this.handleChange('otp', e.target.value)
                  }}
                />
                <button
                  style={{
                    marginTop: '0px',
                  }}
                  onClick={() => {
                    this.props.dispatch(verifyOtp(this.props.auth.user._id, this.state.otp))
                  }}
                >
                Verify
                </button>
            </div>
          )
        }

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
            
            <div className="field-value">{user.address}</div>
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
            
            <div className="field-value">{user.phonenumber}</div>
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
            
            <div className="field-value">{user.hours}</div>
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
            
            <div className="field-value">{user.dob}</div>
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
            
            <div className="field-value">{user.gender}</div>
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
            
            <div className="field-value">{user.skills}</div>
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
