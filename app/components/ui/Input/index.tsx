import type { FC } from 'react'
import { Text, TextInput, type TextInputProps, View } from 'react-native'
import { styles } from './styles'

interface InputProps extends TextInputProps {
  label?: string
  error?: string
}

export const Input: FC<InputProps> = ({ label, error, style, ...props }) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput style={[styles.input, error ? styles.inputError : null, style]} {...props} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}
