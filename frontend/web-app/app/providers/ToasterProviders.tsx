"use client";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToasterProviders() {
  return (
    <div>
      <Toaster position="bottom-right" />
    </div>
  );
}
