import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cadastros from '../Componentes/Cadastros/Cadastros.js';

describe('Cadastros', () => {
  const props = {
    id: 'exampleId',
    label: 'Example Label',
    icon: () => <div className="example-icon" />,
    type: 'text',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
    onChange: jest.fn(),
  };

  it('renders label and input correctly', () => {
    const { getByLabelText, getByRole } = render(<Cadastros {...props} />);
    const label = getByLabelText('Example Label');
    const input = getByRole('textbox', { id: 'exampleId' });

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    const { container } = render(<Cadastros {...props} />);
    const icon = container.querySelector('.example-icon');

    expect(icon).toBeInTheDocument();
  });

  it('renders select options when type is "select"', () => {
    const { getByRole } = render(<Cadastros {...props} type="select" />);
    const select = getByRole('combobox');

    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent('Option 1');
    expect(select).toHaveTextContent('Option 2');
  });

  it('calls onChange callback when input/select value changes', () => {
    const { getByRole } = render(<Cadastros {...props} />);
    const input = getByRole('textbox', { id: 'exampleId' });

    fireEvent.change(input, { target: { value: 'example value' } });

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
