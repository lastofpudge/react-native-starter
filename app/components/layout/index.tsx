import type { FC, PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}

export default Layout
