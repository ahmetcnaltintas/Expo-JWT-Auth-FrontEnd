import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function TaskDetail() {
  const { id, title, description } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID:</Text>
      <Text style={styles.value}>{id}</Text>
      <Text style={styles.label}>Title:</Text>
      <Text style={styles.value}>{title}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
    color: '#555',
  },
});
