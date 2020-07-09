import React, { Component } from 'react'
import ContactForm from './ContactForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';

var interviewee_id

export class UserProfile extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        mobile_number: '',
        state: '',
        city: '',
        jobTitle: '',
        compName: '',
        industry: '',
        compLocation: '',
        schoolName: '',
        studyField: '',
        degree: '',
        skills: '',
        interests: ''
    };
    componentDidMount() {
      if(sessionStorage.getItem("userData")){
        // const item = sessionStorage.getItem("userData");
        interviewee_id = sessionStorage.userData;
        // console.log(item)
      }
    }
    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
        step: step + 1
        });
    };

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
        step: step - 1
        });
    };

    // Handle fields change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };
        render() {
            const {step} = this.state;
            const {firstName,lastName,email,mobile_number,city,state,jobTitle,compName,industry,compLocation,schoolName,studyField,degree,skills,interests} = this.state;
            const values = {firstName,lastName,email,mobile_number,city,state,jobTitle,compName,industry,compLocation,schoolName,studyField,degree,skills,interests,interviewee_id};

            switch (step) {
              case 1: 
                return (
                  <ContactForm 
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={values}
                  />
                );
              case 2:
                return (
                  <ExperienceForm 
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                  />
                );
              case 3:
                return (
                  <EducationForm   
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                  />
                );
              case 4:
                return (
                  <SkillsForm    
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                    closeHandler={this.props.closeHandler}
                  />
                );
              default:
                 // NULL
            }
        }
    }

export default UserProfile
