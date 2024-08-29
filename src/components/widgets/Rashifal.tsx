import React from "react";
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
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RashifalDetails = [
  {
    image: Mesh,
    initials: "चु, चे, चो, ला, लि, लु, ले, लो, अ",
    title: "मेष",
  },
  {
    image: Brish,
    initials: "इ, उ, ए, ओ, बा, बि, बु, बे, बो",
    title: "वृष",
  },
  {
    image: Mithun,
    initials: "का, की, कु, घ, ङ, छ, के, को, ह",
    title: "मिथुन",
  },
  {
    image: Karkat,
    initials: "हि, हु, हे, हो, डा, डि, डु, डे, डो",
    title: "कर्कट",
  },
  {
    image: Singh,
    initials: "मा, मि, मु, मे, मो, टा, टि, टु, टे",
    title: "सिंह",
  },
  {
    image: Kanya,
    initials: "टो, प, पि, पु, ष, ण, ठ, पे, पो",
    title: "कन्या",
  },
  {
    image: Tula,
    initials: "र, रि, रु, रे, रो, ता, ति, तु, ते",
    title: "तुला",
  },
  {
    image: Vrishchik,
    initials: "तो, ना, नि, नु, ने, नो, या, यि, यु",
    title: "वृश्चिक",
  },
  {
    image: Dhanu,
    initials: "ये, यो, भ, भि, भु, ध, फा, ढ, भे",
    title: "धनु",
  },
  {
    image: Makar,
    initials: "भो, ज, जि, खि, खु, खे, खो, गा, गि",
    title: "मकर",
  },
  {
    image: Kumbha,
    initials: "गु, गे, गो, सा, सि, सु, से, सो, द",
    title: "कुम्भ",
  },
  {
    image: Meen,
    initials: "दि, दु, थ, झ, ञ, दे, दो, च, चि",
    title: "मीन",
  },
];

const Rashifal = () => {
  return (
    <div>
      <div id="title" className="text-4xl text-primary font-extrabold">
        राशिफल
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 container mt-4">
        {RashifalDetails.map((item, index: number) => (
          <Card
            key={index}
            className=" p-4 rounded-lg shadow-md flex gap-2 flex-col items-center justify-center"
          >
            <div className="bg-orange-200 p-1 w-20 h-20 flex items-center justify-center rounded-full aspect-square">
              <Image
                src={item.image.src}
                alt={item.title}
                height={500}
                width={500}
                className="w-16 h-16 object-cover rounded-full mb-2"
              />
            </div>
            <h2 className="text-2xl font-bold text-center">{item.title}</h2>
            <p className="text-muted-foreground text-center">{item.initials}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Rashifal;
