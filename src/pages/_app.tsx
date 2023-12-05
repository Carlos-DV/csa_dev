import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { darkTheme, lightTheme } from '../themes'
import { AuthProvider } from '../context/auth'
import { TicketsProvider } from '../context/ticket'
import { UIProvider } from '../context/ui'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UIProvider>
        <TicketsProvider>
          <ThemeProvider theme={ lightTheme }>
            <CssBaseline/>
            <Component {...pageProps} />
          </ThemeProvider>
        </TicketsProvider>
      </UIProvider>
    </AuthProvider>
  )
}

export default MyApp
