import React, {useEffect, useState} from "react";
import {Form, Button, Alert} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const [error, setError] = useState(null);

    const courses = [
        {"name": "Practical Database Concepts", "score": 94},
        {"name": "User-centred Design", "score": 71},
        {"name": "Introduction to Programming", "score": 99},
        {"name": "Intro to Info Technology", "score": 95},
        {"name": "Building IT Systems", "score": 93},
        {"name": "Intro to Computer Systems", "score": 98},
        {"name": "Web Programming", "score": 96},
        {"name": "Programming 1", "score": 88},
        {"name": "Software Eng Fundamentals IT", "score": 86},
        {"name": "Security in Computing & IT", "score": 78},
        {"name": "Further Programming", "score": 97},
        {"name": "Networking 1", "score": 97}
    ];

    const validateStudentNumber = (number) => {

        // Get the first letter of the student ID

        let firstLetterOfStudentId = number.substring(0, 1);

        // Return false if the length isn't 7

        if (number.length !== 7) {
            return false;
        }

        // If the first digit of the ID is not 3, return false

        if (firstLetterOfStudentId !== '3') {
            return false;
        }

        return true;

    }

    const validateProgramName = (name) => {

        // Get the first letter of the program name

        let firstLetterOfProgramName = name.substring(0, 1);

        // Return TRUE if it is "B", otherwise FALSE

        return firstLetterOfProgramName === "B";

    }

    const validateName = (name) => {

        // First split the name by a space

        let nameParts = name.split(' ');

        // On splitting the name parts should be exactly two as specified in the assignment documentation

        if (nameParts.length !== 2) {
            return false;
        }

        // Get the first letter of the First Name and the Last Name

        let firstLetterOfFirstName = nameParts[0].substring(0, 1);
        let firstLetterOfLastName = nameParts[1].substring(0, 1);

        // Check whether the first name is capital or not

        if (firstLetterOfFirstName !== firstLetterOfFirstName.toUpperCase()) {
            return false;
        }

        // Check whether the last name is capital or not

        if (firstLetterOfLastName !== firstLetterOfLastName.toUpperCase()) {
            return false;
        }

        return true;

    };

    const handleSubmit = (e) => {

        // Get a FormData object from the submit event

        let formData = new FormData(e.currentTarget);

        // Create an empty array that will hold the field values

        let formValues = [];

        // Loop through the iterator and populate the array

        for (let [key, value] of formData.entries()) {
            formValues[key] = value;
        }

        // Validate the user entered inputs:

        if (!validateName(formValues['full_name'])) {

            setError("You have written an invalid name. Please make sure that it is in the following format: Areeb Majeed");

        } else if (!validateStudentNumber(formValues['student_number'])) {

            setError("You have written an student ID. It must start with 3 and must be of 7 digits. For example: 3827035");

        } else if (!validateProgramName(formValues['program_name'])) {

            setError("You have written an invalid course name. The course name must start with a capital B. For example: Bachelor of IT");

        } else {

            // Do something:


            // Hide the error:

            setError(null);

        }

        e.preventDefault();

    }

    return (
        <div className="container pt-5 pb-5">

            <h2>Report Card Generator</h2>

            <br/>

            {error !== null && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={e => handleSubmit(e)}>

                <div className="row">

                    <div className="col-6">

                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" name="full_name" placeholder=""/>
                        </Form.Group>

                    </div>

                    <div className="col-6">

                        <Form.Group className="mb-3">
                            <Form.Label>Student Number</Form.Label>
                            <Form.Control type="text" name="student_number" placeholder=""/>
                        </Form.Group>

                    </div>

                </div>

                <div className="row">

                    <div className="col-6">

                        <Form.Group className="mb-3">
                            <Form.Label>Program Name</Form.Label>
                            <Form.Control type="text" name="program_name" placeholder=""/>
                        </Form.Group>

                    </div>

                </div>

                <hr/>

                {courses.map((course) =>

                    <div className="row">

                        <div className="col-8">

                            <Form.Group className="mb-3">
                                <Form.Label>Course Name</Form.Label>
                                <Form.Control type="text" defaultValue={course.name}/>
                            </Form.Group>

                        </div>

                        <div className="col-4">

                            <Form.Group className="mb-3">
                                <Form.Label>Score</Form.Label>
                                <Form.Control type="text" name={course.name + "_score"} defaultValue={course.score}/>
                            </Form.Group>

                        </div>

                    </div>
                )}

                <Button variant="primary" type="submit">
                    Generate
                </Button>

            </Form>

        </div>
    );

}

export default App;
