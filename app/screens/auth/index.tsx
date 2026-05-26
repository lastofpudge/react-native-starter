import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { z } from 'zod'

import Layout from '@/components/layout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/stores/useAuthStore'
import { styles } from './styles'

const schema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(6, 'Минимум 6 символов')
})

type LoginForm = z.infer<typeof schema>

const AuthScreen = () => {
  const login = useAuthStore((s) => s.login)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await login(data.email, data.password)
      if (result.error) {
        setError('root', { message: result.error })
      }
    } catch {
      setError('root', { message: 'Unexpected error. Please try again.' })
    }
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Войти</Text>
        <Text style={styles.subtitle}>Введите данные для входа</Text>

        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label='Email'
              placeholder='you@example.com'
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label='Пароль'
              placeholder='••••••'
              secureTextEntry
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.password?.message}
            />
          )}
        />

        {errors.root ? <Text style={styles.error}>{errors.root.message}</Text> : null}

        <Button title='Войти' onPress={handleSubmit(onSubmit)} loading={isSubmitting} />
      </View>
    </Layout>
  )
}

export default AuthScreen
