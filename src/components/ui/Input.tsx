import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '@/constants/colors';
import { radius, typography } from '@/constants/theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  required?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'number-pad' | 'phone-pad';
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  required = false,
  autoCapitalize = 'sentences',
  keyboardType = 'default',
  leftElement,
  rightElement,
}: InputProps) {
  return (
    <View style={s.wrapper}>
      {label && (
        <View style={s.labelRow}>
          <Text style={typography.label}>{label}</Text>
          {required && <Text style={s.asterisk}> *</Text>}
        </View>
      )}
      <View style={[s.row, error ? s.rowError : s.rowDefault]}>
        {leftElement}
        <TextInput
          style={s.input}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.35)"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          autoCorrect={false}
        />
        {rightElement}
      </View>
      {error && <Text style={typography.error}>{error}</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  asterisk: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.danger,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 52,
    gap: 10,
  },
  rowDefault: {
    borderColor: colors.inputBorder,
  },
  rowError: {
    borderColor: colors.danger,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.foreground,
    height: '100%',
  },
});
