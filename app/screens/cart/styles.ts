import { theme } from '@/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm
  },
  headerTitle: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.text
  },
  list: {
    padding: theme.spacing.md,
    gap: theme.spacing.md
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: theme.radius.md
  },
  itemInfo: {
    flex: 1
  },
  itemTitle: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.fontWeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs
  },
  itemPrice: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '700',
    color: theme.colors.primary
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border
  },
  controlText: {
    fontSize: 18,
    color: theme.colors.text,
    lineHeight: 22
  },
  quantity: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    minWidth: 24,
    textAlign: 'center'
  },
  removeButton: {
    padding: theme.spacing.xs
  },
  removeText: {
    color: theme.colors.error,
    fontSize: 18
  },
  footer: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: theme.spacing.md
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalLabel: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    color: theme.colors.textSecondary
  },
  totalValue: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.text
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md
  },
  emptyText: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.textSecondary
  },
  emptySubtext: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.body.fontWeight,
    color: theme.colors.textSecondary
  }
})
