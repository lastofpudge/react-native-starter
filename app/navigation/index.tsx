import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '@/screens/home'
import type { IRootStackParamList } from './IRootStackParamList'

const Stack = createNativeStackNavigator<IRootStackParamList>()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
