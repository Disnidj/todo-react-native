import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Screen/Home';
import Detail from './Screen/UpdateToDoList';
import LoginScreen from "./Screen/Login";


const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name='Login or Register ' 
          component={LoginScreen} 
        />
                <Stack.Screen name={'Home'} component={Home} />
   
        <Stack.Screen 
          name='Detail'
          component={Detail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

