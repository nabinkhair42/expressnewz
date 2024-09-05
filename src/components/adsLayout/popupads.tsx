"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import PopupImage from "/public/ads/popup.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowBigRight } from "lucide-react";

const AdPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Show the popup immediately on screen load
    setIsVisible(true);

    // Disable the button for 5 seconds, then enable it
    const timer = setTimeout(() => {
      setIsButtonDisabled(false); // Enable the button after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
      <DialogContent className="bg-background max-w-lg mx-auto p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Special Offer!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-muted-foreground mt-2">
          <Image src={PopupImage} alt="Popup Image" className="rounded-md" />
        </DialogDescription>
        <DialogFooter className="mt-4">
          {/* Disable the button initially and make it clickable after 5 seconds */}
          <Button
            onClick={handleClose}
            disabled={isButtonDisabled}
            className={`px-4 py-2 rounded ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Skip <ArrowBigRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdPopup;
