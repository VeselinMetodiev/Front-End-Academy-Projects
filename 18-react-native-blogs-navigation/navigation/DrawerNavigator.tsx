/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import * as React from 'react';
import { Button, ColorSchemeName, Linking } from 'react-native';

import ModalScreen from '../screens/ModalScreen';
import LinkingConfiguration from './LinkingConfiguration';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerScreenProps } from '@react-navigation/drawer';
import AboutScreen from '../screens/AboutScreen';
import { Post } from '../model/posts.model';
import { RootTabParamList, TabNavigator, TabNavigatorProps } from './TabNavigator';
import PostFormScreen from '../screens/PostFormScreen';
import { FormCancelListener, FormComponentListener } from '../components/formbuilder/form-types';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

interface NavigationProps extends TabNavigatorProps {
  colorScheme: ColorSchemeName;
  initialValue: Post;
  onSubmit: FormComponentListener<Post>;
  onCancel?: FormCancelListener;
}


// export type RootStackParamList = {
//   Posts: NavigatorScreenParams<RootTabParamList> | undefined;
//   Modal: undefined;
//   NotFound: undefined;
// };

// export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
//   RootStackParamList,
//   Screen
// >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootDrawerParamList { }
  }
}

export type RootDrawerParamList = {
  Posts: NavigatorScreenParams<RootTabParamList> | undefined;
  PostsForm: undefined; //Vesko
  About: undefined;
  // Stack: NavigatorScreenParams<RootStackParamList> | undefined;
  Modal: undefined;
}

export type MyDrawerScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  MaterialTopTabScreenProps<RootTabParamList, Screen>,
  DrawerScreenProps<RootDrawerParamList>
>;

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

export default function DrawerNavigator({ colorScheme, ...rest }: NavigationProps) {
  // const dimensions = useWindowDimensions();
  // const isLargeScreen = dimensions.width >= 768;
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? MyDarkTheme : DefaultTheme}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: '#2e78b7',
            width: 240,
          },
          headerStyle: {
            backgroundColor: '#888',
            
          }
          
        }}
      // screenOptions={{
      //   drawerType: isLargeScreen ? 'permanent' : 'back',
      //   drawerStyle: isLargeScreen ? null : { width: '100%' },
      //   overlayColor: 'transparent',
      // }}
      >
        <Drawer.Screen name="Posts">
          {(props) => <TabNavigator {...props} {...rest} />}
        </Drawer.Screen>
        <Drawer.Screen name="PostsForm">
          {(props) => <PostFormScreen {...props} {...rest} />}
        </Drawer.Screen>
        <Drawer.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
        {/* <Drawer.Screen name="Stack" component={RootNavigator} /> */}
        <Drawer.Group>
          <Drawer.Screen name="Modal" component={ModalScreen} />
        </Drawer.Group>
      </Drawer.Navigator>
      {/* <RootNavigator /> */}
    </NavigationContainer>
  );
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={({ focused, color, size }) =>
          <FontAwesome color={color} size={size} name={(focused ? 'heart' : 'heart-o') as any} />
        }
        label="Drawer Help ..."
        onPress={() => Linking.openURL('https://reactnavigation.org/docs/drawer-navigator')}
      />
      <Button
        title="Close Drawer"
        onPress={() => {
          // Navigate using the `navigation` prop that you received
          navigation.closeDrawer();
        }}
      />
    </DrawerContentScrollView>
  );
}

