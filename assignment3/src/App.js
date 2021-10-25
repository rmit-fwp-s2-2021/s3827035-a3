import React, {useEffect} from "react";
import {Form, Button} from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

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

    return (
        <div className="container pt-5 pb-5">

            <h2>Report Card Generator</h2>

            <br/>

            <Form>

                <div className="row">

                    <div className="col-6">

                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder=""/>
                        </Form.Group>

                    </div>

                    <div className="col-6">

                        <Form.Group className="mb-3">
                            <Form.Label>Student Number</Form.Label>
                            <Form.Control type="text" placeholder=""/>
                        </Form.Group>

                    </div>

                </div>

                <div className="row">

                    <div className="col-6">

                        <Form.Group className="mb-3">
                            <Form.Label>Program Name</Form.Label>
                            <Form.Control type="text" placeholder=""/>
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
                                <Form.Control type="text" defaultValue={course.score}/>
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
