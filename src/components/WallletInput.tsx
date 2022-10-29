import { useAtom } from 'jotai'
import { wallet } from '../state/home'

export default function WalletInput() {
    const [recWallet, setRecWallet] = useAtom(wallet)

    return (
        <div className="w-full">
            <div className="flex justify-center items-center m-4 mt-8">
                Your Wallet: &nbsp; &nbsp;
                <input
                    className="text-black w-[28rem] p-2"
                    type="text"
                    value={recWallet}
                    onChange={(e) => setRecWallet(e.target.value)}
                />
            </div>
        </div>
    )
}
