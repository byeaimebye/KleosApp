import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '@/constants/colors';
import { radius, typography } from '@/constants/theme';

type AvatarSize = 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<AvatarSize, number> = { sm: 56, md: 80, lg: 96 };

interface AvatarUploadProps {
  uri: string | null;
  onSelect: (uri: string) => void;
  label?: string;
  size?: AvatarSize;
}

export default function AvatarUpload({
  uri,
  onSelect,
  label,
  size = 'md',
}: AvatarUploadProps) {
  const dim = SIZE_MAP[size];

  const handlePress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      onSelect(result.assets[0].uri);
    }
  };

  return (
    <View style={s.wrapper}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        style={[
          s.circle,
          { width: dim, height: dim, borderRadius: dim / 2 },
        ]}
      >
        {uri ? (
          <Image
            source={{ uri }}
            style={[s.image, { width: dim, height: dim, borderRadius: dim / 2 }]}
          />
        ) : (
          <Text style={s.icon}>📷</Text>
        )}

        {/* Overlay */}
        <View style={[s.overlay, { borderRadius: dim / 2 }]}>
          <Text style={s.overlayIcon}>📷</Text>
        </View>
      </TouchableOpacity>

      {label && <Text style={[typography.caption, s.label]}>{label}</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 8,
  },
  circle: {
    backgroundColor: colors.inputBg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(196,255,14,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
  },
  icon: {
    fontSize: 28,
    opacity: 0.6,
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
  },
  overlayIcon: {
    fontSize: 20,
    color: colors.foreground,
  },
  label: {
    textAlign: 'center',
  },
});
