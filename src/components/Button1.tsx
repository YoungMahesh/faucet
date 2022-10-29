export default function Button1({
    children,
    ...props
}: {
    children: React.ReactNode
    onClick: () => void
    disabled?: boolean
}) {
    return (
        <button
            disabled={props.disabled}
            onClick={props.onClick}
            className={`mt-4 rounded bg-violet-700 py-2 px-4 font-bold text-white hover:bg-violet-700`}
        >
            {children}
        </button>
    )
}
