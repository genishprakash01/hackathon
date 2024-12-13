import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { toast } from "react-toastify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateLogin = async (name: string, partnerId: string) => {
  try {
    const response = await axios.post(
      "https://api.shopflo.co/flo-settlement/api/v1/partners/login",
      {
        "partner_id": partnerId,
        "partner_name": name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-shopflo-version": "latest",
        },
      }
    );

    if (!response.data.data.is_valid) {
      throw new Error("Invalid Partner ID or Name");
    }

    localStorage.setItem("partnerName", name);
    localStorage.setItem("partnerId", partnerId);

    toast.success("Login Successful");
    return response.data.data.is_valid;

  } catch (error) {
    console.error("Error validating token:", error);
    localStorage.setItem("partnerName", name);
    localStorage.setItem("partnerId", partnerId);
    return false;
  }
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeAllLetters = (string: string) => {
  return string.toUpperCase();
};

export function getLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

export function setLocalStorage(key: string, value: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

export function removeLocalStorage(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}
