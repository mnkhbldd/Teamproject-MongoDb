"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Eye, Plus, Save, Trash2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Image from "next/image";

interface CompanyData {
  logo: string;
  name: string;
  images: string[];
  address: string;
  website: string;
  facebook: string;
  instagram: string;
  phone: string;
  about: string;
  pricing: string;
  businessHours: {
    openTime: string;
    closeTime: string;
    closed: boolean;
  };
}

const initialData: CompanyData = {
  logo: "/placeholder.svg?height=64&width=64",
  name: "Company Name",
  images: [
    "/placeholder.svg?height=256&width=400",
    "/placeholder.svg?height=256&width=400",
  ],
  address: "han Uul Dvvreg",
  website: "website.com",
  facebook: "facebook",
  instagram: "instagram",
  phone: "(+976) 99999999",
  about:
    "At Elevate Bootcamp we firmly believe in the power of our unique group training environment. Our aim is elevate your fitness level as well as your love of exercise. For us it's simple...Find an activity you want to do, a workout that challenges you, a coach that motivates you and a community that inspires & supports you.",
  pricing: "Starting from $50/session",
  businessHours: {
    openTime: "09:00",
    closeTime: "18:00",
    closed: false,
  },
};
export const AdminSettings = () => {
  const [data, setData] = useState<CompanyData>(initialData);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...data.images];
    newImages[index] = value;
    setData((prev) => ({ ...prev, images: newImages }));
  };

  const handleBusinessHoursChange = (
    field: keyof CompanyData["businessHours"],
    value: string | boolean
  ) => {
    setData((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [field]: value,
      },
    }));
  };

  const addImage = () => {
    setData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImage = (index: number) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    console.log("Saving data:", data);
    alert("Data saved successfully!");
  };

  const formatBusinessHours = () => {
    if (data.businessHours.closed) {
      return "Closed";
    }
    return ` ${data.businessHours.openTime} - ${data.businessHours.closeTime}`;
  };

  if (showPreview) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Preview</h1>
          <Button onClick={() => setShowPreview(false)}>Back to Edit</Button>
        </div>

        {/* Simple Preview */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={data.logo || "/placeholder.svg"}
                alt="Logo"
                className="w-16 h-16 rounded-full object-cover"
                width={64}
                height={64}
              />
              <h2 className="text-3xl font-bold">{data.name}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Images</h3>
                <div className="grid grid-cols-2 gap-2">
                  {data.images.map((img, i) => (
                    <Image
                      key={i}
                      src={img || "/placeholder.svg"}
                      alt={`Image ${i + 1}`}
                      className="w-full h-24 object-cover rounded"
                      width={400}
                      height={256}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Contact Info</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Address:</strong> {data.address}
                  </p>
                  <p>
                    <strong>Website:</strong> {data.website}
                  </p>
                  <p>
                    <strong>Facebook:</strong> {data.facebook}
                  </p>
                  <p>
                    <strong>Instagram:</strong> {data.instagram}
                  </p>
                  <p>
                    <strong>Phone:</strong> {data.phone}
                  </p>
                  <p>
                    <strong>Pricing:</strong> {data.pricing}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-sm text-gray-600">{data.about}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p className="text-sm">{formatBusinessHours()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Company Profile</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="logo">Logo</Label>
              <div className="flex items-center gap-4">
                {data.logo && (
                  <Image
                    src={data.logo || "/placeholder.svg"}
                    alt="Logo preview"
                    className="w-16 h-16 rounded-full object-cover border"
                    width={64}
                    height={64}
                  />
                )}
                <div className="flex-1">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const result = event.target?.result as string;
                          handleInputChange("logo", result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter company name"
              />
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Images
              <Button size="sm" onClick={addImage}>
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.images.map((image, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border rounded-lg"
              >
                {image && (
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded border"
                    width={80}
                    height={80}
                  />
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const result = event.target?.result as string;
                          handleImageChange(index, result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="cursor-pointer"
                  />
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeImage(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={data.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter address"
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={data.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="Enter website"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={data.facebook}
                  onChange={(e) =>
                    handleInputChange("facebook", e.target.value)
                  }
                  placeholder="Enter Facebook handle"
                />
              </div>

              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={data.instagram}
                  onChange={(e) =>
                    handleInputChange("instagram", e.target.value)
                  }
                  placeholder="Enter Instagram handle"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <Label htmlFor="pricing">Pricing</Label>
              <Input
                id="pricing"
                value={data.pricing}
                onChange={(e) => handleInputChange("pricing", e.target.value)}
                placeholder="e.g., Starting from $50/session, $100/hour, Free consultation"
              />
            </div>

            <div>
              <Label>Business Hours</Label>
              <div className="space-y-3 mt-2">
                {!data.businessHours.closed && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="openTime"
                        className="text-sm text-gray-600"
                      >
                        Opening Time
                      </Label>
                      <Input
                        id="openTime"
                        type="time"
                        value={data.businessHours.openTime}
                        onChange={(e) =>
                          handleBusinessHoursChange("openTime", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="closeTime"
                        className="text-sm text-gray-600"
                      >
                        Closing Time
                      </Label>
                      <Input
                        id="closeTime"
                        type="time"
                        value={data.businessHours.closeTime}
                        onChange={(e) =>
                          handleBusinessHoursChange("closeTime", e.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500">
                  {data.businessHours.closed
                    ? "Business is closed all week"
                    : `Same hours apply to all days: ${data.businessHours.openTime} - ${data.businessHours.closeTime}`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={data.about}
              onChange={(e) => handleInputChange("about", e.target.value)}
              placeholder="Enter company description"
              rows={6}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
