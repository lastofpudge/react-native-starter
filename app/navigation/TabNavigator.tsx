// app/navigation/TabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CartScreen from '@/screens/cart'
import CatalogScreen from '@/screens/catalog'
import ProductScreen from '@/screens/product'
import ProfileScreen from '@/screens/profile'
import { useCartStore } from '@/stores/useCartStore'
import { theme } from '@/theme'
import type { ICatalogStackParamList, ITabParamList } from '@/types/navigation'

const CatalogStack = createNativeStackNavigator<ICatalogStackParamList>()

const CatalogNavigator = () => (
  <CatalogStack.Navigator screenOptions={{ headerShown: false }}>
    <CatalogStack.Screen name='CatalogScreen' component={CatalogScreen} />
    <CatalogStack.Screen name='ProductScreen' component={ProductScreen} />
  </CatalogStack.Navigator>
)

const Tab = createBottomTabNavigator<ITabParamList>()

const TabNavigator = () => {
  const totalItems = useCartStore((s) => s.totalItems)

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: { borderTopColor: theme.colors.border },
      }}
    >
      <Tab.Screen
        name='Catalog'
        component={CatalogNavigator}
        options={{ title: 'Каталог' }}
      />
      <Tab.Screen
        name='Cart'
        component={CartScreen}
        options={{
          title: 'Корзина',
          tabBarBadge: totalItems() > 0 ? totalItems() : undefined,
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{ title: 'Профиль' }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
