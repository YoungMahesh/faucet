import { FantomTestnetCoins, SolanaDevnetCoins } from "../web3/tokens"
import { useState } from "react"
import TokenBox from "./TokenBox"

import { Network } from "../types/main"

export default function TokensList({ network }: { network: Network }) {
  const [txnUrl, setTxnUrl] = useState("")

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center p-2">
        {(network === Network.SolanaDevnet
          ? SolanaDevnetCoins
          : FantomTestnetCoins
        ).map((t, idx) => (
          <TokenBox key={idx} t={t} setTxnUrl={setTxnUrl} />
        ))}
      </div>

      {txnUrl.length > 0 ? <TxnUrl txnUrl={txnUrl} /> : null}
    </div>
  )
}

const TxnUrl = ({ txnUrl }: { txnUrl: string }) => (
  <div className="flex flex-wrap justify-center items-center m-4 mt-8">
    <p>Transaction URL: &nbsp; &nbsp; </p>
    <a
      className={`text-violet-500 break-all`}
      target="_blank"
      rel="noreferrer"
      href={txnUrl}
    >
      {txnUrl}
    </a>
  </div>
)
