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
 import { FormCancelListener, FormComponentListener } from '../components/formbuilder/form-types';
 import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { PostDetailsScreen } from '../screens/PostDetailsScreen';
import { RootDrawerParamList } from './DrawerNavigator';
import NotFoundScreen from '../screens/NotFoundScreen';
 
 const Stack = createNativeStackNavigator<StackParamList>();
 
 interface NavigationProps extends TabNavigatorProps {
   initialValue: Post;
   onSubmit: FormComponentListener<Post>;
   onCancel?: FormCancelListener;
 }
 
 export type StackParamList = {
   Tabs: NavigatorScreenParams<RootTabParamList> | undefined;
   PostDetails: {postId: number};
   NotFound: undefined;
 }
 
 const MyDarkTheme = {
   ...DarkTheme,
   colors: {
     ...DarkTheme.colors,
     primary: 'rgb(255, 45, 85)',
   },
 };
 
 // const dimensions = useWindowDimensions();
 export default function StackNavigator({navigation, route, ...rest }: DrawerScreenProps<RootDrawerParamList, 'Posts'> & NavigationProps) {
   // const isLargeScreen = dimensions.width >= 768;
   return (
       <Stack.Navigator>
         <Stack.Screen name="Tabs">
           {(props) => <TabNavigator {...props} {...rest} />}
         </Stack.Screen>
         <Stack.Screen name="PostDetails">
           {(props) => <PostDetailsScreen {...props} {...rest} />}
         </Stack.Screen>
         <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
     </Stack.Navigator>
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
 
 
 
