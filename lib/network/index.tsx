import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import store from '@/lib/store'; // Import the Redux store
import { RootState } from '@/lib/store';


const BASE_URL = 'https://www.linkfit.app';

class NetworkService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = BASE_URL) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });    
    // this.setupInterceptors();
  }

  // private setupInterceptors() {
  //   // Request Interceptor: Add JWT and Custom Header dynamically
  //   this.axiosInstance.interceptors.request.use(
  //     async (config: InternalAxiosRequestConfig) => {
  //       const token = await this.getAuthToken();
  //       const customHeader = await this.getCustomHeader('customHeader'); // Get Custom Header

  //       if (token) {
  //         config.headers['Authorization'] = `Bearer ${token}`;
  //       }

  //       if (customHeader) {
  //         config.headers['X-CUSTOM-HEADER'] = customHeader;
  //       }

  //       return config;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );

  //   // Response Interceptor: Handle errors globally
  //   this.axiosInstance.interceptors.response.use(
  //     (response: AxiosResponse) => response,
  //     (error) => {
  //       if (error.response?.status === 401) {
  //         console.error('Unauthorized. Redirect to login or handle token refresh.');
  //         // Optionally, clear stored tokens or refresh
  //       }
  //       return Promise.reject(error);
  //     }
  //   );
  // }

  // SecureStore management methods
  // private async getAuthToken(): Promise<string | null> {
  //   try {
  //     return new Promise((resolve) => {});
  //   } catch (error) {
  //     console.error('Error fetching auth token:', error);
  //     return null;
  //   }
  // }

  // private async getCustomHeader(headerName: string): Promise<string | null> {
  //   try {
  //     return new Promise((resolve) => {});
  //   } catch (error) {
  //     console.error(`Error fetching custom header ${headerName}:`, error);
  //     return null;
  //   }
  // }

  async get(endpoint: string, params: Record<string, unknown> = {}): Promise<AxiosResponse> {
    const state: RootState = store.getState(); // Get the current state from the Redux store
    const user = state.user; // Get the user object from the state
    console.log(user);
    
    if (endpoint !== '/meta') {
      params = { ...params, user: user.name };
    }
    if (params.user || endpoint === '/meta') {
      try {
        const response = await this.axiosInstance.get(endpoint, { params });
        return response.data;
      } catch (error) {
        console.error('GET request failed:', error);
        // throw error;
      }

    }
  }

  // async post(endpoint: string, data: Record<string, unknown>, params: Record<string, unknown> = {}): Promise<AxiosResponse> {
  //   try {
  //     const response = await this.axiosInstance.post(endpoint, data, { params });
  //     return response.data;
  //   } catch (error) {
  //     console.error('POST request failed:', error);
  //     throw error;
  //   }
  // }

  // async put(endpoint: string, data: Record<string, unknown>, params: Record<string, unknown> = {}): Promise<AxiosResponse> {
  //   try {
  //     const response = await this.axiosInstance.put(endpoint, data, { params });
  //     return response.data;
  //   } catch (error) {
  //     console.error('PUT request failed:', error);
  //     throw error;
  //   }
  // }

  // async delete(endpoint: string, params: Record<string, unknown> = {}): Promise<AxiosResponse> {
  //   try {
  //     const response = await this.axiosInstance.delete(endpoint, { params });
  //     return response.data;
  //   } catch (error) {
  //     console.error('DELETE request failed:', error);
  //     throw error;
  //   }
  // }

  // async patch(endpoint: string, data: Record<string, unknown>, params: Record<string, unknown> = {}): Promise<AxiosResponse> {
  //   try {
  //     const response = await this.axiosInstance.patch(endpoint, data, { params });
  //     return response.data;
  //   } catch (error) {
  //     console.error('PATCH request failed:', error);
  //     throw error;
  //   }
  // }
}

const networkService = new NetworkService();
// export const { get, post, put, delete: del, patch } = networkService;
export const { get } = networkService;
export default networkService;
