import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Button from './index'

test('Should render button', () => {
    const buttonLabel = 'Submit'
    const {getByText} = render(<Button label={buttonLabel} onClick={() => {}} />)

    const button = getByText(buttonLabel);

    expect(button).toBeInTheDocument()
  })


  test('Should render button and fire click event', () => {
    const buttonLabel = 'Submit'
    let clicked = false;
    const {getByText} = render(<Button label={buttonLabel} onClick={() => {clicked= true}}/>)

    const button = getByText(buttonLabel);

    expect(button).toBeInTheDocument()
  

    fireEvent.click(button);

    expect(clicked).toBe(true);
  })