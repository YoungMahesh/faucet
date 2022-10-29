import { useQuery } from "@tanstack/react-query"
import { Network } from "../types/main"
import { PublicKey, Keypair, Connection, clusterApiUrl } from "@solana/web3.js"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token"
import { Contract, Wallet, providers } from "ethers"
import { BNF } from "./utils"

export interface Token1 {
  name: string
  symbol: string
  address: string
  token_account: string
  transfer_amount: number
  decimals: number
}

const fetchSolanaDevTokens = async (page: number, network: Network) => {
  try {
    const result = await fetch(`/api/token?page=${page}&network=${network}`)
    const tokens0 = await result.json()

    const tokens: Token1[] = tokens0.map((t: any) => ({
      ...t,
      address: network === Network.SolanaDevnet ? t.mint : t.address,
      token_account: network === Network.SolanaDevnet ? t.token_account : "",
    }))
    return tokens
  } catch (err) {
    console.log(err)
    return []
  }
}

export const useTokensList = (page: number, network: Network) =>
  useQuery([network], () => fetchSolanaDevTokens(page, network))

//--------------------Solana Devnet-------------------------------

export const transferSplTokens1 = async (
  recWallet: string,
  mint: string,
  tokenAcc: string,
  amount: number,
  decimals: number
) => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
    const secretKey = new Uint8Array(
      JSON.parse(process.env.NEXT_PUBLIC_SOL_SECRET_KEY!)
    )
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
    return `https://solscan.io/tx/${txn}?cluster=devnet`
  } catch (err) {
    console.log(err)
    return ""
  }
}

//----------------------Fantom Testnet----------------------------

export const transferERC20Tokens1 = async (
  recWallet: string,
  tokenAddress: string,
  amount: number,
  decimals: number
) => {
  try {
    const erc20Abi = [
      "function transfer(address to, uint256 amount) external returns (bool)",
    ]
    const getSigner = () => {
      const privateKey = process.env.NEXT_PUBLIC_EVM_SECRET_KEY
      const provider = new providers.JsonRpcProvider(
        "https://rpc.testnet.fantom.network"
      )
      return new Wallet(privateKey!, provider)
    }
    const erc20Contract = (tokenAddress: string) =>
      new Contract(tokenAddress, erc20Abi, getSigner())
    const txn = await erc20Contract(tokenAddress).transfer(
      recWallet,
      BNF(amount)
        .mul(BNF(10).pow(BNF(decimals)))
        .toString()
    )
    await txn.wait(1)
    return `https://testnet.ftmscan.com/tx/${txn.hash}`
  } catch (err) {
    console.log(err)
    return ""
  }
}
