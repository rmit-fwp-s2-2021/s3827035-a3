import React, {useMemo, useState} from "react";
import {Form, Button, Alert, Table} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const [error, setError] = useState(null);
    const [generated, setGenerated] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const [subjectScores, setSubjectScores] = useState([]);

    const courses = [
        {"name": "Practical Database Concepts", "score": 94},
        {"name": "User-centred Design", "score": 71},
        {"name": "Introduction to Programming", "score": 99},
        {"name": "Intro to Info Technology", "score": 95},
        {"name": "Building IT Systems", "score": 93},
        {"name": "Intro to Computer Systems", "score": 98},
        {"name": "Web Programming", "score": 96},
        {"name": "Programming 1", "score": 88}
    ];

    const generateReportCard = (userDetails, subjectScores) => {

        // Initialize a total grade points with 0 default value

        let gradePoints = 0;

        // Loop through each subject

        for (let x = 0; x < subjectScores.length; x++) {

            // Get the score of a subject and set the GPA to 0

            let score = subjectScores[x].score;
            let gpa = 0;
            let gpaTranslated = 'F';

            // Set the GPA of the individual subject

            if (score >= 80) {
                gpa = 4;
                gpaTranslated = 'HD';
            } else if (score >= 70) {
                gpa = 3;
                gpaTranslated = 'D';
            } else if (score >= 60) {
                gpa = 2;
                gpaTranslated = 'CR';
            } else if (score >= 50) {
                gpa = 1;
                gpaTranslated = 'P';
            }

            // Sum up the total grade points

            gradePoints += (gpa * 12);

            // Add the GPA of the subject to the array as well

            subjectScores[x].gpa_translated = gpaTranslated;

        }

        // Calculate the final GPA rounded to first significant unit

        let finalGpa = Math.round(gradePoints / (48 * 2) * 10) / 10;

        // Create an array with the information

        let data = {
            "full_name": userDetails['full_name'],
            "student_number": userDetails['student_number'],
            "program_name": userDetails['program_name'],
            "courses": subjectScores,
            "gpa": finalGpa
        };

        // Store the information in localStorage

        localStorage.setItem('report_card', JSON.stringify(data));

        return data;

    };

    // Use Memo to generate the report card
    // useMemo() hook is used to improve the performance of the application by caching the output of an expensive function
    // For example, a square function may take a considerable amount of time for large numbers. So memoization allows us to cache the output of the function and then return the same output quickly from the memory if the user enters the same input.

    const reportCard = useMemo(() => generateReportCard(userDetails, subjectScores), [userDetails, subjectScores]);

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

            // Create an array with scores and subject names

            let subjectScores = [];

            for (let x = 0; x < courses.length; x++) {

                subjectScores[x] = {
                    "name": courses[x].name,
                    "score": formValues[courses[x].name + "_score"]
                };

            }

            // Update States:

            setUserDetails({
                "full_name": formValues['full_name'],
                "student_number": formValues['student_number'],
                "program_name": formValues['program_name']
            });

            setSubjectScores(subjectScores);
            setGenerated(true);

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

            {generated === false ? (

                <Form onSubmit={e => handleSubmit(e)}>

                    <div className="row">

                        <div className="col-6">

                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" name="full_name" aria-label="full_name" placeholder=""/>
                            </Form.Group>

                        </div>

                        <div className="col-6">

                            <Form.Group className="mb-3">
                                <Form.Label>Student Number</Form.Label>
                                <Form.Control type="text" name="student_number" aria-label="student_number" placeholder=""/>
                            </Form.Group>

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-6">

                            <Form.Group className="mb-3">
                                <Form.Label>Program Name</Form.Label>
                                <Form.Control type="text" name="program_name" aria-label="program_name" placeholder=""/>
                            </Form.Group>

                        </div>

                    </div>

                    <hr/>

                    {courses.map((course) =>

                        <div className="row" key={course.name}>

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

                    <Button variant="primary" type="submit" id="submit">
                        Generate
                    </Button>

                </Form>
            ) : (

                <div>

                    <Table striped bordered hover>

                        <tbody>

                        <tr>
                            <td colSpan={2} className="text-center"><b>Student Information</b></td>
                        </tr>

                        <tr>
                            <td>Student Name</td>
                            <td>{reportCard.full_name}</td>
                        </tr>

                        <tr>
                            <td>Student ID</td>
                            <td>s{reportCard.student_number}</td>
                        </tr>

                        <tr>
                            <td>Program Name</td>
                            <td>{reportCard.program_name}</td>
                        </tr>

                        <tr>
                            <td colSpan={2} className="text-center"><b>Courses Completed</b></td>
                        </tr>

                        {reportCard.courses.map((course) =>
                            <tr key={course.name}>
                                <td>{course.name}</td>
                                <td>{course.score}/100 ({course.gpa_translated})</td>
                            </tr>
                        )}

                        <tr>
                            <td colSpan={2} className="text-center"><b>Final GPA</b></td>
                        </tr>

                        <tr>
                            <td>Cumulative GPA</td>
                            <td>{reportCard.gpa}</td>
                        </tr>

                        </tbody>
                    </Table>

                </div>

            )}

        </div>
    );

}

export default App;
