import { ReactNode, StrictMode } from 'react'
import { ThemeProvider } from '@emotion/react'
import { ContentLayout } from '@/components/Layout'
import { MapWrapper } from '@/lib/google-map'
import { theme } from '@/utils'

type AppProviderProps = {
  children: ReactNode
}

// StrictModeをonにするとmount, unmount時にuseEffect内のapiがcallされてしまい、google maps apiの秒間リクエスト制限（1s/10）に達する
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    // <StrictMode>
    <ThemeProvider theme={theme}>
      <ContentLayout>
        <MapWrapper>{children}</MapWrapper>
      </ContentLayout>
    </ThemeProvider>
    // </StrictMode>
  )
}
