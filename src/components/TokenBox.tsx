import { useAtom } from "jotai"
import { useState } from "react"
import { network1, wallet } from "../state/home"
import { MoonCoinAddr, Token1, transferSplTokens1 } from "../web3/tokens"
import Button1 from "./Button1"
import { Network } from "../types/main"
import { ConnectWallet, useAddress, useSigner } from "@thirdweb-dev/react"
import { faucetContract } from "../web3/contracts"

export default function TokenBox({
  t,
  setTxnUrl,
}: {
  t: Token1
  setTxnUrl: (_: string) => void
}) {
  const signer = useSigner()

  const [recWallet] = useAtom(wallet)
  const [isTransfering, setIsTransfering] = useState(false)
  const [network] = useAtom(network1)

  const transferEVMTokens = async () => {
    try {
      setIsTransfering(true)
      if (!signer) return alert("Wallet not Connected")
      const faucetContr = faucetContract(signer)
      const txn = await faucetContr.transfer(MoonCoinAddr)
      await txn.wait(1)
      setTxnUrl(`https://testnet.ftmscan.com/tx/${txn.hash}`)
      alert("Transfer Successful")
    } catch (err) {
      console.log(err)
      alert("Got Error while transferring tokens")
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
    <div className="flex flex-col m-2 border-2 border-violet-500 p-4 rounded">
      <p>Name: {t.name}</p>
      <p>Symbol: {t.symbol}</p>
      <p>
        Token Address:{" "}
        <a
          className="text-violet-500 break-all"
          target="_blank"
          rel="noreferrer"
          href={
            network === Network.SolanaDevnet
              ? `https://solscan.io/token/${t.address}?cluster=devnet`
              : `https://testnet.ftmscan.com/token/${MoonCoinAddr}`
          }
        >
          {network === Network.SolanaDevnet ? t.address : MoonCoinAddr}
        </a>
      </p>

      <div className="flex flex-wrap items-center justify-around mt-4">
        <div>
          {Network.FantomTestnet ? <ConnectWallet colorMode="dark" /> : null}
        </div>

        <Button1
          disabled={isTransfering}
          onClick={() => {
            if (network === Network.SolanaDevnet) transferSolTokens()
            else if (network === Network.FantomTestnet) transferEVMTokens()
          }}
        >
          {isTransfering
            ? "Transferring..."
            : network === Network.SolanaDevnet
            ? `Get ${t.transfer_amount} ${t.symbol}`
            : "Get 700 MN"}
        </Button1>
      </div>
    </div>
  )
}
