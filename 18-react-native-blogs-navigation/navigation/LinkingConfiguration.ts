/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { DrawerActionHelpers, LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootDrawerParamList } from './DrawerNavigator';

const linking: LinkingOptions<RootDrawerParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Posts: {
        screens: {
          Tabs: {
            screens: {
              TabOne: {
                screens: {
                  TabOneScreen: 'one',
                },
              },
              TabTwo: {
                screens: {
                  TabTwoScreen: 'two',
                },
              },
            }
          },
          PostDetails: 'details/:postId',
          NotFound: 'notfound',
        },
      },
      PostsForm: 'form',
      About: 'about',
      Modal: 'modal',
    },
  },
};

export default linking;
