import { FC, PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <SafeAreaView>{children}</SafeAreaView>
}

export default Layout
