//@ts-nocheck

// src/components/DateTemperature.tsx
import React from "react";
import { Input } from "../ui/input";
import NepaliDate from "nepali-date";
import Weather from "./Weather";

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
    <div className="border-b">
      <div className="container flex flex-col md:flex-row w-full justify-around py-4 border-b gap-4">
        <div className="text-center flex flex-col md:text-left">
          <span className="text-lg font-semibold">{getNepaliDate()}</span>
          <span className="text-muted-foreground">{getEnglishDate()}</span>
        </div>

        <div className="lg:w-[400px] xl:w-[600px] md-w-[300px] flex items-center justify-center">
          <Input type="search" placeholder="Search news" className="max-w-md " />
        </div>
        <Weather city="Biratnagar" />
      </div>
    </div>
  );
};

export default DateTemperature;
