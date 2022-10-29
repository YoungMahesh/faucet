import { useAtom } from "jotai"
import { network1, wallet } from "../state/home"
import { Network } from "../types/main"

export default function NetworkSwitcher() {
  const [currNet, setCurrNet] = useAtom(network1)
  const [_, setWallet] = useAtom(wallet)

  const switchNetwork = (network: Network) => {
    setCurrNet(network)
    setWallet("")
  }

  return (
    <div className="m-8 flex justify-center">
      <div className="flex gap-4">
        <span>Wallet Type: </span>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="accountType"
            value={Network.FantomTestnet}
            checked={currNet === Network.FantomTestnet}
            onChange={() => switchNetwork(Network.FantomTestnet)}
          />
          <span className="ml-2">EVM</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            name="accountType"
            value={Network.SolanaDevnet}
            checked={currNet === Network.SolanaDevnet}
            onChange={() => switchNetwork(Network.SolanaDevnet)}
          />
          <span className="ml-2">Solana</span>
        </label>
      </div>
    </div>
  )
}
