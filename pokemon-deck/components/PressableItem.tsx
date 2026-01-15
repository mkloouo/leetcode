import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

interface PressableItemProps {
  title: string;
  pictureUrl: string;
  onPress: () => void;
}

export const PressableItem = ({
  title,
  pictureUrl,
  onPress,
}: PressableItemProps) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image
      source={{ uri: pictureUrl }}
      resizeMode="contain"
      width={96}
      height={96}
      style={{ width: 96, height: 96 }}
    />
    <Text>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
