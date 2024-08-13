//@ts-nocheck

// src/components/DateTemperature.tsx
import React from "react";
import { Input } from "../ui/input";
import NepaliDate from "nepali-date";
import Weather from "./Weather";
import { Calendar, Search } from "lucide-react";

const getEnglishDate = (): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return now.toLocaleDateString("en-US", options);
};

const getNepaliDate = (): string => {
  const now = new Date();
  const nepaliDate = new NepaliDate(now);

  const year = nepaliDate.getYear();
  const monthIndex = nepaliDate.getMonth();
  const day = nepaliDate.getDate();

  const nepaliMonths = [
    "बैसाख",
    "जेष्ठ",
    "आषाढ",
    "श्रावण",
    "भदौ",
    "आश्वयुज",
    "कार्तिक",
    "मङ्सिर",
    "पुष",
    "माघ",
    "फाल्गुन",
    "चैत",
  ];

  const monthName = nepaliMonths[monthIndex];

  return `${day} ${monthName} ${year}`;
};

const DateTemperature: React.FC = () => {
  return (
    <div className="border-b fixed w-full bg-background">
      <div className="container flex flex-col md:flex-row w-full justify-around py-4 gap-4">
        <div className="flex flex-col justify-center md:justify-start">
          <span className="flex items-center md:justify-start justify-center">
            <Calendar height={16} />
            {getNepaliDate()}
          </span>
          <span className="flex text-muted-foreground md:justify-start justify-center">
            {getEnglishDate()}
          </span>
        </div>

        <div className="lg:w-[400px] xl:w-[600px] md:w-[300px] flex items-center justify-center">
          <div className="relative max-w-md w-full">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted"
              size={20}
            />
            <Input
              type="search"
              placeholder="Search news, articles..."
              className="pl-10 h-12 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:primary"
            />
          </div>
        </div>
        <Weather city="Biratnagar" />
      </div>
    </div>
  );
};

export default DateTemperature;
