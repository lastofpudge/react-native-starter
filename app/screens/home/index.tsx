import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { Pressable, Text, View } from 'react-native'

import styles from './styles'
import Layout from '@/components/layout'
import { NavProps } from '@/navigation/IRootStackParamList'

const Home: FC = () => {
  const nav = useNavigation<NavProps>()

  return (
    <Layout>
      <View className='flex-1 items-center justify-center bg-green-700'>
        <Text className='text-lg'>Open up App.tsx to start working on your app!</Text>
        <Pressable className='mt-2' onPress={() => nav.push('Home')}>
          <Text style={styles.pressableText}>Refresh</Text>
        </Pressable>
      </View>
    </Layout>
  )
}

export default Home
