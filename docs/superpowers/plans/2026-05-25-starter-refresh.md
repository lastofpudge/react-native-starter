# Starter Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Обновить React Native / Expo стартер: убрать NativeWind, добавить тему, формы, табы и рабочий e-commerce пример.

**Architecture:** StyleSheet + theme объект вместо NativeWind. Root Stack условно рендерит Auth или Main (Tab Navigator) на основе `isAuthenticated` из Zustand. E-commerce экраны работают через TanStack Query + fakestoreapi.com.

**Tech Stack:** Expo SDK 54, React Native, TypeScript, React Navigation 7 (native-stack + bottom-tabs), TanStack Query v5, Zustand v5, react-hook-form + zod, expo-image, Biome

---

## Файлы плана

### Создать
- `app/theme/index.ts` — цвета, отступы, радиусы, типографика
- `app/types/product.ts` — `IProduct`, `ICartItem`
- `app/types/navigation.ts` — все типы навигации
- `app/components/ui/Button/index.tsx` + `styles.ts`
- `app/components/ui/Input/index.tsx` + `styles.ts`
- `app/components/ui/Card/index.tsx` + `styles.ts`
- `app/components/ui/Badge/index.tsx` + `styles.ts`
- `app/components/layout/styles.ts`
- `app/services/product.service.ts`
- `app/stores/useCartStore.ts`
- `app/navigation/TabNavigator.tsx`
- `app/screens/auth/index.tsx` + `styles.ts`
- `app/screens/catalog/index.tsx` + `styles.ts`
- `app/screens/product/index.tsx` + `styles.ts`
- `app/screens/cart/index.tsx` + `styles.ts`
- `app/screens/profile/index.tsx` + `styles.ts`

### Изменить
- `package.json` — удалить/добавить пакеты
- `metro.config.js` — убрать NativeWind обёртку
- `babel.config.js` — убрать NativeWind плагин если есть
- `tsconfig.json` — без изменений (пути остаются)
- `app/app.tsx` — убрать `import '../global.css'`
- `app/navigation/index.tsx` — conditional auth/main routing
- `app/navigation/IRootStackParamList.ts` — обновить типы
- `app/components/layout/index.tsx` — убрать `className`
- `app/stores/useAuthStore.ts` — без изменений
- `.env.example` — обновить API_URL
- `CLAUDE.md` — отразить новую структуру

### Удалить
- `tailwind.config.js`
- `global.css`
- `nativewind-env.d.ts`
- `app/services/post.service.ts`
- `app/screens/home/` (весь каталог)

---

## Task 1: Пакеты

**Files:**
- Modify: `package.json`

- [ ] **Удалить старые пакеты**

```bash
npm uninstall nativewind react-native-worklets @react-navigation/stack
npm uninstall --save-dev tailwindcss
```

- [ ] **Установить новые**

```bash
npx expo install expo-image @react-navigation/bottom-tabs
npm install react-hook-form zod @hookform/resolvers
```

- [ ] **Обновить существующие до последних совместимых**

```bash
npx expo install expo@latest expo-secure-store expo-status-bar react-native-reanimated react-native-safe-area-context react-native-screens react-native-svg
npm install @tanstack/react-query@latest zustand@latest @react-navigation/native@latest @react-navigation/native-stack@latest
```

- [ ] **Проверить `package.json`** — убедиться что нет `nativewind`, `tailwindcss`, `react-native-worklets`, `@react-navigation/stack`

- [ ] **Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: update dependencies, remove nativewind and tailwind"
```

---

## Task 2: Конфиги — чистка

**Files:**
- Delete: `tailwind.config.js`, `global.css`, `nativewind-env.d.ts`
- Modify: `metro.config.js`, `app/app.tsx`

- [ ] **Удалить файлы**

```bash
rm tailwind.config.js global.css nativewind-env.d.ts
```

- [ ] **Заменить `metro.config.js`**

```js
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
}

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
}

module.exports = config
```

- [ ] **Обновить `app/app.tsx`** — убрать строку `import '../global.css'`

```tsx
// app/app.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import Navigation from '@/navigation'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar style='auto' />
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

