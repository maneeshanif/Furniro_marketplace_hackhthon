import ProdDesc from "@/components/shop/singProd/ProdDesc";
import RelatedProd from "@/components/shop/singProd/RelatedProd";
import SingleProduct from "@/components/shop/singProd/Singlemain/SingleProduct";
import React from "react";

interface pageProps {
  params: Promise<{
    id: string;
  }>;
}

const page = async (params: pageProps) => {
  const { id } = await params.params;

  return (
    <div>
      {/* <h1>{id}</h1> */}
      <SingleProduct _id={id} />
      <ProdDesc _id={id} />
      <RelatedProd />
      {/* <RelatedProd currentProductId={id}  /> */}
    </div>
  );
};

export default page;
