# Starter Refresh — Design Spec

**Date:** 2026-05-25  
**Goal:** Обновить и актуализировать React Native / Expo стартер так, чтобы на его основе можно было быстро строить мобильные приложения, включая интернет-магазины.

---

## Принципы

- **Минимальный с конвенциями** — только то, что нужно каждый раз. Ничего лишнего.
- **Кастомный дизайн** — никаких UI-библиотек, никакого NativeWind/Tailwind. `StyleSheet` + `theme.ts`.
- **Рабочий e-commerce пример** — не заглушки, а реальный каталог с API, корзина, детали товара.

---

## 1. Пакеты

### Удалить
| Пакет | Причина |
|---|---|
| `nativewind` | Переходим на StyleSheet |
| `tailwindcss` | Не нужен без NativeWind |
| `react-native-worklets` | В reanimated v4 встроен |

### Добавить
| Пакет | Назначение |
|---|---|
| `react-hook-form` | Формы |
| `zod` | Валидация схем |
| `@react-navigation/bottom-tabs` | Bottom Tab Navigator |
| `expo-image` | Замена встроенному Image (кэш, плейсхолдеры) |

### Обновить
Все существующие пакеты обновляются до последних совместимых версий с текущим SDK Expo.

### Почистить конфиги
- Удалить `tailwind.config.js`, `global.css`, `nativewind-env.d.ts`
- Упростить `metro.config.js` — убрать NativeWind-обёртку

---

## 2. Структура папок

```
app/
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Input/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── Card/
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   └── Badge/
│   │       ├── index.tsx
│   │       └── styles.ts
│   └── layout/
│       ├── index.tsx
│       └── styles.ts
├── navigation/
│   ├── index.tsx            # Root navigator
│   ├── TabNavigator.tsx     # Bottom Tabs
│   ├── IRootStackParamList.ts
│   └── ITabParamList.ts
├── screens/
│   ├── auth/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── catalog/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── product/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── cart/
│   │   ├── index.tsx
│   │   └── styles.ts
│   └── profile/
│       ├── index.tsx
│       └── styles.ts
├── services/
│   ├── auth.service.ts
│   └── product.service.ts
├── stores/
│   ├── useAuthStore.ts
│   ├── useCartStore.ts
│   └── secureStorage.ts
├── theme/
│   └── index.ts
└── types/
    ├── product.ts
    └── navigation.ts
```

**Конвенция стилей:** каждый компонент/экран — папка с `index.tsx` и `styles.ts`. Стили через `StyleSheet.create()` с импортом из `@/theme`.

---

## 3. Навигация

```
Root Stack
├── Auth Stack          (isAuthenticated === false)
│   └── LoginScreen
└── Main Tabs           (isAuthenticated === true)
    ├── Catalog Stack
    │   ├── CatalogScreen
    │   └── ProductScreen
    ├── CartScreen
    └── ProfileScreen
```

- Переключение Auth ↔ Main происходит реактивно через `isAuthenticated` из `useAuthStore` — без явного `navigate`.
- `headerShown: false` на Root Stack, каждый таб управляет своим хедером самостоятельно.

**Типизация:**
```ts
// IRootStackParamList.ts
type IAuthStackParamList = {
  Login: undefined
}

type IRootStackParamList = {
  Auth: NavigatorScreenParams<IAuthStackParamList>
  Main: NavigatorScreenParams<ITabParamList>
}

// ITabParamList.ts
type ITabParamList = {
  Catalog: NavigatorScreenParams<ICatalogStackParamList>
  Cart: undefined
  Profile: undefined
}

type ICatalogStackParamList = {
  CatalogScreen: undefined
  ProductScreen: { productId: number }
}
```

---

## 4. Тема

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
}

export type Theme = typeof theme
```

Использование в `styles.ts`:
```ts
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
})
```

---

## 5. UI-компоненты

Базовый набор в `app/components/ui/`:

| Компонент | Варианты |
|---|---|
| `Button` | `primary`, `secondary`, `ghost`; пропы: `title`, `onPress`, `loading`, `disabled` |
| `Input` | пропы: `label`, `error`, `...TextInputProps` |
| `Card` | обёртка с тенью и `borderRadius`; пропы: `onPress?` |
| `Badge` | цветная метка; пропы: `label`, `variant: 'default' \| 'success' \| 'error'` |

---

## 6. E-commerce рабочий пример

### API
`fakestoreapi.com` — реальные товары с ценами, картинками и категориями.

```ts
// app/services/product.service.ts
export const ProductService = {
  getProducts: (): Promise<IProduct[]> =>
    fetch(`${API_URL}/products`).then(r => r.json()),
  getProduct: (id: number): Promise<IProduct> =>
    fetch(`${API_URL}/products/${id}`).then(r => r.json()),
}
```

### Типы (`app/types/product.ts`)
```ts
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

### Стор корзины (`app/stores/useCartStore.ts`)
Zustand без persist (корзина живёт в сессии).

```ts
interface CartState {
  items: ICartItem[]
  addItem: (product: IProduct) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}
```

### Экраны

**CatalogScreen** — список товаров через TanStack Query, плоский список карточек (`Card` + `expo-image`).

**ProductScreen** — детали товара, кнопка "В корзину" (вызывает `addItem`).

**CartScreen** — список `ICartItem`, управление количеством, итоговая сумма, кнопка "Оформить" (заглушка).

**ProfileScreen** — имя/email из `useAuthStore`, кнопка "Выйти".

### Форма логина
`LoginScreen` использует `react-hook-form` + `zod` схему:
```ts
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
```

---

## 7. Переменные окружения

```env
EXPO_PUBLIC_API_URL=https://fakestoreapi.com
EXPO_PUBLIC_AUTH_API_URL=https://reqres.in/api
```

---

## Что не входит в этот спек

- Dark mode (тема заложена, переключение — следующий шаг)
- Push-уведомления
- Оплата (Stripe и т.д.)
- i18n
- Тесты
