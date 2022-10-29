import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { page }: { page: string } = req.query as any
      console.log("page", page)
      const skip = parseInt(page) * 10
      const tokens0 = await prisma.token.findMany({
        skip,
        take: 10,
      })
      const tokens = tokens0.map((t) => t)
      res.status(200).json(tokens)
    } catch (err) {
      console.log(err)
      res.status(400).json([])
    }
  }
}
