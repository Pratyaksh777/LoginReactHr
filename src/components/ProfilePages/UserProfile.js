import React, { Component } from 'react'
import ContactForm from './ContactForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';

export class UserProfile extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
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
            const {firstName,lastName,email,city,state,jobTitle,compName,industry,compLocation,schoolName,studyField,degree,skills,interests} = this.state;
            const values = {firstName,lastName,email,city,state,jobTitle,compName,industry,compLocation,schoolName,studyField,degree,skills,interests};

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
                 
            }
        }
    }

export default UserProfile