export default App
```

- [ ] **Обновить `.env.example`**

```env
EXPO_PUBLIC_API_URL=https://fakestoreapi.com
EXPO_PUBLIC_AUTH_API_URL=https://reqres.in/api
```

- [ ] **Commit**

```bash
git add -A
git commit -m "chore: remove nativewind config, simplify metro"
```

---

## Task 3: Тема

**Files:**
- Create: `app/theme/index.ts`

- [ ] **Создать `app/theme/index.ts`**

```ts
// app/theme/index.ts
export const theme = {
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#1A1A1A',
    textSecondary: '#6B6B6B',
    border: '#E0E0E0',
    error: '#FF3B30',
    success: '#34C759',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 999,
  },
  typography: {
    h1: { fontSize: 28, fontWeight: '700' as const },
    h2: { fontSize: 22, fontWeight: '600' as const },
    body: { fontSize: 16, fontWeight: '400' as const },
    caption: { fontSize: 12, fontWeight: '400' as const },
  },
} as const

export type Theme = typeof theme
```

- [ ] **Commit**

```bash
git add app/theme/index.ts
git commit -m "feat: add theme with colors, spacing, radius, typography"
```

---

## Task 4: Типы

**Files:**
- Create: `app/types/product.ts`
- Create: `app/types/navigation.ts`
- Modify: `app/navigation/IRootStackParamList.ts`

- [ ] **Создать `app/types/product.ts`**

```ts
// app/types/product.ts
export interface IProduct {
  id: number
  title: string
  price: number
  image: string
  description: string
  category: string
}

export interface ICartItem {
  product: IProduct
  quantity: number
}
```

- [ ] **Создать `app/types/navigation.ts`**

```ts
// app/types/navigation.ts
import type { NavigatorScreenParams } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

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
```

- [ ] **Обновить `app/navigation/IRootStackParamList.ts`**

```ts
// app/navigation/IRootStackParamList.ts
// Re-export из types для обратной совместимости
export type { IRootStackParamList } from '@/types/navigation'
```

- [ ] **Commit**

```bash
git add app/types/ app/navigation/IRootStackParamList.ts
git commit -m "feat: add product and navigation types"
```

---

## Task 5: UI-компоненты

**Files:**
- Create: `app/components/ui/Button/index.tsx`, `styles.ts`
- Create: `app/components/ui/Input/index.tsx`, `styles.ts`
- Create: `app/components/ui/Card/index.tsx`, `styles.ts`
- Create: `app/components/ui/Badge/index.tsx`, `styles.ts`

- [ ] **Создать `app/components/ui/Button/styles.ts`**

```ts
// app/components/ui/Button/styles.ts
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'

export const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: theme.colors.text,
  },
  ghostText: {
    color: theme.colors.primary,
  },
})
```

- [ ] **Создать `app/components/ui/Button/index.tsx`**

```tsx
// app/components/ui/Button/index.tsx
import type { FC } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, type TouchableOpacityProps } from 'react-native'
import { theme } from '@/theme'
import { styles } from './styles'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: ButtonVariant
  loading?: boolean
}

const variantTextStyle = {
  primary: styles.primaryText,
  secondary: styles.secondaryText,
  ghost: styles.ghostText,
} as const

const variantStyle = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
} as const

export const Button: FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...props
}) => {
  const isDisabled = disabled || loading

  return (
    <TouchableOpacity
      style={[styles.base, variantStyle[variant], isDisabled && styles.disabled, style]}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : theme.colors.primary} />
      ) : (
        <Text style={[styles.text, variantTextStyle[variant]]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}
```

- [ ] **Создать `app/components/ui/Input/styles.ts`**

```ts
// app/components/ui/Input/styles.ts
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: 48,
    ...theme.typography.body,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  error: {
    ...theme.typography.caption,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
})
```

- [ ] **Создать `app/components/ui/Input/index.tsx`**

```tsx
// app/components/ui/Input/index.tsx
import type { FC } from 'react'
import { Text, TextInput, View, type TextInputProps } from 'react-native'
import { styles } from './styles'

interface InputProps extends TextInputProps {
  label?: string
  error?: string
}

export const Input: FC<InputProps> = ({ label, error, style, ...props }) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}
```

- [ ] **Создать `app/components/ui/Card/styles.ts`**

```ts
// app/components/ui/Card/styles.ts
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'

export const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
})
```

- [ ] **Создать `app/components/ui/Card/index.tsx`**

```tsx
// app/components/ui/Card/index.tsx
import type { FC, PropsWithChildren } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

