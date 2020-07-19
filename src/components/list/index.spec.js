import React from 'react'
import {render, fireEvent, screen, getAllByRole} from '@testing-library/react'
import CardList from './index'


test('Should render empty CardList', () => {
   
    const {getByRole} = render(<CardList data={new Map()} />)

    const cardList = getByRole("list");

    expect(cardList).toBeInTheDocument()
 })


  test('Should render CardList with 2 card', () => {
   
    let list = new Map();
    list.set(1, {name:'title', role:'role', summary:"job summary"});
    list.set(2, {name:'title', role:'role', summary:"job summary"});

    const {getByRole, getAllByText} = render(<CardList data={list} titleKey="title" subTitleKey="role" contentKey="summary" />)

    const cardList = getAllByText("job summary");

    expect(cardList).not.toBeNull()
    expect(cardList.length).toBe(2);

  })