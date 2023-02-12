import { useAtom } from "jotai"
import { useState } from "react"
import { network1, wallet } from "../state/home"
import { MoonCoinAddr, TokenInfo } from "../web3/tokens"
import Button1 from "./Button1"
import { Network } from "../types/main"
import { ConnectWallet, useSigner } from "@thirdweb-dev/react"
import { faucetContract } from "../web3/contracts"

export default function TokenBox({
  t,
  setTxnUrl,
}: {
  t: TokenInfo
  setTxnUrl: (_: string) => void
}) {
  const signer = useSigner()

  const [recWallet] = useAtom(wallet)
  const [isTransfering, setIsTransfering] = useState(false)
  const [network] = useAtom(network1)

  const transferEVMTokens = async () => {
    setIsTransfering(true)
    try {
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

    const resp = await fetch(
      `api/spl-transfer?recWallet=${recWallet}&mint=${t.address}&tokenAcc=${t.token_account}&amount=${t.transfer_amount}&decimals=${t.decimals}`
    )
    if (resp.status === 201) {
      const txnUrl = await resp.text()
      setTxnUrl(txnUrl)
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

      <div className="flex flex-wrap items-center justify-between mt-4">
        <div>
          {network === Network.FantomTestnet ? (
            <ConnectWallet colorMode="dark" />
          ) : null}
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
            : `Get ${t.transfer_amount} ${t.symbol}`}
        </Button1>
      </div>
    </div>
  )
}
