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
import StackNavigator, { StackParamList } from './StackNavigator';
import NotFoundScreen from '../screens/NotFoundScreen';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

interface NavigationProps extends TabNavigatorProps {
  colorScheme: ColorSchemeName;
  initialValue: Post;
  onSubmit: FormComponentListener<Post>;
  onCancel?: FormCancelListener;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootDrawerParamList { }
  }
}

export type RootDrawerParamList = {
  Posts: NavigatorScreenParams<StackParamList> | undefined;
  PostsForm: undefined;
  About: undefined;
  Modal: undefined;
  NotFound: undefined;
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
      >
        <Drawer.Screen name="Posts">
          {(props) => <StackNavigator {...props} {...rest} />}
        </Drawer.Screen>
        <Drawer.Screen name="PostsForm">
          {(props) => <PostFormScreen {...props} {...rest} />}
        </Drawer.Screen>
        <Drawer.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
        {/* <Drawer.Screen name="Stack" component={RootNavigator} /> */}
        <Drawer.Group>
          <Drawer.Screen name="Modal" component={ModalScreen} />
        </Drawer.Group>
        <Drawer.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
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


