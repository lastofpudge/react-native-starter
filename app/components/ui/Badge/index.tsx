import type { FC } from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'

type BadgeVariant = 'default' | 'success' | 'error'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

const variantStyle = {
  default: styles.default,
  success: styles.success,
  error: styles.error,
} as const

const variantTextStyle = {
  default: styles.defaultText,
  success: styles.successText,
  error: styles.errorText,
} as const

export const Badge: FC<BadgeProps> = ({ label, variant = 'default' }) => {
  return (
    <View style={[styles.badge, variantStyle[variant]]}>
      <Text style={[styles.text, variantTextStyle[variant]]}>{label}</Text>
    </View>
  )
}
