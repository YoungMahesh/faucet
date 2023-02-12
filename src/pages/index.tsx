import { useAtom } from "jotai"
import type { NextPage } from "next"
import Head from "next/head"
import NetworkSwitcher from "../components/NetworkSwitcher"
import TokensList from "../components/TokensList"
import WalletInput from "../components/WallletInput"
import { network1 } from "../state/home"
import { Network } from "../types/main"
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react"
const activeChainId = ChainId.FantomTestnet

const Home: NextPage = () => {
  const [network] = useAtom(network1)
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <main>
        <Head>
          <title>Token Faucet</title>
          <meta
            name="description"
            content="Token Faucet for Fantom and Solana"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <WalletInput />
        <NetworkSwitcher />

        {network === Network.SolanaDevnet ? (
          <TokensList network={Network.SolanaDevnet} />
        ) : (
          <TokensList network={Network.FantomTestnet} />
        )}
      </main>
    </ThirdwebProvider>
  )
}

export default Home
