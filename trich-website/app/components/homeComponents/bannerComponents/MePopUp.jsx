"use client";

import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import RevealTitle from "../../animation/Reveal";
import MorningEdgeBox from "./MorningEdgeBox";

const MePopUp = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button onClick={() => setIsOpen(true)}>
            toggle here
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="">
          <MorningEdgeBox />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MePopUp;
