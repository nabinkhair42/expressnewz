//@ts-nocheck
import React from "react";
import { Input } from "../ui/input";
import NepaliDate from "nepali-date";
import { Calendar, TimerIcon } from "lucide-react";
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

const getNepaliTime = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  const convertToNepaliNumerals = (number) => {
    const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return number.toString().replace(/\d/g, (match) => nepaliDigits[parseInt(match, 10)]);
  };

  return `${convertToNepaliNumerals(hours)}:${convertToNepaliNumerals(minutes)}`;
};

const DateinNepali: React.FC = () => {
  return (
    <div className="flex flex-col justify-center md:justify-start">
      <span className="flex text-nowrap items-center">
        <Calendar height={16} />
        {ConvertToNepaliNumerals(getNepaliDate())}
      </span>
      <span className="flex text-nowrap items-center">
        <TimerIcon height={16} />
        {getNepaliTime()}
      </span>
    </div>
  );
};

export default DateinNepali;
