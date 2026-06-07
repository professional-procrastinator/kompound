export default function WordCard({
  wordEnglish,
  wordGerman,
  status,
}: {
  wordEnglish?: string;
  wordGerman?: string;
  status: 0 | 1 | 2 | 3;
}) {
  return (
    <div
      className={`flex items-center justify-center w-50 h-25 rounded-xl text-white font-bold text-2xl ${
        status === 0
          ? "bg-(--background)"
          : status === 1
            ? "bg-gray-500"
            : status === 2
              ? "bg-yellow-500"
              : "bg-green-500"
      } ${status === 0 ? "border-(--border_lightgrey) border-[0.5px]" : status === 1 ? "border-(--border_grey) border-4" : status === 2 ? "border-(--border_yellow) border-4" : "border-(--border_green) border-4"}`}
    >
      <div>
        <div>{wordEnglish}</div>
        <div>{wordGerman}</div>
      </div>
    </div>
  );
}
