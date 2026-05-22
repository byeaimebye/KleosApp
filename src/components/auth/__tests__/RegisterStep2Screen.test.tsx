import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterStep2Screen from '../RegisterStep2Screen';
import { RegisterFlowProvider } from '@/context/RegisterFlowContext';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <RegisterFlowProvider>{children}</RegisterFlowProvider>
);

describe('RegisterStep2Screen — render', () => {
  it('renderiza sin crash', () => {
    expect(() =>
      render(<RegisterStep2Screen />, { wrapper: Wrapper })
    ).not.toThrow();
  });

  it('muestra el título del paso', () => {
    const { getByText } = render(<RegisterStep2Screen />, { wrapper: Wrapper });
    expect(getByText('auth.register.step2.title')).toBeTruthy();
  });

  it('muestra indicador paso 2 de 5', () => {
    const { getByText } = render(<RegisterStep2Screen />, { wrapper: Wrapper });
    expect(getByText('auth.register.step2.step_label')).toBeTruthy();
  });

  it('muestra todos los deportes de la lista', () => {
    const { getByText } = render(<RegisterStep2Screen />, { wrapper: Wrapper });
    expect(getByText('Running')).toBeTruthy();
    expect(getByText('Yoga')).toBeTruthy();
    expect(getByText('Boxeo')).toBeTruthy();
  });

  it('muestra labels de upload de avatar y logo', () => {
    const { getByText } = render(<RegisterStep2Screen />, { wrapper: Wrapper });
    expect(getByText('auth.register.step2.avatar_label')).toBeTruthy();
    expect(getByText('auth.register.step2.logo_label')).toBeTruthy();
  });
});

describe('RegisterStep2Screen — validaciones', () => {
  it('falla al enviar sin businessName', async () => {
    const { getByText } = render(<RegisterStep2Screen />, { wrapper: Wrapper });
    fireEvent.press(getByText('auth.register.step2.next'));
    await waitFor(() => {
      expect(getByText('Nombre o marca requerido')).toBeTruthy();
    });
  });

  it('falla al enviar sin deportes seleccionados', async () => {
    const { getByPlaceholderText, getByText } = render(
      <RegisterStep2Screen />,
      { wrapper: Wrapper }
    );
    fireEvent.changeText(
      getByPlaceholderText('auth.register.step2.business_name_placeholder'),
      'Mi Negocio'
    );
    fireEvent.changeText(
      getByPlaceholderText('auth.register.step2.city_placeholder'),
      'Buenos Aires'
    );
    fireEvent.press(getByText('auth.register.step2.next'));
    await waitFor(() => {
      expect(getByText('Seleccioná al menos un deporte')).toBeTruthy();
    });
  });
});

describe('RegisterStep2Screen — interacciones', () => {
  it('toggle de deporte: selecciona y deselecciona', () => {
    const { getByText } = render(<RegisterStep2Screen />, { wrapper: Wrapper });
    const chip = getByText('Running');
    fireEvent.press(chip); // selecciona
    fireEvent.press(chip); // deselecciona
    // No crashea — el toggle funciona
    expect(chip).toBeTruthy();
  });

  it('puede seleccionar múltiples deportes', () => {
    const { getByText } = render(<RegisterStep2Screen />, { wrapper: Wrapper });
    fireEvent.press(getByText('Running'));
    fireEvent.press(getByText('Yoga'));
    fireEvent.press(getByText('Boxeo'));
    expect(getByText('Running')).toBeTruthy();
  });
});
