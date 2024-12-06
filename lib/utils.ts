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
      "https://c5ef-116-66-190-58.ngrok-free.app/flo-settlement/api/v1/partners/login",
      {
        "partner_id": partnerId,
        "partner_name": name,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    if (!response.data.data.is_valid) {
      throw new Error("Invalid Partner ID or Name");
    }
    toast.success("Login Successful");
    return response.data.data.is_valid;

  } catch (error) {
    console.error("Error validating token:", error);
    
    // Show a toast notification for the error
    toast.error("Invalid Partner ID or Name");

    return false;
  }
};
