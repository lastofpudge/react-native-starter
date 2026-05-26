import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'

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
