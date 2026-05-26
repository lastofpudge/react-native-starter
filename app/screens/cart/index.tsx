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
        <Image source={{ uri: item.product.image }} style={styles.itemImage} contentFit='contain' />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.product.title}
          </Text>
          <Text style={styles.itemPrice}>${(item.product.price * item.quantity).toFixed(2)}</Text>
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
          <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.product.id)}>
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
