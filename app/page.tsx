import Button from "@/components/button/button";
import { Suspense, ViewTransition } from "react";
import RootLayout from "./layout";
import LandingContent from "@/modules/landing/landing";
import PlayContent from "@/modules/play/play";

export default function Home() {
  return <LandingContent />;
}
