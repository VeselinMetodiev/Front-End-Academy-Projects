import { DrawerScreenProps } from '@react-navigation/drawer';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { MyDrawerScreenProps, RootDrawerParamList } from '../navigation/DrawerNavigator';

type AboutScreenProps = DrawerScreenProps<RootDrawerParamList, 'About'>

export default function AboutScreen({ navigation }: AboutScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About this App</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Posts')} style={styles.link}>
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