interface CardProps {
  onPress?: () => void
  style?: object
}

export const Card: FC<PropsWithChildren<CardProps>> = ({ children, onPress, style }) => {
  if (onPress) {
    return (
      <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.9}>
        {children}
      </TouchableOpacity>
    )
  }
  return <View style={[styles.card, style]}>{children}</View>
}
```

- [ ] **Создать `app/components/ui/Badge/styles.ts`**

```ts
// app/components/ui/Badge/styles.ts
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'

export const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.full,
    alignSelf: 'flex-start',
  },
  default: {
    backgroundColor: theme.colors.surface,
  },
  success: {
    backgroundColor: '#E8F8EE',
  },
  error: {
    backgroundColor: '#FFEBEA',
  },
  text: {
    ...theme.typography.caption,
    fontWeight: '600',
  },
  defaultText: {
    color: theme.colors.textSecondary,
  },
  successText: {
    color: theme.colors.success,
  },
  errorText: {
    color: theme.colors.error,
  },
})
```

- [ ] **Создать `app/components/ui/Badge/index.tsx`**

```tsx
// app/components/ui/Badge/index.tsx
import type { FC } from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'

type BadgeVariant = 'default' | 'success' | 'error'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

const variantStyle = {
  default: styles.default,
  success: styles.success,
  error: styles.error,
} as const

const variantTextStyle = {
  default: styles.defaultText,
  success: styles.successText,
  error: styles.errorText,
} as const

export const Badge: FC<BadgeProps> = ({ label, variant = 'default' }) => {
  return (
    <View style={[styles.badge, variantStyle[variant]]}>
      <Text style={[styles.text, variantTextStyle[variant]]}>{label}</Text>
    </View>
  )
}
```

- [ ] **Commit**

```bash
git add app/components/ui/
git commit -m "feat: add Button, Input, Card, Badge UI components"
```

---

## Task 6: Layout компонент

**Files:**
- Modify: `app/components/layout/index.tsx`
- Create: `app/components/layout/styles.ts`

- [ ] **Создать `app/components/layout/styles.ts`**

```ts
// app/components/layout/styles.ts
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
})
```

- [ ] **Обновить `app/components/layout/index.tsx`** — убрать `className`

```tsx
// app/components/layout/index.tsx
import type { FC, PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}

export default Layout
```

- [ ] **Commit**

```bash
git add app/components/layout/
git commit -m "feat: migrate layout to StyleSheet"
```

---

## Task 7: Сервисы

**Files:**
- Create: `app/services/product.service.ts`
- Delete: `app/services/post.service.ts`

- [ ] **Создать `app/services/product.service.ts`**

```ts
// app/services/product.service.ts
import type { IProduct } from '@/types/product'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const ProductService = {
  getProducts: (): Promise<IProduct[]> =>
    fetch(`${API_URL}/products`).then((r) => r.json()),

  getProduct: (id: number): Promise<IProduct> =>
    fetch(`${API_URL}/products/${id}`).then((r) => r.json()),

  getProductsByCategory: (category: string): Promise<IProduct[]> =>
    fetch(`${API_URL}/products/category/${category}`).then((r) => r.json()),

  getCategories: (): Promise<string[]> =>
    fetch(`${API_URL}/products/categories`).then((r) => r.json()),
}
```

- [ ] **Удалить `app/services/post.service.ts`**

```bash
rm app/services/post.service.ts
```

- [ ] **Commit**

```bash
git add app/services/
git commit -m "feat: add ProductService for fakestoreapi.com"
```

---

## Task 8: Стор корзины

**Files:**
- Create: `app/stores/useCartStore.ts`

- [ ] **Создать `app/stores/useCartStore.ts`**

```ts
// app/stores/useCartStore.ts
import { create } from 'zustand'
import type { ICartItem, IProduct } from '@/types/product'

