import { DrawerScreenProps } from '@react-navigation/drawer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootDrawerParamList } from '../navigation/DrawerNavigator';
import { StackParamList } from '../navigation/StackNavigator';

type NotFoundScreenProps = NativeStackScreenProps<StackParamList, 'NotFound'>

export default function NotFoundScreen({ navigation }: NotFoundScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Tabs')} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
