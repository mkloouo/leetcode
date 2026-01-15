import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export interface NavBarItem {
  title: string;
  onPress: () => void;
}

interface NavBarProps {
  items: NavBarItem[];
}

export const NavBar = React.memo(
  ({ items }: NavBarProps) => {
    return (
      <View style={styles.container}>
        {items?.map((item) => (
          <TouchableOpacity style={styles.item} onPress={item.onPress}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  },
  (prev, next) => {
    const prevTitles = prev.items.map(({ title }) => title);
    const nextTitles = next.items.map(({ title }) => title);

    return prevTitles.every((value, index) => value === nextTitles[index]);
  }
);

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'black',
  },
});
