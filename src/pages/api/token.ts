import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { Network } from "../../types/main"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { page, network }: { page: string; network: Network } =
        req.query as any
      const skip = parseInt(page) * 10
      let tokens
      if (network === "SolanaDevnet") {
        tokens = await prisma.solana_dev_tokens.findMany({
          skip,
          take: 10,
        })
      } else if (network === "FantomTestnet") {
        tokens = await prisma.fantom_test_tokens.findMany({
          skip,
          take: 10,
        })
      }
      res.status(200).json(tokens)
    } catch (err) {
      console.log(err)
      res.status(400).json([])
    }
  }
}
