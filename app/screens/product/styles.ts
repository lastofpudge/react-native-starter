import { theme } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: theme.colors.surface
  },
  content: {
    padding: theme.spacing.lg
  },
  category: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.fontWeight,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.sm
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.md
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.lg
  },
  description: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    color: theme.colors.textSecondary,
    lineHeight: 24,
    marginBottom: theme.spacing.xl
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButton: {
    padding: theme.spacing.md
  },
  backText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight
  }
})
