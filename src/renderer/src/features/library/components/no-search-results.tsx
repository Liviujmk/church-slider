export const NoSearchResults = () => {
  return (
    <div className="flex flex-col items-center text-center text-gray-600">
      <h2 className="mt-4 text-lg font-semibold text-gray-700">
        Nu am găsit nicio melodie care să corespundă căutării tale.
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Încearcă să folosești alte cuvinte-cheie sau verifică dacă ai introdus corect titlul dorit.
      </p>
    </div>
  )
}
