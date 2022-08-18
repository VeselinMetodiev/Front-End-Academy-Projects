import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import UserList from './components/UserList';

export default function App() {
  const [currency, setCurrency] = useState('US Dollar');
  return (
    <View style={styles.container}>
    <RegistrationForm/>
    <UserList users={[]} filter={undefined} onUpdate={() => alert('Updated')} onDelete={() => alert('Deleted')} onEdit={() => alert('Deleted')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
