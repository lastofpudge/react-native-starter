import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type { NavigatorScreenParams } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

// Auth
export type IAuthStackParamList = {
  Login: undefined
}

// Catalog nested stack
export type ICatalogStackParamList = {
  CatalogScreen: undefined
  ProductScreen: { productId: number }
}

// Bottom tabs
export type ITabParamList = {
  Catalog: NavigatorScreenParams<ICatalogStackParamList>
  Cart: undefined
  Profile: undefined
}

// Root
export type IRootStackParamList = {
  Auth: NavigatorScreenParams<IAuthStackParamList>
  Main: NavigatorScreenParams<ITabParamList>
}

// Nav props для использования в экранах
export type CatalogNavProp = NativeStackNavigationProp<ICatalogStackParamList>
export type TabNavProp = BottomTabNavigationProp<ITabParamList>
