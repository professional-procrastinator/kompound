import { motion } from "motion/react";
export default function FloatingInput({
  placeholder,
  value,
  setValue,
  onEnter,
}: {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  onEnter?: () => void;
}) {
  return (
    <motion.div
      className="min-w-full h-25 absolute z-index:50 top-0"
      layoutId="floatingInput"
    >
      <motion.div
        className="min-w-full"
        animate={{ y: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <input
          type="text"
          placeholder="Start typing to guess.."
          className="border-(--foreground) border-4 rounded-xl px-12 py-8 min-w-full h-25 text-xl"
        />
      </motion.div>
    </motion.div>
  );
}
