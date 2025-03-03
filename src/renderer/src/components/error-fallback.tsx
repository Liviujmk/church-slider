export const ErrorFallback = ({
  error,
  resetErrorBoundary
}: {
  error: Error
  resetErrorBoundary: () => void
}) => {
  return (
    <div
      role="alert"
      className="absolute p-4 bg-red-100 border border-red-500 rounded-lg bottom-4 right-4"
    >
      <h2 className="font-semibold text-red-700">Ceva n-a mers bine!</h2>
      <p className="text-red-600">{error.message}</p>
      <button className="px-4 py-2 mt-2 text-white bg-red-600 rounded" onClick={resetErrorBoundary}>
        Reîncearcă
      </button>
    </div>
  )
}
