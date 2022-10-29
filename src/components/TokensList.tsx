import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token"
import { PublicKey, Keypair, Connection, clusterApiUrl } from "@solana/web3.js"
import { BNF } from "../web3/utils"
import { useTokensList } from "../web3/tokens"
import Button1 from "./Button1"
import { useState } from "react"
import { useAtom } from "jotai"
import { Network, network1, wallet } from "../state/home"

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
const payer = Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(process.env.NEXT_PUBLIC_SECRET_KEY!))
)

const NoteBox = ({ note }: { note: string }) => (
  <div className="w-full">
    <p className="text-xl text-center">{note}</p>
  </div>
)
export default function TokensList() {
  const [recWallet] = useAtom(wallet)
  const [currNetwork] = useAtom(network1)
  const [isTransfering, setIsTransfering] = useState(false)
  const [txnUrl, setTxnUrl] = useState("")

  const { data, isLoading } = useTokensList(0)
  console.log("tokens-list", data)

  if (isLoading) return <NoteBox note="Loading..." />
  if (!data) return <NoteBox note="Got Error while fetching data" />

  const claimTokens = async (
    mint: string,
    tokenAcc: string,
    amount: number,
    decimals: number
  ) => {
    if (recWallet.length < 32) return alert("Invalid Wallet Address")
    setIsTransfering(true)
    try {
      const receiverTokenAcc = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        new PublicKey(mint),
        new PublicKey(recWallet)
      )
      const transferAmt = BigInt(
        BNF(amount)
          .mul(BNF(10).pow(BNF(decimals)))
          .toString()
      )
      const txn = await transfer(
        connection,
        payer,
        new PublicKey(tokenAcc),
        receiverTokenAcc.address,
        payer.publicKey,
        transferAmt
      )
      setTxnUrl(`https://solscan.io/tx/${txn}?cluster=devnet`)
      alert("Transferred Successfully")
    } catch (err) {
      console.log(err)
      alert("Could not able to transfer")
    }
    setIsTransfering(false)
  }

  return (
    <div className="w-full">
      {currNetwork === Network.FantomTestnet ? (
        <p className="text-center text-2xl m-4">EVM Token Faucet</p>
      ) : (
        <p className="text-center text-2xl m-4">Solana Token Faucet</p>
      )}

      <div className="flex flex-col items-center justify-center p-2">
        {data.map((t, idx) => (
          <div key={idx} className="border-2 border-violet-500 p-4 rounded">
            <p>Name: {t.name}</p>
            <p>Symbol: {t.symbol}</p>
            <p>
              Mint:{" "}
              <a
                className={`text-violet-500`}
                target="_blank"
                rel="noreferrer"
                href={`https://solscan.io/token/${t.mint}?cluster=devnet`}
              >
                {t.mint}
              </a>
            </p>

            <Button1
              disabled={isTransfering}
              onClick={() =>
                claimTokens(t.mint, t.token_account, t.amount, t.decimals)
              }
            >
              {isTransfering
                ? "Transferring..."
                : `Get ${t.amount} ${t.symbol}`}
            </Button1>
          </div>
        ))}
      </div>

      {txnUrl && (
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
      )}
    </div>
  )
}
