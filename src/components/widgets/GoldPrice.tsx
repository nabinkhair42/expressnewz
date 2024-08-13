"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Divider } from "@nextui-org/react";
import { Gold, NepaliRupee, Silver } from "@/components/icons/icons";
import toast from "react-hot-toast";
import Link from "next/link";
import { ChartColumn } from "lucide-react";
import { fetchMetalPrices, MetalPrices } from "@/lib/goldApi";

// Function to convert Arabic numerals to Nepali numerals
const convertToNepaliNumerals = (number: number) => {
  const arabicNumerals = "0123456789";
  const nepaliNumerals = "०१२३४५६७८९";
  return number
    .toString()
    .split("")
    .map((digit) => {
      const index = arabicNumerals.indexOf(digit);
      return index !== -1 ? nepaliNumerals[index] : digit;
    })
    .join("");
};

const GoldPrice: React.FC = () => {
  const [prices, setPrices] = useState<MetalPrices | null>(null);

  const fetchData = async () => {
    const data = await fetchMetalPrices();
    if (data) {
      setPrices(data);
    } else {
      toast.error("धातु मूल्यहरू प्राप्त गर्न त्रुटि");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>सुन र चाँदीको मूल्य</CardTitle>
          <CardDescription>
            नेपाल राष्ट्र बैंकद्वारा प्रकाशित सुन र चाँदीको मूल्य
          </CardDescription>
        </CardHeader>
        <Divider />
        <CardContent>
          <CardDescription>
            <div className="flex justify-between items-center hover:bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 text-lg">
                <Gold className="text-yellow-500" />
                सुनको मूल्य
              </div>
              <span className="text-primary font-bold text-lg">
                {prices
                  ? `रु. ${convertToNepaliNumerals(
                      parseFloat(prices.goldPrice.toFixed(2))
                    )}`
                  : "लोड हुँदै..."}
              </span>
            </div>
            <div className="flex justify-between items-center hover:bg-muted p-4 rounded-lg">
              <div className="flex items-center gap-2 text-lg">
                <Silver className="text-silver-500" />
                चाँदीको मूल्य
              </div>
              <span className="text-primary font-bold text-lg">
                {prices
                  ? `रु. ${convertToNepaliNumerals(
                      parseFloat(prices.silverPrice.toFixed(2))
                    )}`
                  : "लोड हुँदै..."}
              </span>
            </div>
          </CardDescription>
        </CardContent>
        <Divider />
        <CardFooter className="flex justify-end">
          <Link href="/gold-price" className="pt-4 text-primary font-bold">
            थप विवरणहरू
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GoldPrice;
