import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuthCTA from '../AuthCTA';

describe('AuthCTA', () => {
  const defaultProps = {
    buttonLabel: 'Siguiente',
    onButtonPress: jest.fn(),
    footerText: '¿Ya tenés cuenta?',
    footerLinkText: 'Iniciá sesión',
    onFooterLinkPress: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it('renderiza el label del botón', () => {
    const { getByText } = render(<AuthCTA {...defaultProps} />);
    expect(getByText('Siguiente')).toBeTruthy();
  });

  it('renderiza el texto y link del footer', () => {
    const { getByText } = render(<AuthCTA {...defaultProps} />);
    expect(getByText('¿Ya tenés cuenta?')).toBeTruthy();
    expect(getByText('Iniciá sesión')).toBeTruthy();
  });

  it('llama a onButtonPress al presionar el botón', () => {
    const { getByText } = render(<AuthCTA {...defaultProps} />);
    fireEvent.press(getByText('Siguiente'));
    expect(defaultProps.onButtonPress).toHaveBeenCalledTimes(1);
  });

  it('llama a onFooterLinkPress al presionar el link', () => {
    const { getByText } = render(<AuthCTA {...defaultProps} />);
    fireEvent.press(getByText('Iniciá sesión'));
    expect(defaultProps.onFooterLinkPress).toHaveBeenCalledTimes(1);
  });

  it('deshabilita el botón cuando buttonDisabled es true', () => {
    const { getByText } = render(<AuthCTA {...defaultProps} buttonDisabled />);
    fireEvent.press(getByText('Siguiente'));
    expect(defaultProps.onButtonPress).not.toHaveBeenCalled();
  });
});
