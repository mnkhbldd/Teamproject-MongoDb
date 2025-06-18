"use client";
import { CompanyDetailCard } from "@/components/CompanyDetailCard";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

import { useCategory } from "@/app/context/CategoryContext";
import { CategoryFilter } from "@/components/FilterByCategories";
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
  const { categories } = useCategory();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const params = new URLSearchParams();

        if (search) {
          params.append("q", search);
        }

        selectedCategories.forEach((id) => {
          params.append("categories", id); // will send ?categories=id1&categories=id2
        });

        const res = await axiosInstance.get(
          `/company/get-companies?${params.toString()}`
        );
        setCompany(res.data.companies || []);
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };

    fetchCompanies();
  }, [search, selectedCategories]);
  const jumpToDetail = (_id: string) => {
    router.push(`/Company/${_id}`);
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className=" overflow-y-scroll w-full flex flex-col gap-3 pt-13 from-black to-gray-800 bg-gradient-to-b h-full">
      <div className="flex h-fit w-[35%] fixed z-50 px-4 py-2 gap-2">
        <CategoryFilter
          categories={categories}
          value={selectedCategories}
          onChange={setSelectedCategories}
        />
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
