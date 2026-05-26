import { Dimensions, StyleSheet } from 'react-native'
import { theme } from '@/theme'

const SCREEN_WIDTH = Dimensions.get('window').width
export const CARD_WIDTH = (SCREEN_WIDTH - theme.spacing.md * 3) / 2

export const styles = StyleSheet.create({
  list: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.sm,
  },
  productTitle: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: theme.typography.caption.fontWeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  price: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.text,
  },
})
