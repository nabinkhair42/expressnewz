"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { Chip } from "@nextui-org/react";

interface Post {
  title: string;
  date: string; // Nepali date format
  author: string;
  categories: string[];
  image: File | null;
  content: string;
  path: string;
}

const predefinedCategories = [
  "politics",
  "technology",
  "sports",
  "agriculture",
  "business",
  "lifestyle",
  "world",
];

const NewsCMS = () => {
  const [newPost, setNewPost] = useState<Post>({
    title: "",
    date: "",
    author: "",
    categories: [],
    image: null,
    content: "",
    path: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [allCategories, setAllCategories] = useState(predefinedCategories);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setNewPost((prev) => ({
      ...prev,
      categories: prev.categories.includes(value)
        ? prev.categories
        : [...prev.categories, value],
    }));
  };

  const handleRemoveCategory = (category: string) => {
    setNewPost((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat !== category),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setNewPost((prev) => ({ ...prev, image: files[0] }));
    }
  };

  const handleAddCustomCategory = () => {
    if (customCategory && !allCategories.includes(customCategory)) {
      setAllCategories((prev) => [...prev, customCategory]);
      setNewPost((prev) => ({
        ...prev,
        categories: [...prev.categories, customCategory],
      }));
      setCustomCategory("");
    }
  };

  const generatePathFromTitle = (title: string) => {
    return title
      .split(" ")
      .slice(0, 10)
      .join("-")
      .replace(/[^\u0900-\u097F\w-]+/g, "")
      .toLowerCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const path = generatePathFromTitle(newPost.title);

    const formData = new FormData();
    for (const [key, value] of Object.entries(newPost)) {
      if (key === "categories") {
        formData.append(key, JSON.stringify(value));
      } else if (value !== null && key !== "path") {
        formData.append(key, value);
      }
    }

    formData.append("path", `/news/${path}`);

    try {
      const response = await fetch("/api/submit-news", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to create post");
      toast.success("Post created successfully");

      setNewPost({
        title: "",
        date: "",
        author: "",
        categories: [],
        image: null,
        content: "",
        path: "",
      });
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Card className="p-6 bg-inherit shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-center mb-4">
            समाचार पोस्ट सिर्जना गर्नुहोस्
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              placeholder="शीर्षक"
              value={newPost.title}
              onChange={handleInputChange}
              required
            />
            <div>
              <label htmlFor="date">Date</label>
              <Input
                type="date"
                name="date"
                value={newPost.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <Input
              name="author"
              placeholder="पत्रकार"
              value={newPost.author}
              onChange={handleInputChange}
              required
            />
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2">
              {newPost.categories.map((category) => (
                <Chip key={category}>
                  {category}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-4 w-4 p-0"
                    onClick={() => handleRemoveCategory(category)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Chip>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Add custom category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
              <Button
                type="button"
                onClick={handleAddCustomCategory}
                disabled={!customCategory}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="p-2"
            />
            <Textarea
              name="content"
              placeholder="समाचार विवरण"
              value={newPost.content}
              onChange={handleInputChange}
              required
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Post...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsCMS;
