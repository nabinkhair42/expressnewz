"use client";
import React from "react";
import { useRouter } from "next/navigation";

export const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuthComponent: React.FC<any> = (props) => {
    const router = useRouter();
    const adminAuth =
      typeof window !== "undefined" ? localStorage.getItem("admin-auth") : null;

    if (adminAuth !== "true") {
      router.push("/admin/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthComponent;
};
