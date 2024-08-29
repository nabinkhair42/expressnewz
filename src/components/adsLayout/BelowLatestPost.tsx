import React from "react";
import Ads1 from "/public/ads/900pix100.gif";
import Image from "next/image";
const BelowLatestPost = () => {
  return (
    <div className="mt-4">
      <Image src={Ads1} alt="Ads" />
    </div>
  );
};

export default BelowLatestPost;
