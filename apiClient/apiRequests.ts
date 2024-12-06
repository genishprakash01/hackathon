import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast';

// API URLs
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const API_PUBLIC_URL = process.env.NEXT_PUBLIC_API_PUBLIC_URL;
const API_AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL;

// Axios instance with interceptors
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Retry interceptor
const setupRetryInterceptor = (maxRetries: number = 3) => {
  let retryCount = 0;
  
  axiosInstance.interceptors.response.use(
    (response:any) => response,
    async (error: AxiosError) => {
      const config = error.config;
      
      if (!config || retryCount >= maxRetries) {
        return Promise.reject(error);
      }
      
      retryCount++;
      return axiosInstance(config);
    }
  );
};

// Error handler with better typing
const handleError = (error: unknown) => {
  const message = error instanceof AxiosError 
    ? error.response?.data?.message || error.message
    : 'An unexpected error occurred';
    
  toast({
    title: 'Error',
    description: message,
    variant: 'destructive',
  });
  throw error;
};

// Generic request function using axios
async function request<T>(
  endpoint: string,
  options: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    headers?: Record<string, string>;
    baseURL?: string;
  }
): Promise<T> {
  try {
    const response = await axiosInstance({
      url: endpoint,
      method: options.method,
      data: options.data,
      baseURL: options.baseURL || API_BASE_URL,
      headers: options.headers,
    });

    return response.data as T;
  } catch (error) {
    return handleError(error);
  }
}

// Enhanced API methods
export const api = {
  get: <T>(endpoint: string, headers?: Record<string, string>) =>
    request<T>(endpoint, {
      method: 'GET',
      headers,
    }),

  post: <T>(endpoint: string, data: any, headers?: Record<string, string>) =>
    request<T>(endpoint, {
      method: 'POST',
      data,
      headers,
    }),

  put: <T>(endpoint: string, data: any, headers?: Record<string, string>) =>
    request<T>(endpoint, {
      method: 'PUT',
      data,
      headers,
    }),

  delete: <T>(endpoint: string, data?: any, headers?: Record<string, string>) =>
    request<T>(endpoint, {
      method: 'DELETE',
      data,
      headers,
    }),
};

// Public API methods
export const publicApi = {
  get: <T>(endpoint: string) =>
    request<T>(endpoint, {
      method: 'GET',
      baseURL: API_PUBLIC_URL,
    }),

  post: <T>(endpoint: string, data: any) =>
    request<T>(endpoint, {
      method: 'POST',
      data,
      baseURL: API_PUBLIC_URL,
    }),
};

// Auth API methods
export const authApi = {
  post: <T>(endpoint: string, data: any) =>
    request<T>(endpoint, {
      method: 'POST',
      data,
      baseURL: API_AUTH_URL,
    }),
};

// Initialize retry interceptor
setupRetryInterceptor();

// Type definitions for API responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Example endpoint interfaces
export interface Partner {
  id: string;
  name: string;
  email: string;
}

export interface Merchant {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  revenue: number;
}

// Partner-related API calls
export const partnerApi = {
  login: (partnerId: string) =>
    api.post<ApiResponse<Partner>>('/auth/login', { partnerId }),
    
  validatePartner: (partnerId: string) =>
    api.get<ApiResponse<boolean>>(`/partners/validate/${partnerId}`),
};

// Merchant-related API calls
export const merchantApi = {
  getAll: () => 
    api.get<ApiResponse<Merchant[]>>('/merchants'),
    
  create: (merchantData: Omit<Merchant, 'id'>) =>
    api.post<ApiResponse<Merchant>>('/merchants', merchantData),
    
  update: (id: string, merchantData: Partial<Merchant>) =>
    api.put<ApiResponse<Merchant>>(`/merchants/${id}`, merchantData),
    
  delete: (id: string) =>
    api.delete<ApiResponse<void>>(`/merchants/${id}`),
};