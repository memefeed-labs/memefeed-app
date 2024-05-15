import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Your WalletConnect Cloud project ID
const projectId = process.env.WALLETCONNECT_PROJECT_ID || '9a7bbef20a06496d56a8c01a2cc7508e'

// 2. Create wagmiConfig
const metadata = {
  name: 'Memefeed',
  description: 'Memefeed - Live memes for every community',
  url: 'https://memefeed.fun', // origin must match your domain & subdomain
  icons: ['https://memefeed.fun/favicon.ico'],
}

const chains = [sepolia] as const
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  themeMode: 'light',
  themeVariables: {
    '--w3m-font-family': 'Eudoxus Sans, sans-serif',
    '--w3m-accent': '#1b6fdd',
  },
})

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
