"use client";
import { CompanyDetailCard } from "@/components/CompanyDetailCard";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
interface Company {
  _id: string;
  name: string;
  description: string;
  location: Array<{
    address: string;
    coordinate: [number, number];
  }>;
  phoneNumber: string;
  category: string[];
  socialMedia: {
    Facebook: string;
    instagram: string;
    website: string;
  };
  images: string[];
  companyLogo: string;
}

export const SideBarExplore = () => {
  const router = useRouter();
  const [company, setCompany] = useState([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const FetchData = async () => {
      const res = await axiosInstance.get(`/company/get-companies?q=${search}`);
      const data = await res.data.companies;
      setCompany(data);
      console.log(data, "companydatas");
    };
    FetchData();
  }, [search]);

  const jumpToDetail = (_id: string) => {
    router.push(`/Company/${_id}`);
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search, "s");
  };

  return (
    <div className=" overflow-y-scroll w-full flex flex-col gap-3 pt-13 from-black to-gray-800 bg-gradient-to-b h-full">
      <div className="flex h-fit w-[35%] fixed z-50 px-4 py-2 gap-2 backdrop-blur-3xl">
        <Input className="bg-white focus-visible:ring-0 " />
        <Input
          onChange={handleInputValue}
          className="bg-white focus-visible:ring-0 "
          placeholder="search by name, address, location"
        />
      </div>
      <div className=" flex flex-col pt-15 gap-2 px-6">
        {company.map((values: Company, index) => {
          return (
            <CompanyDetailCard
              onclick={() => jumpToDetail(values._id)}
              key={index}
              company={values}
            />
          );
        })}
      </div>
    </div>
  );
};
