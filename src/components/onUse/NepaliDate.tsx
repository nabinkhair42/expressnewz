//@ts-nocheck
import React from "react";
import { Input } from "../ui/input";
import NepaliDate from "nepali-date";
import { Calendar, Search, TimerIcon } from "lucide-react";

import { ConvertToNepaliNumerals } from "@/components/reusable/NepaliNumerals";

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
    <div className="flex flex-col justify-center md:justify-start gap-2">
      <span className="flex text-nowrap items-center">
        <Calendar height={16} />
        {ConvertToNepaliNumerals(getNepaliDate())}
      </span>
      <span className="flex text-nowrap items-center">
        <span className="flex text-nowrap items-center">
          <TimerIcon height={16} />
          {ConvertToNepaliNumerals(new Date().toLocaleTimeString())}
        </span>
      </span>
    </div>
  );
};

export default DateinNepali;
