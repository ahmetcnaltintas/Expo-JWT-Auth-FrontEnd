import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import TodoItem from '../../components/TodoItem';;
import { Todo } from '../../types';

export default function Setting() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Welcome, {user?.name}!</Text>
      <Button title="Add Todo" />
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem todo={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});