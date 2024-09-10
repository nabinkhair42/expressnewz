"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Post {
  title: string;
  date: string;
  author: string;
  categories: string[];
  image: File | null;
  content: string;
}

const NewsCMS = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<Post>({
    title: "",
    date: "",
    author: "",
    categories: [],
    image: null,
    content: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/submit-news");
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch posts. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setNewPost((prev) => ({ ...prev, categories: [value] }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setNewPost((prev) => ({ ...prev, image: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    for (const [key, value] of Object.entries(newPost)) {
      if (key === "categories") {
        formData.append(key, JSON.stringify(value));
      } else if (value !== null) {
        formData.append(key, value);
      }
    }

    try {
      const response = await fetch("/api/submit-news", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to create post");
      const data = await response.json();
      toast({
        title: "Success",
        description: `Post created successfully! Post number: ${data.postNumber}`,
      });
      fetchPosts();
      setNewPost({
        title: "",
        date: "",
        author: "",
        categories: [],
        image: null,
        content: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">News CMS</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              placeholder="Title"
              value={newPost.title}
              onChange={handleInputChange}
              required
            />
            <Input
              name="date"
              type="date"
              value={newPost.date}
              onChange={handleInputChange}
              required
            />
            <Input
              name="author"
              placeholder="Author"
              value={newPost.author}
              onChange={handleInputChange}
              required
            />
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="politics">Politics</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
            <Textarea
              name="content"
              placeholder="Content"
              value={newPost.content}
              onChange={handleInputChange}
              required
            />
            <Button type="submit">Create Post</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsCMS;
