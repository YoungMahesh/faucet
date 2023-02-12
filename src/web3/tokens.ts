export const MoonCoinAddr = "0x18a8aACDe4B9ab03Abf9B7932b4099BDafb23e4E"

export interface TokenInfo {
  name: string
  symbol: string
  address: string
  decimals: number
  transfer_amount: number
  token_account: string
}

export const FantomTestnetCoins: TokenInfo[] = [
  {
    name: "MoonCoin",
    symbol: "MN",
    address: "0x18a8aACDe4B9ab03Abf9B7932b4099BDafb23e4E",
    decimals: 18,
    transfer_amount: 700,
    token_account: "",
  },
]

export const SolanaDevnetCoins: TokenInfo[] = [
  {
    name: "Beyblade",
    symbol: "BBD",
    address: "EF6LXctWsuPt3fbVxmQE99CquRF6A2XXRAbiPderMRdS",
    token_account: "Cumo9um9zuazueqw15WA1UjECvbDpYKwBpyMUFjqQSr7",
    transfer_amount: 1,
    decimals: 9,
  },
]
