import { Text, View } from 'react-native'

import Layout from '@/components/layout'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/stores/useAuthStore'
import { styles } from './styles'

const ProfileScreen = () => {
  const { user, logout } = useAuthStore()

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Профиль</Text>
          {user ? <Text style={styles.email}>{user.email}</Text> : null}
        </View>
        <View style={styles.divider} />
        <Button title='Выйти' variant='secondary' onPress={logout} />
      </View>
    </Layout>
  )
}

export default ProfileScreen