interface CartState {
  items: ICartItem[]
  addItem: (product: IProduct) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],

  addItem: (product) => {
    const items = get().items
    const existing = items.find((i) => i.product.id === product.id)
    if (existing) {
      set({
        items: items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      })
    } else {
      set({ items: [...items, { product, quantity: 1 }] })
    }
  },

  removeItem: (productId) =>
    set({ items: get().items.filter((i) => i.product.id !== productId) }),

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
    } else {
      set({
        items: get().items.map((i) =>
          i.product.id === productId ? { ...i, quantity } : i
        ),
      })
    }
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
}))
```

- [ ] **Commit**

```bash
git add app/stores/useCartStore.ts
git commit -m "feat: add cart store with add/remove/quantity/totals"
```

---

## Task 9: Навигация

**Files:**
- Create: `app/navigation/TabNavigator.tsx`
- Modify: `app/navigation/index.tsx`

- [ ] **Создать `app/navigation/TabNavigator.tsx`**

```tsx
// app/navigation/TabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Text } from 'react-native'

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
```

- [ ] **Обновить `app/navigation/index.tsx`**

```tsx
// app/navigation/index.tsx
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AuthScreen from '@/screens/auth'
import { useAuthStore } from '@/stores/useAuthStore'
import type { IRootStackParamList } from '@/types/navigation'
import TabNavigator from './TabNavigator'

const Stack = createNativeStackNavigator<IRootStackParamList>()

const Navigation = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name='Main' component={TabNavigator} />
        ) : (
          <Stack.Screen name='Auth' component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
```

- [ ] **Commit**

```bash
git add app/navigation/
git commit -m "feat: add tab navigator, conditional auth/main routing"
```

---

## Task 10: Экран авторизации

**Files:**
- Create: `app/screens/auth/index.tsx`
- Create: `app/screens/auth/styles.ts`

- [ ] **Создать `app/screens/auth/styles.ts`**

```ts
// app/screens/auth/styles.ts
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  error: {
    ...theme.typography.caption,
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
})
```

- [ ] **Создать `app/screens/auth/index.tsx`**

```tsx
// app/screens/auth/index.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { z } from 'zod'

import Layout from '@/components/layout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/stores/useAuthStore'
import { styles } from './styles'

const schema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(6, 'Минимум 6 символов'),
})

type LoginForm = z.infer<typeof schema>

const AuthScreen = () => {
  const login = useAuthStore((s) => s.login)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginForm) => {
    const result = await login(data.email, data.password)
    if (result.error) {
      setError('root', { message: result.error })
    }
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Войти</Text>
        <Text style={styles.subtitle}>Введите данные для входа</Text>

        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label='Email'
              placeholder='you@example.com'
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label='Пароль'
              placeholder='••••••'
              secureTextEntry
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.password?.message}
            />
          )}
        />

        {errors.root ? <Text style={styles.error}>{errors.root.message}</Text> : null}

        <Button
          title='Войти'
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />
      </View>
    </Layout>
  )
}

export default AuthScreen
```

- [ ] **Commit**

```bash
git add app/screens/auth/
git commit -m "feat: add login screen with react-hook-form and zod"
```

---

## Task 11: Экран каталога

**Files:**
- Create: `app/screens/catalog/index.tsx`
- Create: `app/screens/catalog/styles.ts`

- [ ] **Создать `app/screens/catalog/styles.ts`**

```ts
// app/screens/catalog/styles.ts
import { Dimensions, StyleSheet } from 'react-native'
import { theme } from '@/theme'

const SCREEN_WIDTH = Dimensions.get('window').width
export const CARD_WIDTH = (SCREEN_WIDTH - theme.spacing.md * 3) / 2

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.sm,
  },
  productTitle: {
    ...theme.typography.caption,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  price: {
    ...theme.typography.body,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
})
```

- [ ] **Создать `app/screens/catalog/index.tsx`**

```tsx
// app/screens/catalog/index.tsx
import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Layout from '@/components/layout'
import { Card } from '@/components/ui/Card'
import { ProductService } from '@/services/product.service'
import type { IProduct } from '@/types/product'
import type { CatalogNavProp } from '@/types/navigation'
import { styles } from './styles'

const ProductCard = ({ item }: { item: IProduct }) => {
  const navigation = useNavigation<CatalogNavProp>()

  return (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('ProductScreen', { productId: item.id })}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        contentFit='contain'
        transition={200}
      />
      <Text style={styles.productTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </Card>
  )
}

const CatalogScreen = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: ProductService.getProducts,
  })

  if (isLoading) {
    return (
      <Layout>
        <View style={styles.center}>
          <ActivityIndicator size='large' />
        </View>
      </Layout>
    )
  }

  return (
    <Layout>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Каталог</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ProductCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  )
}

