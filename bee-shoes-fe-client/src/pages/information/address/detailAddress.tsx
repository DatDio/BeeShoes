import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface AddressProps {
  prov: string;
  distr: string;
  war: string;
  spec: string;
}

interface Province {
  ProvinceID: number;
  ProvinceName: string;
}

interface District {
  DistrictID: number;
  DistrictName: string;
}

interface Ward {
  WardCode: string;
  WardName: string;
}

function DetailAddress({ prov, distr, war, spec }: AddressProps) {
  const [province, setProvince] = useState<string | null>(null);
  const [district, setDistrict] = useState<string | null>(null);
  const [ward, setWard] = useState<string | null>(null);
  const configApi = {
    headers: {
      Token: "aef361b5-f26a-11ed-bc91-ba0234fcde32",
      "Content-Type": "application/json",
      ShopId: 124173,
    },
  };
  console.log(province, district, ward);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const provinceResponse: AxiosResponse = await axios.get(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
          configApi
        );
        console.log("provinceResponse", provinceResponse);

        const districtResponse: AxiosResponse = await axios.get(
          // `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${prov}`,
             `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${prov}`,
          configApi
        );

        console.log("districtResponse", districtResponse);

        const wardResponse: AxiosResponse = await axios.get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${distr}`,
          configApi
        );

        console.log("wardResponse", wardResponse?.data.data);
        if (!!provinceResponse && !!wardResponse && !!districtResponse) {
          setProvince(
            provinceResponse?.data?.data.find(
              (item: any) => item?.ProvinceID === parseInt(prov, 10)
            )?.ProvinceName || null
          );
          setDistrict(
            districtResponse?.data?.data.find(
              (item: any) => item?.DistrictID === parseInt(distr, 10)
            )?.DistrictName || null
          );
          setWard(
            wardResponse?.data?.data.find((item: any) => item?.WardCode === war)
              ?.WardName || null
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [prov, distr, war]);

  return (
    <>
      {ward && district && province
        ? `${spec},${ward}, ${district}, ${province}`
        : null}
    </>
  );
}

export default DetailAddress;
