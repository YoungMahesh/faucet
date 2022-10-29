import { useAtom } from "jotai"
import { network1, Network } from "../state/home"


export default function NetworkSwitcher() {
		const [currNet, setCurrNet] = useAtom(network1)

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
                        onChange={() => setCurrNet(Network.FantomTestnet)}
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
                        onChange={() => setCurrNet(Network.SolanaDevnet)}
                    />
                    <span className="ml-2">Solana</span>
                </label>
            </div>
        </div>
    )
}
