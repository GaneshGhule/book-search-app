import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import Card from './index'


test('Should render card', () => {
    const title = 'Test Book';
    const subTitle  = 'Test Author';
    const content   = 'Test book summary';
    const {getByText} = render(<Card title={title} subtitle={subTitle} content={content} />)

    const card = getByText(title);

    expect(card).toBeInTheDocument()
  })