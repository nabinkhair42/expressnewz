//@ts-nocheck
import React from "react";
import { Input } from "@nextui-org/input";
import { Search } from "lucide-react";
import Weather from "./Weather";

const DateTemperature: React.FC = () => {
  return (
    <div className="border-b fixed w-full bg-background h-20 flex items-center">
      <div className="container flex w-full justify-around">
        <Weather />
        <Input
          className="max-w-md mt-4 h-16"
          type="text"
          size="lg"
          isClearable
          labelPlacement="outside"
          variant="bordered"
          maxLength={20}
          placeholder="Search for news"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">
                <Search size={20} />
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default DateTemperature;
