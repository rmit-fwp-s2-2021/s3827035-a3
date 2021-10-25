import {render, screen} from '@testing-library/react';
import App from './App';
import React from "react";
import {fireEvent} from "@testing-library/dom";

// This test fills the required form inputs such as name, student ID and program name
// After filling the form inputs, it presses the submit button
// After submitting the button, it checks whether the expected GPA of 3.9 is present on the page or not

test('fill the form and get the GPA', () => {

    // Render the App

    const page = render(<App/>);

    // Select the fields that we need to fill

    const nameInput = page.getByLabelText('full_name');
    const studentIdInput = page.getByLabelText('student_number');
    const programInput = page.getByLabelText('program_name');

    // Set the input in these fields

    fireEvent.change(nameInput, {target: {value: 'Areeb Majeed'}});
    fireEvent.change(studentIdInput, {target: {value: '3827035'}});
    fireEvent.change(programInput, {target: {value: 'Bachelor of Information Technology'}});

    // Select the button and click on it

    const button = screen.getByText('Generate');
    fireEvent.click(button);

    // Read the screen and find 3.9 (i.e., GPA)

    const expectedGpa = screen.getByText(/3.9/i);

    // Expect the GPA to be in the document

    expect(expectedGpa).toBeInTheDocument();

});