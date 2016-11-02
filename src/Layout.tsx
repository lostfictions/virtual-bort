import * as React from 'react'

interface LayoutProps {
  children? : any
}

export default function Layout({ children } : LayoutProps) {
  return (
    <div>
      <h1>Hell world!</h1>
      { children }
    </div>
  )
}
