'use client'

import { ThemeContext, useThemeProvider } from '@/hooks/useTheme'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeValue = useThemeProvider()

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  )
}
