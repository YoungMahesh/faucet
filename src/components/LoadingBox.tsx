export default function LoadingBox({ note }: { note: string }) {
  return (
    <div className="w-full">
      <p className="text-xl text-center">{note}</p>
    </div>
  )
}
