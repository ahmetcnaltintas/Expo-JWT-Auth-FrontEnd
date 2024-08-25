import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggle && onToggle(todo.id)}>
        <Text style={[styles.title, todo.completed && styles.completed]}>{todo.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete && onDelete(todo.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    color: 'red',
  },
});

export default TodoItem;