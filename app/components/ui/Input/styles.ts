import { StyleSheet } from 'react-native'
import { theme } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.fontWeight,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: 48,
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  error: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.fontWeight,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
})
