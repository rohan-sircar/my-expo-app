import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface StatTileProps {
  value: string;
  title: string;
}

const StatTile: React.FC<StatTileProps> = ({ value, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 100,
    paddingHorizontal: 16,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },
  title: {
    color: '#888',
    textAlign: 'center',
  },
});

export default StatTile;
