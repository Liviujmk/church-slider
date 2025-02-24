export const NoSearchResults = () => {
  return (
    <div className="flex flex-col items-center text-center text-neural-600">
      <h2 className="mt-4 text-lg font-semibold dark:text-neutral-400 text-neutral-600">
        Nu am găsit nicio melodie care să corespundă căutării tale.
      </h2>
      <p className="mt-2 text-sm dark:text-neutral-600 text-neutral-400">
        Încearcă să folosești alte cuvinte-cheie sau verifică dacă ai introdus corect titlul dorit.
      </p>
    </div>
  )
}