export default CatalogScreen
```

- [ ] **Commit**

```bash
git add app/screens/catalog/
git commit -m "feat: add catalog screen with product grid"
```

---

## Task 12: Экран товара

**Files:**
- Create: `app/screens/product/index.tsx`
- Create: `app/screens/product/styles.ts`

- [ ] **Создать `app/screens/product/styles.ts`**

```ts
// app/screens/product/styles.ts
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'

export const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: theme.spacing.lg,
  },
  category: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 24,
    marginBottom: theme.spacing.xl,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    padding: theme.spacing.md,
  },
  backText: {
    color: theme.colors.primary,
    ...theme.typography.body,
  },
})
```

- [ ] **Создать `app/screens/product/index.tsx`**

```tsx
// app/screens/product/index.tsx
import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native'

import Layout from '@/components/layout'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProductService } from '@/services/product.service'
import { useCartStore } from '@/stores/useCartStore'
import type { ICatalogStackParamList } from '@/types/navigation'
import { styles } from './styles'

type ProductRouteProp = RouteProp<ICatalogStackParamList, 'ProductScreen'>

const ProductScreen = () => {
  const navigation = useNavigation()
  const route = useRoute<ProductRouteProp>()
  const { productId } = route.params
  const addItem = useCartStore((s) => s.addItem)

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => ProductService.getProduct(productId),
  })

  if (isLoading || !product) {
    return (
      <Layout>
        <View style={styles.center}>
          <ActivityIndicator size='large' />
        </View>
      </Layout>
    )
  }

  return (
    <Layout>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Назад</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit='contain'
          transition={200}
        />
        <View style={styles.content}>
          <Badge label={product.category} />
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Button title='В корзину' onPress={() => addItem(product)} />
        </View>
      </ScrollView>
    </Layout>
  )
}

export default ProductScreen
```

- [ ] **Commit**

```bash
git add app/screens/product/
git commit -m "feat: add product detail screen with add to cart"
```

---

## Task 13: Экран корзины

**Files:**
- Create: `app/screens/cart/index.tsx`
- Create: `app/screens/cart/styles.ts`

- [ ] **Создать `app/screens/cart/styles.ts`**

```ts
// app/screens/cart/styles.ts
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  list: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: theme.radius.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    ...theme.typography.caption,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  itemPrice: {
    ...theme.typography.body,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  controlText: {
    fontSize: 18,
    color: theme.colors.text,
    lineHeight: 22,
  },
  quantity: {
    ...theme.typography.body,
    fontWeight: '600',
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    padding: theme.spacing.xs,
  },
  removeText: {
    color: theme.colors.error,
    fontSize: 18,
  },
  footer: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  totalValue: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  emptyText: {
    ...theme.typography.h2,
    color: theme.colors.textSecondary,
  },
  emptySubtext: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
})
```

- [ ] **Создать `app/screens/cart/index.tsx`**

```tsx
// app/screens/cart/index.tsx
import { Image } from 'expo-image'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

import Layout from '@/components/layout'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useCartStore } from '@/stores/useCartStore'
import type { ICartItem } from '@/types/product'
import { styles } from './styles'

const CartItem = ({ item }: { item: ICartItem }) => {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <Card>
      <View style={styles.itemCard}>
        <Image
          source={{ uri: item.product.image }}
          style={styles.itemImage}
          contentFit='contain'
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.product.title}
          </Text>
          <Text style={styles.itemPrice}>
            ${(item.product.price * item.quantity).toFixed(2)}
          </Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
          >
            <Text style={styles.controlText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <Text style={styles.controlText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeItem(item.product.id)}
          >
            <Text style={styles.removeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  )
}

const CartScreen = () => {
  const { items, totalPrice, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <Layout>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Корзина пуста</Text>
          <Text style={styles.emptySubtext}>Добавьте товары из каталога</Text>
        </View>
      </Layout>
    )
  }

  return (
    <Layout>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Корзина</Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <CartItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Итого</Text>
          <Text style={styles.totalValue}>${totalPrice().toFixed(2)}</Text>
        </View>
        <Button title='Оформить заказ' onPress={() => {}} />
        <Button title='Очистить' variant='ghost' onPress={clearCart} />
      </View>
    </Layout>
  )
}

