import type { NextApiRequest, NextApiResponse } from "next"
import { PublicKey, Keypair, Connection, clusterApiUrl } from "@solana/web3.js"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token"
import { BNF } from "../../web3/utils"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const {
        recWallet,
        mint,
        tokenAcc,
        amount,
        decimals,
      }: {
        recWallet: string
        mint: string
        tokenAcc: string
        amount: number
        decimals: number
      } = req.query as any

      const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
      const secretKey = new Uint8Array(JSON.parse(process.env.SOL_SECRET_KEY!))
      const payer = Keypair.fromSecretKey(secretKey)

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
        transferAmt,
        [],
        { commitment: "confirmed" }
      )
      res.status(201).end(`https://solscan.io/tx/${txn}?cluster=devnet`)
    } catch (err) {
      console.log(err)
      res.status(400).end("")
    }
  }
}

export const transferSplTokens1 = async () => {}
