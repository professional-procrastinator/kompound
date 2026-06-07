import Button from "@/components/button/button";
import { Link } from "next-view-transitions";

export default function LandingContent() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <div className="flex flex-row items-center w-full px-[25%] gap-[10%]">
        <div className="flex flex-col gap-4 w-3/5">
          <div className="text-5xl text-(--foreground) font-extrabold">
            Kompound
          </div>
          <div className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 w-1/2">
          <Button primary={true}>
            <Link href="/play">Play Today's Kompound</Link>
          </Button>
          <div className="flex flex-row gap-[5]">
            <div className="text-gray-600">or learn</div>
            <div className="hover:underline hover:cursor-pointer">
              {" "}
              how to play
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