export default CartScreen
```

- [ ] **Commit**

```bash
git add app/screens/cart/
git commit -m "feat: add cart screen with quantity controls and total"
```

---

## Task 14: Экран профиля

**Files:**
- Create: `app/screens/profile/index.tsx`
- Create: `app/screens/profile/styles.ts`

- [ ] **Создать `app/screens/profile/styles.ts`**

```ts
// app/screens/profile/styles.ts
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  email: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.lg,
  },
})
```

- [ ] **Создать `app/screens/profile/index.tsx`**

```tsx
// app/screens/profile/index.tsx
import { Text, View } from 'react-native'

import Layout from '@/components/layout'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/stores/useAuthStore'
import { styles } from './styles'

const ProfileScreen = () => {
  const { user, logout } = useAuthStore()

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Профиль</Text>
          {user ? <Text style={styles.email}>{user.email}</Text> : null}
        </View>
        <View style={styles.divider} />
        <Button title='Выйти' variant='secondary' onPress={logout} />
      </View>
    </Layout>
  )
}

export default ProfileScreen
```

- [ ] **Commit**

```bash
git add app/screens/profile/
git commit -m "feat: add profile screen with logout"
```

---

## Task 15: Удалить старый home-экран + финальная чистка

**Files:**
- Delete: `app/screens/home/`
- Modify: `CLAUDE.md`

- [ ] **Удалить старый экран**

```bash
rm -rf app/screens/home
```

- [ ] **Обновить `CLAUDE.md`** — отразить новую структуру без NativeWind, с темой и новыми экранами

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server
npx expo start

# Platform-specific
npx expo start --android
npx expo start --ios
npx expo start --web
npx expo start --tunnel   # для физического устройства через Expo Go

# Lint (Biome)
npx biome check .
npx biome check --write .   # auto-fix

# Format
npx biome format --write .
```

No test suite is configured.

## Environment Variables

Copy `.env.example` to `.env`. All env vars use the `EXPO_PUBLIC_` prefix:

- `EXPO_PUBLIC_API_URL` — Products API (default: fakestoreapi.com)
- `EXPO_PUBLIC_AUTH_API_URL` — Auth API (default: reqres.in)

## Architecture

**Entry point**: `App.tsx` → `app/app.tsx` (providers) → `app/navigation/index.tsx`

### Provider Stack (`app/app.tsx`)
`QueryClientProvider` → `SafeAreaProvider` → `Navigation`

### Navigation (`app/navigation/`)
Root Stack условно показывает `AuthScreen` или `TabNavigator` в зависимости от `isAuthenticated`.  
`TabNavigator` содержит три таба: Каталог (с вложенным стеком), Корзина, Профиль.  
Все типы навигации в `app/types/navigation.ts`.

### Стили
Нет NativeWind. Используется `StyleSheet.create()` + `theme` объект (`app/theme/index.ts`).  
Конвенция: каждый компонент/экран — папка с `index.tsx` и `styles.ts`.

### Тема (`app/theme/index.ts`)
`theme.colors`, `theme.spacing`, `theme.radius`, `theme.typography` — импортируется в каждый `styles.ts`.

### UI-компоненты (`app/components/ui/`)
`Button` (primary/secondary/ghost), `Input` (с label/error), `Card` (с onPress?), `Badge` (default/success/error).

### State (`app/stores/`)
- `useAuthStore` — авторизация, persist в expo-secure-store
- `useCartStore` — корзина (без persist, живёт в сессии)

### Сервисы (`app/services/`)
- `auth.service.ts` — login/register через reqres.in
- `product.service.ts` — getProducts/getProduct/getCategories через fakestoreapi.com

### Формы
`react-hook-form` + `zod`. Пример в `app/screens/auth/index.tsx`.

### SVG
Импорт SVG как React-компонент: `import Icon from './icon.svg'`.

### Path Alias
`@/*` → `./app/*`

## Code Style (Biome)
Single quotes, no semicolons, no trailing commas, 2-space indent, 100-char line width.
```

- [ ] **Проверить что нет ошибок линтера**

```bash
npx biome check .
```

Исправить ошибки если есть:
```bash
npx biome check --write .
```

- [ ] **Финальный commit**

```bash
git add -A
git commit -m "chore: remove home screen, update CLAUDE.md"
```
