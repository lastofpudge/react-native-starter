import { theme } from '@/theme'
import type { FC } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, type TouchableOpacityProps } from 'react-native'
import { styles } from './styles'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: ButtonVariant
  loading?: boolean
}

const variantTextStyle = {
  primary: styles.primaryText,
  secondary: styles.secondaryText,
  ghost: styles.ghostText
} as const

const variantStyle = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost
} as const

export const Button: FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...props
}) => {
  const isDisabled = disabled || loading

  return (
    <TouchableOpacity
      style={[styles.base, variantStyle[variant], isDisabled && styles.disabled, style]}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : theme.colors.primary} />
      ) : (
        <Text style={[styles.text, variantTextStyle[variant]]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}
