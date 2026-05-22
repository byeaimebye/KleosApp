import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SportChip from '../SportChip';

describe('SportChip', () => {
  it('renderiza el label correctamente', () => {
    const { getByText } = render(
      <SportChip label="Running" selected={false} onToggle={() => {}} />
    );
    expect(getByText('Running')).toBeTruthy();
  });

  it('llama a onToggle al presionar', () => {
    const onToggle = jest.fn();
    const { getByText } = render(
      <SportChip label="Yoga" selected={false} onToggle={onToggle} />
    );
    fireEvent.press(getByText('Yoga'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('renderiza en estado seleccionado', () => {
    const { getByText } = render(
      <SportChip label="Boxeo" selected={true} onToggle={() => {}} />
    );
    expect(getByText('Boxeo')).toBeTruthy();
  });

  it('renderiza en estado no seleccionado', () => {
    const { getByText } = render(
      <SportChip label="CrossFit" selected={false} onToggle={() => {}} />
    );
    expect(getByText('CrossFit')).toBeTruthy();
  });
});
