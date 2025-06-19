"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Filter,
  Map,
  List,
} from 'lucide-react';


import NavBar from '@/components/navbar';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { CategoryFilter } from '@/components/FilterByCategories';
import { useCategory } from '@/app/context/CategoryContext';
import ExploreMap from '../Explore/components/ExploreMap';


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

export default function ExplorePage() {
const { categories } = useCategory();
const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

console.log(companies,"aha");
 

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
  
      try {
        const params = new URLSearchParams();
  
        if (search) {
          params.append("q", search);
        }
  
        selectedCategories.forEach((id) => {
          params.append("categories", id);
        });
  
        const res = await axiosInstance.get(`/company/get-companies?${params.toString()}`);
  
        setCompanies(res.data.companies || []);
      } catch (error) {
        console.error("Error fetching companies", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCompanies();
  }, [search, selectedCategories]);
  

  const jumpToDetail = (_id: string) => {
    router.push(`/Company/${_id}`);
  };
  return (
    <div className="min-h-screen bg-[#0B0F1C]">
    <NavBar/>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-freely-gray mb-2">Explore Activities</h1>
          <p className="text-gray-600">Find the perfect sports activity near you</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search activities..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Category
                </label>
                 <CategoryFilter
                 categories={categories}
                value={selectedCategories}
                 onChange={setSelectedCategories}
                 />
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Min Rating: {minRating}★
                </label>
                <Slider
                  value={[minRating]}
                  onValueChange={(value) => setMinRating(value[0])}
                  max={5}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {companies.length} activities found
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('map')}
            >
              <Map className="h-4 w-4 mr-1" />
              Map
            </Button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'map' ? (
          <div className="h-96 rounded-lg overflow-hidden">
         <ExploreMap/>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse bg-[#1A1E2E]">
                  <div className="h-48rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))
            ) : companies.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              companies.map((company) => (
                <Card key={company._id} className="hover:shadow-lg duration-300 bg-[#1A1E2E] border-none">
                  <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                    {company.images?.[0] ? (
                      <img
                        src={company.images[0]}
                        alt={company.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-freely-blue/10 to-freely-emerald/10">
                        <MapPin className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-white">{company.name}</h3>
                      <Badge variant="secondary" className="capitalize">
                        {company.category}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {company.description}
                    </p>
                    
                    <div className="flex items-center space-x-1 mb-4">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 truncate">{company.location[0]?.address}</span>
                    </div>
                    
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}