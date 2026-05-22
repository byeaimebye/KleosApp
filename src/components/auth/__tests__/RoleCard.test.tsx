import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import RoleCard from '../RoleCard';

const icon = <Text>🏆</Text>;

describe('RoleCard', () => {
  it('renderiza title y description', () => {
    const { getByText } = render(
      <RoleCard title="Coach" description="Gestioná atletas" icon={icon} onPress={() => {}} />
    );
    expect(getByText('Coach')).toBeTruthy();
    expect(getByText('Gestioná atletas')).toBeTruthy();
  });

  it('llama a onPress al presionar', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <RoleCard title="Coach" description="desc" icon={icon} onPress={onPress} />
    );
    fireEvent.press(getByText('Coach'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('no llama a onPress cuando está deshabilitado', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <RoleCard title="Atleta" description="desc" icon={icon} onPress={onPress} disabled />
    );
    fireEvent.press(getByText('Atleta'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('muestra badge de coming soon cuando está deshabilitado', () => {
    const { getByText } = render(
      <RoleCard
        title="Atleta"
        description="desc"
        icon={icon}
        onPress={() => {}}
        disabled
        comingSoonLabel="Próximamente"
      />
    );
    expect(getByText('Próximamente')).toBeTruthy();
  });

  it('muestra checkmark cuando está seleccionado', () => {
    const { getByText } = render(
      <RoleCard title="Coach" description="desc" icon={icon} onPress={() => {}} selected />
    );
    expect(getByText('✓')).toBeTruthy();
  });

  it('no muestra checkmark cuando no está seleccionado', () => {
    const { queryByText } = render(
      <RoleCard title="Coach" description="desc" icon={icon} onPress={() => {}} />
    );
    expect(queryByText('✓')).toBeNull();
  });
});
