/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigationContainerRef,
} from "@react-navigation/native";
import * as React from "react";
import {
  Button,
  ColorSchemeName,
  Linking,
  Pressable,
  StyleSheet,
} from "react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AboutScreen from "../screens/AboutScreen";
import { LoggedUserData } from "../model/sign-in";
import { StackNavigator } from "./StackNavigator";
import { DrawerParamList } from "../model/drawer-types";
import { Text } from "../components/Themed";
import { useReduxDevToolsExtension } from "@react-navigation/devtools";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import UserListScreen from "../screens/UserListScreen";
import AddNewUserScreen from "../screens/AddNewUserScreen";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { fetchUsersStart, fetchUsersSuccess, UserAction } from "../redux/actions/actions";
import { useEffect } from "react";
import { StoreState } from "../redux/reducers";
import { connect } from "react-redux";

/* DrawerNavigator types */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList {}
  }
}

interface MainProps {
  colorScheme: ColorSchemeName;
  onLoad: () => void;
}

function mapDispatchToProps(dispatch: React.Dispatch<UserAction>) {
  return {
      onLoad: dispatch(fetchUsersStart()),
      colorScheme: DefaultTheme,
  }
}

function mapStateToProps(state : StoreState) {
  return {
      
  }
}

interface MainState {
  loggedUser: LoggedUserData | undefined;
}

const Drawer = createDrawerNavigator<DrawerParamList>();

/* Main app component */
function Main() {

  useEffect(() => {
    dispatch(fetchUsersStart())
  }, [])
  
  const loggedUser = useAppSelector(
    (state: RootState) => state.users.loggedUser
  );
  const state = useAppSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();
  // Redux-Devtools integration
  const navigationRef = useNavigationContainerRef();
  useReduxDevToolsExtension(navigationRef);

  // const dimensions = useWindowDimensions();
  // const isLargeScreen = dimensions.width >= 768;
  
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
    >
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerType: "front",
          drawerStyle: {
            // backgroundColor: '#c6cbef',
            width: 240,
          },
          headerRight: () =>
            state.loggedUser && (
              <Pressable
                style={styles.signoutButton}
                onPress={() => console.log("log out")}
              >
                <Text style={styles.signoutButtonText}>Sign Out</Text>
              </Pressable>
            ),
        }}
        // screenOptions={{
        //   drawerType: isLargeScreen ? 'permanent' : 'back',
        //   drawerStyle: isLargeScreen ? null : { width: '100%' },
        //   overlayColor: 'transparent',
        // }}
      >
        <Drawer.Screen
          name="Stack"
          component={StackNavigator}
          options={{
            title: `My Blogs ${
              state?.loggedUser
                ? ": Welcome " + state?.loggedUser?.user.firstName + "!"
                : ""
            }`,
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          options={{ title: "Home" }}
        />
        <Drawer.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: "Sign-in" }}
        />
        <Drawer.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: "Sign-up" }}
        />
        {state.loggedUser &&
        <>
        <Drawer.Screen
          name="UsersList"
          component={UserListScreen}
          options={{ title: "Users List" }}
        />
        <Drawer.Screen
          name="AddNewUser"
          component={AddNewUserScreen}
          options={{ title: "Add New User" }}
        /> 
        </>
}
        <Drawer.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Drawer.Navigator>
      {/* <RootNavigator /> */}
    </NavigationContainer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={({ focused, color, size }) => (
          <FontAwesome
            color={color}
            size={size}
            name={(focused ? "heart" : "heart-o") as any}
          />
        )}
        label="Drawer Help ..."
        onPress={() =>
          Linking.openURL("https://reactnavigation.org/docs/drawer-navigator")
        }
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

const styles = StyleSheet.create({
  signoutButton: {
    backgroundColor: "#B2C8DF",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  signoutButtonText: {
    fontSize: 20,
  },
});
