import { useTokensList } from "../web3/tokens"
import { useState } from "react"
import { useAtom } from "jotai"
import { network1 } from "../state/home"
import TokenBox from "./TokenBox"
import LoadingBox from "./LoadingBox"
import { Network } from "../types/main"

export default function TokensList({ network }: { network: Network }) {
  const [txnUrl, setTxnUrl] = useState("")
  const { data, isLoading } = useTokensList(0, network)

  if (isLoading) return <LoadingBox note="Loading..." />
  if (!data) return <LoadingBox note="Got Error while fetching data" />

  return (
    <div className="w-full">
      <Heading1 />

      <div className="flex flex-col items-center justify-center p-2">
        {data.map((t, idx) => (
          <TokenBox key={idx} t={t} setTxnUrl={setTxnUrl} />
        ))}
      </div>

      {txnUrl.length > 0 ? <TxnUrl txnUrl={txnUrl} /> : null}
    </div>
  )
}

const Heading1 = () => {
  const [currNetwork] = useAtom(network1)

  return (
    <>
      {currNetwork === Network.FantomTestnet ? (
        <p className="text-center text-2xl m-4">Fantom-Testnet Faucet</p>
      ) : (
        <p className="text-center text-2xl m-4">Solana Devnet Faucet</p>
      )}
    </>
  )
}

const TxnUrl = ({ txnUrl }: { txnUrl: string }) => (
  <div className="flex justify-center items-center m-4 mt-8">
    <p>Transaction URL: &nbsp; &nbsp; </p>
    <a
      className={`text-violet-500`}
      target="_blank"
      rel="noreferrer"
      href={txnUrl}
    >
      {txnUrl}
    </a>
  </div>
)
