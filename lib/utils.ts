import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

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
    
    // Show a toast notification for the error
    toast.error("Invalid Partner ID or Name");

    return false;
  }
};