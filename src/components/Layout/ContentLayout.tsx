import { ReactNode } from 'react'

export type ContentLayoutProps = {
  children: ReactNode
}

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div
      css={{
        width: '1024px',
        margin: '0 auto'
      }}
    >
      {children}
    </div>
  )
}
