import type { FC, PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <SafeAreaView className='flex-1'>{children}</SafeAreaView>
}

export default Layout
