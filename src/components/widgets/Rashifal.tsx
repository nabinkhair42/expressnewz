"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Brish from "/public/rashifall/brish.png";
import Karkat from "/public/rashifall/karkat.png";
import Kumbha from "/public/rashifall/kumbha.png";
import Makar from "/public/rashifall/makar.png";
import Mesh from "/public/rashifall/mesh.png";
import Mithun from "/public/rashifall/mithun.png";
import Singh from "/public/rashifall/singh.png";
import Tula from "/public/rashifall/tula.png";
import Vrishchik from "/public/rashifall/vrishchik.png";
import Dhanu from "/public/rashifall/dhanu.png";
import Kanya from "/public/rashifall/kanya.png";
import Meen from "/public/rashifall/meen.png";
import { Card } from "@/components/ui/card";

// Define a type for the fetched data
type RashifalItem = {
  name: string;
  value: string;
};

const Rashifal = () => {
  const [rashifalDetails, setRashifalDetails] = useState<any[]>([]);

  useEffect(() => {
    const fetchRashifal = async () => {
      try {
        const response = await fetch("/api/rashifal");
        const data: RashifalItem[] = await response.json();

        // Map JSON data to the expected structure
        const mappedData = data.map((item) => {
          // Map the name to the corresponding image and initials
          let image;
          let initials = "";
          switch (item.name.split(" ")[0]) {
            case "मेष":
              image = Mesh;
              initials = "चु, चे, चो, ला, लि, लु, ले, लो, अ";
              break;
            case "वृष":
              image = Brish;
              initials = "इ, उ, ए, ओ, बा, बि, बु, बे, बो";
              break;
            case "मिथुन":
              image = Mithun;
              initials = "का, की, कु, घ, ङ, छ, के, को, ह";
              break;
            case "कर्कट":
              image = Karkat;
              initials = "हि, हु, हे, हो, डा, डि, डु, डे, डो";
              break;
            case "सिंह":
              image = Singh;
              initials = "मा, मि, मु, मे, मो, टा, टि, टु, टे";
              break;
            case "कन्या":
              image = Kanya;
              initials = "टो, प, पि, पु, ष, ण, ठ, पे, पो";
              break;
            case "तुला":
              image = Tula;
              initials = "र, रि, रु, रे, रो, ता, ति, तु, ते";
              break;
            case "वृश्चिक":
              image = Vrishchik;
              initials = "तो, ना, नि, नु, ने, नो, या, यि, यु";
              break;
            case "धनु":
              image = Dhanu;
              initials = "ये, यो, भ, भि, भु, ध, फा, ढ, भे";
              break;
            case "मकर":
              image = Makar;
              initials = "भो, ज, जि, खि, खु, खे, खो, गा, गि";
              break;
            case "कुम्भ":
              image = Kumbha;
              initials = "गु, गे, गो, सा, सि, सु, से, सो, द";
              break;
            case "मीन":
              image = Meen;
              initials = "दि, दु, थ, झ, ञ, दे, दो, च, चि";
              break;
            default:
              image = null; // Handle unknown names if needed
              initials = ""; // Handle unknown initials if needed
          }

          return {
            image,
            initials,
            title: item.name,
            description: item.value,
          };
        });

        setRashifalDetails(mappedData);
      } catch (error) {
        console.error("Error fetching rashifal data:", error);
      }
    };

    fetchRashifal();
  }, []);

  return (
    <div className="mt-4 w-full flex flex-col gap-4">
      <div id="title" className="text-5xl text-primary font-extrabold text-center outline-dotted">
        राशिफल
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 container">
        {rashifalDetails.map((item, index) => (
          <Card
            key={index}
            className="p-4 rounded-lg shadow-md flex gap-3 flex-col items-center justify-center"
          >
            <div className="bg-orange-200 p-1 w-20 h-20 flex items-center justify-center rounded-full aspect-square">
              <Image
                src={item.image?.src || ""}
                alt={item.title}
                height={500}
                width={500}
                className="w-16 h-16 object-cover rounded-full mb-2"
              />
            </div>

            <h2 className="text-3xl font-bold text-center">
              {item.title.split(" ")[0]}
            </h2>

            <p className="text-muted-foreground text-center text-lg">
              ({item.initials})
            </p>
            <p className="text-muted-foreground text-center text-xl">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Rashifal;
