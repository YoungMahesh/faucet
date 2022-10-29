import { useQuery } from '@tanstack/react-query'

interface Token {
    name: string
    symbol: string
    mint: string
    token_account: string
    amount: number
    decimals: number
}
const fetchTokens = async (page: number) => {
    try {
        console.log('fetching tokens data')
        const result = await fetch('/api/token?page=' + 0)
        const tokens: Token[] = await result.json()
        return tokens
    } catch (err) {
        console.log(err)
        return []
    }
}

export const useTokensList = (page: number) =>
    useQuery(['userDetails'], () => fetchTokens(page))
