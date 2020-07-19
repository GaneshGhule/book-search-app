import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import AutoComplete from './index'


test('Should render autoComplete', () => {
  const placeholder = 'Search...'
  const { getByRole } = render(<AutoComplete label={placeholder} loadOptions={() => { }} onSelect={() => { }} onChange={() => {}}/>)

  const autoComplete = getByRole("listbox");

  const input = getByRole("textbox");

  expect(autoComplete).toBeInTheDocument()

  expect(input).toBeInTheDocument()
})


test('Should render autoComplete and fire event', () => {
  const placeholder = 'Search...'
  let selected = null;

  const { getByRole, getByText } = render(
    <AutoComplete label={placeholder}
      loadOptions={(text, limit) => {
        return [{ name: 'Test' }, { name: 'Test1' }]
      }}
      onSelect={() => { }}
      optionLabelKey={"name"}
      delay={0}
      onChange={() => {}}
    />
  );

  const autoComplete = getByRole("listbox");

  const input = getByRole("textbox");

  expect(autoComplete).toBeInTheDocument()

  expect(input).toBeInTheDocument()

  fireEvent.focus(input);

  fireEvent.change(input, {
    target: { value: 'test' },
  });

  const options = getByRole("listbox");

  expect(options).toBeInTheDocument()

})