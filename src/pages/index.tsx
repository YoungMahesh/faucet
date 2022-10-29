import type { NextPage } from 'next'
import Head from 'next/head'
import NetworkSwitcher from '../components/NetworkSwitcher'
import TokensList from '../components/TokensList'
import { useAtom } from 'jotai'
import { network1, Network } from '../state/home'
import WalletInput from '../components/WallletInput'

const Home: NextPage = () => {
    const [currNet] = useAtom(network1)

    return (
        <main>
            <Head>
                <title>Token Faucet</title>
                <meta name="description" content="Token Faucet on Solana" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <WalletInput />
            <NetworkSwitcher />
    
            <TokensList />
        </main>
    )
}

export default Home
