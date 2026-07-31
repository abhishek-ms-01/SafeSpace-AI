// ─────────────────────────────────────────────────────────────
// useDarkMode — Dark mode state with localStorage persistence
//
// On first load, reads system preference (prefers-color-scheme).
// After first toggle, persists the user's explicit choice.
// Applies/removes the `dark` class on <html> via useEffect.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'safespace-dark-mode'

interface UseDarkModeReturn {
  isDarkMode: boolean
  toggle: () => void
  setDarkMode: (value: boolean) => void
}

/**
 * Reads the initial dark mode preference:
 * 1. If user has explicitly set a preference → use that
 * 2. Otherwise → use the OS/browser system preference
 */
function getInitialValue(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) return JSON.parse(stored) as boolean
  } catch {
    // localStorage unavailable (SSR / private browsing edge case)
  }
  // Fall back to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function useDarkMode(): UseDarkModeReturn {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialValue)

  /**
   * Whenever isDarkMode changes:
   *  - Add/remove `dark` class on <html> (Tailwind reads this)
   *  - Persist the choice to localStorage
   */
  useEffect(() => {
    const root = document.documentElement

    if (isDarkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isDarkMode))
    } catch {
      // Silently ignore localStorage errors
    }
  }, [isDarkMode])

  /**
   * Listen for OS-level theme changes (e.g. user changes system setting).
   * Only applies if the user has NOT set an explicit preference.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      // Only follow system if no stored preference exists
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === null) {
        setIsDarkMode(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  /** Flips the current dark mode state */
  const toggle = useCallback(() => {
    setIsDarkMode(prev => !prev)
  }, [])

  /** Explicitly set dark mode to a specific value */
  const setDarkMode = useCallback((value: boolean) => {
    setIsDarkMode(value)
  }, [])

  return { isDarkMode, toggle, setDarkMode }
}
