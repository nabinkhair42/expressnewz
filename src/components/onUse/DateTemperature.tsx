import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import Weather from "./Weather";

const DateTemperature: React.FC = () => {
  return (
    <div className="border-b fixed w-full bg-background h-20 flex items-center">
      <div className="container flex w-full justify-around">
        <Weather city="" />
        <div className="flex items-center justify-center">
          <div className="relative max-w-md w-full">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              type="search"
              placeholder="Search news, articles..."
              className="pl-10 h-12 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTemperature;
