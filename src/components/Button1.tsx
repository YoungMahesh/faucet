export default function Button1({
  children,
  ...props
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <>
      {props.disabled ? (
        <button
          disabled={true}
          className="rounded bg-violet-500 py-2 px-4 font-bold text-white hover:bg-violet-500"
        >
          {children}
        </button>
      ) : (
        <button
          onClick={props.onClick}
          className="rounded bg-violet-700 py-2 px-4 font-bold text-white hover:bg-violet-700"
        >
          {children}
        </button>
      )}
    </>
  )
}
