import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import React, { type FC } from 'react'
import { Pressable, Text, View } from 'react-native'

import Layout from '@/components/layout'
import type { NavProps } from '@/navigation/IRootStackParamList'
import { PostService } from '@/services/post.service'
import styles from './styles'

const Home: FC = () => {
  const nav = useNavigation<NavProps>()
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: () => {
      return PostService.getPosts(2)
    }
  })

  return (
    <Layout>
      <View className='flex-1 items-center justify-center bg-green-700'>
        <Text className='text-lg'>Open up App.tsx to start working on your app!</Text>
        <Pressable className='mt-2' onPress={() => nav.push('Home')}>
          <Text style={styles.pressableText}>Refresh</Text>
        </Pressable>
        <View className='mt-2 mx-2'>
          {posts?.map((post) => (
            <View key={post.id.toString()}>
              <Text className='mb-2'>{post.title}</Text>
            </View>
          ))}
        </View>
      </View>
    </Layout>
  )
}

export default Home
