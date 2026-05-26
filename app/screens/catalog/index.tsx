import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Image } from 'expo-image'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

import Layout from '@/components/layout'
import { Card } from '@/components/ui/Card'
import { ProductService } from '@/services/product.service'
import type { CatalogNavProp } from '@/types/navigation'
import type { IProduct } from '@/types/product'
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
  const {
    data: products = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['products'],
    queryFn: ProductService.getProducts
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

  if (isError) {
    return (
      <Layout>
        <View style={styles.center}>
          <Text style={styles.headerTitle}>Не удалось загрузить товары</Text>
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
