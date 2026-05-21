import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  onPress,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  
  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderRadius: 9999,
      paddingVertical: size === 'sm' ? 8 : size === 'lg' ? 16 : 12,
      paddingHorizontal: size === 'sm' ? 12 : size === 'lg' ? 24 : 16,
      opacity: disabled ? 0.5 : 1,
      backgroundColor: isPrimary ? '#4ade80' : '#1e293b',
      borderWidth: isPrimary ? 0 : 1,
      borderColor: isPrimary ? 'transparent' : '#374151',
    },
    text: {
      fontWeight: '700',
      fontSize: size === 'sm' ? 12 : size === 'lg' ? 18 : 14,
      color: isPrimary ? '#000' : '#ffffff',
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.button}>
        {icon}
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}
