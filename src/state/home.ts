import { atom } from "jotai"
export enum Network {
  FantomTestnet = "FantomTestnet",
  SolanaDevnet = "SolanaDevnet",
}

export const network1 = atom(Network.FantomTestnet)
export const wallet = atom("")
