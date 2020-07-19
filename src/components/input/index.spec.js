import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import Input from './index'

test('Should render input', () => {
    const inputPlaceholder = 'Search...'

    const onChange = () => {};

    const {getByPlaceholderText} = render(<Input onChange={onChange} className="test-input" label={inputPlaceholder}/>)

    const input = getByPlaceholderText(inputPlaceholder);

    expect(input).toBeInTheDocument()
  })


  test('Should render input and fire onchange', () => {
    const inputPlaceholder = 'Search...'

    const onChange = () => {};

    const {getByPlaceholderText} = render(<Input onChange={onChange} className="test-input" label={inputPlaceholder}/>)

    const input = getByPlaceholderText(inputPlaceholder);

    expect(input).toBeInTheDocument()
  
    fireEvent.change(input, {
        target: {value: 'test'},
    });

    expect(input.value).toBe('test');
  })