"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GoldSkeleton } from "@/components/skeletons/GoldSkeleton";

interface Price {
  name: string;
  price: string;
  unit: string;
}

const GoldPricePage = () => {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get("/api/prices");
        setPrices(response.data);
      } catch (err) {
        setError("मूल्य ल्याउन असफल भयो।");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (loading) return <div className="text-center py-8">
    <GoldSkeleton />
  </div>;
  if (error)
    return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">सुन र चाँदीका मूल्यहरू</h1>
      <div className=" rounded-lg p-4 mb-8">
        <h2 className="text-2xl font-semibold mb-4">वर्तमान मूल्यहरू</h2>
        <Table className="border rounded-md">
          <TableCaption>सुन र चाँदीका विभिन्न प्रकारका मूल्यहरू</TableCaption>
          <TableHeader>
            <TableRow className="text-xl font-bold">
              <TableHead>नाम</TableHead>
              <TableHead>मूल्य</TableHead>
              <TableHead>इकाइ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices.map((price, index) => (
              <TableRow key={index}>
                <TableCell>{price.name}</TableCell>
                <TableCell>रु. {price.price}</TableCell>
                <TableCell>{price.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className=" rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">विस्तृत लेख</h2>
        <p className=" mb-4">
          सुन सदियौंदेखि मूल्यवान वस्तु हो र यसको मूल्य विभिन्न कारणहरूले
          प्रभावित हुन्छ, जसमध्ये बजारको माग, भू-राजनीतिक घटनाक्रम र आर्थिक
          अवस्थाहरू समावेश छन्। सुनको मूल्य प्रायः तोला वा १० ग्रामको आधारमा
          उद्धृत गरिन्छ, क्षेत्रीय अनुसार फरक-फरक हुन्छ।
        </p>
        <p className=" mb-4">
          <strong>ऐतिहासिक प्रवृत्तिहरू:</strong> ऐतिहासिक रूपमा, सुनको मूल्यमा
          महत्वपूर्ण उतार-चढाव देखिएका छन्। आर्थिक अनिश्चितता वा महंगाईको समयमा,
          लगानीकर्ताहरू सुरक्षित आश्रयको खोजीमा आउने हुँदा सुनको मूल्य बढ्न
          सक्छ। यसको विपरीत, आर्थिक स्थिरताको समयमा, माग घट्नाले सुनको मूल्य कम
          हुन सक्छ।
        </p>
        <p className=" mb-4">
          <strong>मूल्य प्रभावित गर्ने तत्वहरू:</strong> सुनको मूल्यलाई प्रभावित
          गर्ने विभिन्न तत्वहरू छन्, जसमध्ये:
          <ul className="list-disc list-inside ml-6 mb-4">
            <li>वैश्विक आर्थिक अवस्थाहरू</li>
            <li>महंगाई दर</li>
            <li>ब्याज दरहरू</li>
            <li>भू-राजनीतिक तनावहरू</li>
            <li>आपूर्ति र मागको गतिको</li>
          </ul>
        </p>
        <p className=" mb-4">
          <strong>लगानी विचारहरू:</strong> सुनमा लगानी गर्नुले विविधिकरणको
          रणनीति अपनाउन र आर्थिक अस्थिरताको विरुद्ध सुरक्षा गर्न मद्दत पुर्‍याउन
          सक्छ। तर, लगानी गर्नुअघि सम्बन्धित जोखिमहरूको विचार गर्न र व्यापक
          अनुसन्धान गर्न महत्त्वपूर्ण छ।
        </p>
        <p className=" mb-4">
          वर्तमान सुनको मूल्य र प्रवृत्तिहरूको लागि, विश्वसनीय आर्थिक स्रोतहरूमा
          परामर्श गर्न वा आर्थिक विशेषज्ञसँग सल्लाह लिन सिफारिश गरिन्छ।
        </p>
      </div>
    </div>
  );
};

export default GoldPricePage;
