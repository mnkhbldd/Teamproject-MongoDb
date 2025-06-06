"use client";
import { CompanyDetailCard } from "@/components/CompanyDetailCard";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";

export const SideBarExplore = () => {
  const [company, setCompany] = useState([]);
  useEffect(() => {
    const FetchData = async () => {
      const res = await axiosInstance.get("/company/get-companies");
      const data = await res.data.companies;
      setCompany(data);
      console.log(data, "companydatas");
    };
    FetchData();
  }, []);
  return (
    <div className=" overflow-y-scroll w-full flex flex-col gap-3 pt-13 from-black to-gray-800 bg-gradient-to-b h-full">
      {company.map((values, index) => {
        return <CompanyDetailCard key={index} company={values} />;
      })}
    </div>
  );
};
