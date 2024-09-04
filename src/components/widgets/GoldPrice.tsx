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
import { Gold, Silver } from "@/icons/icons";
import Link from "next/link";
import { GoldSkeleton } from "../skeletons/GoldSkeleton";
import { ConvertToNepaliNumerals } from "@/components/reusable/NepaliNumerals";
import { Separator } from "@/components/ui/separator";

interface PriceData {
  name: string;
  price: string;
  unit: string;
}
const PriceCard: React.FC = () => {
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("/api/prices");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: PriceData[] = await res.json();
        setPrices(data);
      } catch (error) {
        setError("Error fetching prices.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div className="w-full">
      <div className="pt-6 px-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex gap-2 items-center">
            सुन र चाँदीको मूल्य
          </CardTitle>
          <CardDescription className="text-sm">
            नेपाल राष्ट्र बैंकद्वारा प्रकाशित सुन र चाँदीको मूल्य
          </CardDescription>
        </CardHeader>
        <div className="mt-2 text-nowrap">
          <CardDescription className="text-sm">
            {loading ? (
              <GoldSkeleton />
            ) : error ? (
              <div className="p-4 text-red-500">{error}</div>
            ) : prices.length > 0 ? (
              //Show first 3 content
              prices.slice(0, 3).map((price, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {price.name.includes("Gold") ? (
                      <Gold className="text-yellow-500" />
                    ) : price.name.includes("Silver") ? (
                      <Silver className="text-silver-500" />
                    ) : null}
                    {price.name}
                  </div>
                  <span className="text-primary">
                    रु. {ConvertToNepaliNumerals(parseFloat(price.price))}/
                    {price.unit}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4">डाटा उपलब्ध छैन</div>
            )}
          </CardDescription>
        </div>
        <Separator />
        <div className="flex justify-end py-2">
          <Link href="/gold" className="text-primary">
            थप विवरणहरू
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
