import type { AppProps } from 'next/app'
import type { FC } from 'react'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        },
    },
})

require('../styles/globals.css')

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    )
}

export default App
