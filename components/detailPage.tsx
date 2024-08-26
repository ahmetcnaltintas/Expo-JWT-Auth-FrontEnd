import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const TaskDetailScreen = () => {
  const params = useLocalSearchParams();
  const { id, title, description } = params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID: <Text style={styles.value}>{id}</Text></Text>
      <Text style={styles.label}>Title: <Text style={styles.value}>{title}</Text></Text>
      <Text style={styles.label}>Description: <Text style={styles.value}>{description}</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: 'normal',
  },
});

export default TaskDetailScreen;
