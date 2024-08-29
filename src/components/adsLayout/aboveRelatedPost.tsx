import React from "react";
import Ads1 from "/public/ads/900pix100.gif";
import Image from "next/image";
const AboveRelatedPost = () => {
  return (
    <div className="mt-4 flex items-center justify-center w-full">
      <Image src={Ads1} alt="Ads" />
    </div>
  );
};

export default AboveRelatedPost;
