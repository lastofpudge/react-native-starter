import { theme } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.full,
    alignSelf: 'flex-start'
  },
  default: {
    backgroundColor: theme.colors.surface
  },
  success: {
    backgroundColor: '#E8F8EE'
  },
  error: {
    backgroundColor: '#FFEBEA'
  },
  text: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600'
  },
  defaultText: {
    color: theme.colors.textSecondary
  },
  successText: {
    color: theme.colors.success
  },
  errorText: {
    color: theme.colors.error
  }
})
