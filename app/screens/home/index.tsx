import React, { FC } from 'react'
import { Text, View } from 'react-native'

import Layout from '@/components/layout'

const Home: FC = () => {
  return (
    <Layout>
      <View className='flex-1 items-center justify-center bg-green-700'>
        <Text className='text-lg'>
          Open up App.tsx to start working on your app!
        </Text>
      </View>
    </Layout>
  )
}

export default Home
