export default function WordCard({
  wordEnglish,
  wordGerman,
  status,
}: {
  wordEnglish?: string;
  wordGerman?: string;
  status: 0 | 1 | 2;
}) {
  return (
    <div
      className={`flex items-center justify-center w-50 h-25 rounded-xl text-white font-bold text-2xl ${
        status === 0
          ? "bg-(--background)"
          : status === 1
            ? "bg-gray-500"
            : "bg-green-500"
      } ${status === 0 ? "border-[0.5px] border-(--border_lightgrey)" : status === 1 ? "border-4 border-(--border_grey)" : "border-4 border-(--border_green)"}`}
    >
      <div>
        <div>{wordEnglish}</div>
        <div>{wordGerman}</div>
      </div>
    </div>
  );
}
