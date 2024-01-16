import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ParamListBase, RouteProp, useTheme } from '@react-navigation/native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import useAppTheme from '../hooks/useAppTheme';
import { Colors, gStyles } from '../constans';
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import { TabNavigatorParamList } from './navigation.type';
import { scale } from 'react-native-size-matters';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabBarIcon = (props:{focused: boolean; color: string; size: number; cameFrom: string}) => {
    const size = props.focused ? props.size + 4 : props.size;

    const icon = () => {
        switch(props.cameFrom){
            case 'Home':
                return <AntDesign name="home" size={size} color={props.color} />
            case 'Search':
                return <AntDesign name="search1" size={size} color={props.color} />
            case 'NewPost':
                return <AntDesign name="plus" size={size} color={props.color} />
            case 'Reels':
                return <Entypo name="video" size={size} color={props.color} />
            case 'Profile':
                return <FontAwesome5 name="user-circle" size={size} color={props.color} />
            default:
                return null;
        }
    }

    return (
        <View style={{ 
            height: 70,
            marginTop: Platform.OS === 'ios'
                        ? initialWindowMetrics?.insets.bottom || 0
                        : 0,
            justifyContent: 'center',
            alignItems: 'center',
            }}>
            {icon()}
        </View>
    )

}
// home - search - new post - reels - profile
const TabStack = () => {
    const { themeColors } = useAppTheme();

    const navigatorScreenOptions:
        | BottomTabNavigationOptions
		| ((props: {
				route: RouteProp<ParamListBase, string>;
				navigation: any;
		  }) => BottomTabNavigationOptions)
		| undefined = {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                bottom:
                    Platform.OS === 'ios'
                        ? initialWindowMetrics?.insets.bottom || 10
                        : 10,
                left: scale(16),
                right: scale(16),
                borderRadius: 15,
                height: 70,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: themeColors.tabBarColor,
                ...gStyles.smallShadow,
            },
        }
    const tabScreenOptions = (cameFrom: string): BottomTabNavigationOptions => {

        return {
            tabBarIcon: (props) => <TabBarIcon {...props} cameFrom={cameFrom} />,
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.gray,
            
        }
    }

  return (
    <Tab.Navigator backBehavior='none' screenOptions={navigatorScreenOptions} initialRouteName='Home' >
        <Tab.Screen 
            name='Home' 
            component={() => (<SafeAreaView><Text>Home</Text></SafeAreaView>)} 
            options={tabScreenOptions('Home')}
        />
        <Tab.Screen 
            name='Search' 
            component={SearchScreen} 
            options={tabScreenOptions('Search')}
        />
        <Tab.Screen 
            name='NewPost' 
            component={() => (<SafeAreaView><Text>NewPost</Text></SafeAreaView>)} 
            options={tabScreenOptions('NewPost')}
        />
        <Tab.Screen 
            name='Reels' 
            component={() => (<SafeAreaView><Text>Reels</Text></SafeAreaView>)} 
            options={tabScreenOptions('Reels')}
        />
        <Tab.Screen 
            name='Profile' 
            component={ProfileScreen} 
            options={tabScreenOptions('Profile')}
        />
    </Tab.Navigator>
  )
}

export default TabStack

const styles = StyleSheet.create({})