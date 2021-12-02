import React from 'react'
import { HomePage } from './layouts'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App mx-auto max-w-screen-xl">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <HomePage />
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  )
}

export default App
