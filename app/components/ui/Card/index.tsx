import type { FC, PropsWithChildren } from 'react'
import { TouchableOpacity, View, type ViewStyle } from 'react-native'
import { styles } from './styles'

interface CardProps {
  onPress?: () => void
  style?: ViewStyle
}

export const Card: FC<PropsWithChildren<CardProps>> = ({ children, onPress, style }) => {
  if (onPress) {
    return (
      <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.9}>
        {children}
      </TouchableOpacity>
    )
  }
  return <View style={[styles.card, style]}>{children}</View>
}
