//@ts-nocheck
import React from "react";
import { Input } from "../ui/input";
import NepaliDate from "nepali-date";
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

const DateinNepali: React.FC = () => {
  return (
    <div className="flex flex-col justify-center md:justify-start">
      <span className="flex items-center md:justify-start justify-center">
        <Calendar height={16} />
        {getNepaliDate()}
      </span>
      <span className="flex text-muted-foreground md:justify-start justify-center">
        {getEnglishDate()}
      </span>
    </div>
  );
};

export default DateinNepali;
