import { useAtom } from "jotai"
import { useState } from "react"
import { network1, wallet } from "../state/home"
import {
  Token1,
  transferERC20Tokens1,
  transferSplTokens1,
} from "../web3/tokens"
import Button1 from "./Button1"
import { Network } from "../types/main"

export default function TokenBox({
  t,
  setTxnUrl,
}: {
  t: Token1
  setTxnUrl: (_: string) => void
}) {
  const [recWallet] = useAtom(wallet)
  const [isTransfering, setIsTransfering] = useState(false)
  const [network] = useAtom(network1)

  const transferEVMTokens = async () => {
    if (recWallet.length < 42) return alert("Invalid Wallet Address")

    setIsTransfering(true)
    const txn = await transferERC20Tokens1(
      recWallet,
      t.address,
      t.transfer_amount,
      t.decimals
    )
    if (txn.length) {
      setTxnUrl(txn)
      alert("Tranfer Successful")
    } else {
      alert("Tranfer Failed")
    }
    setIsTransfering(false)
  }

  const transferSolTokens = async () => {
    if (recWallet.length < 32) return alert("Invalid Wallet Address")

    setIsTransfering(true)

    const txn = await transferSplTokens1(
      recWallet,
      t.address,
      t.token_account,
      t.transfer_amount,
      t.decimals
    )
    if (txn.length) {
      setTxnUrl(txn)
      alert("Transferred Successfully")
    } else {
      alert("Could not able to transfer")
    }

    setIsTransfering(false)
  }

  return (
    <div className="border-2 border-violet-500 p-4 rounded">
      <p>Name: {t.name}</p>
      <p>Symbol: {t.symbol}</p>
      <p>
        Mint:{" "}
        <a
          className={`text-violet-500`}
          target="_blank"
          rel="noreferrer"
          href={
            network === Network.SolanaDevnet
              ? `https://solscan.io/token/${t.address}?cluster=devnet`
              : `https://testnet.ftmscan.com/token/${t.address}`
          }
        >
          {t.address}
        </a>
      </p>

      <Button1
        disabled={isTransfering}
        onClick={() => {
          if (network === Network.SolanaDevnet) transferSolTokens()
          else if (network === Network.FantomTestnet) transferEVMTokens()
        }}
      >
        {isTransfering
          ? "Transferring..."
          : `Get ${t.transfer_amount} ${t.symbol}`}
      </Button1>
    </div>
  )
}
