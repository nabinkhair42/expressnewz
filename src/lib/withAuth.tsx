"use client";
import React from "react";
import { useRouter } from "next/navigation";

export const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();
    const adminAuth =
      typeof window !== "undefined" ? localStorage.getItem("admin-auth") : null;

    if (adminAuth !== "true") {
      router.push("/admin/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
