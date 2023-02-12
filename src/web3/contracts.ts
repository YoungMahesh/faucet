import { Contract, Signer } from "ethers"
import FaucetMeta from "./abi/Faucet.json"

export const faucetContract = (signer: Signer) => {
  return new Contract(
    "0x242749b16b4127c56a6a7648b700c3438cc15f02",
    FaucetMeta.abi,
    signer
  )
}
