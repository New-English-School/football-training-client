// baseService.ts
import { PaginationDto } from "@/types/pagination";
import apiClient from "../apiClient";
import { AxiosResponse } from "axios";

interface PaginatedResponse<T> {
  total: number;
  count: number;
  items: T[];
}

export class BaseService<T> {
  constructor(private readonly endpoint: string) {}

  async findAll(params?: Record<string, string | number>): Promise<T[]> {
    const res: AxiosResponse<T[] | PaginatedResponse<T>> = await apiClient.get(this.endpoint, { params });

    if (Array.isArray(res.data)) return res.data;
    if ("items" in res.data) return res.data.items;
    return [];
  }

  async findOne(id: number): Promise<T> {
    const res: AxiosResponse<T> = await apiClient.get(`${this.endpoint}/${id}`);
    return res.data;
  }

  async create<K extends Partial<T>>(data: K): Promise<T> {
    const res: AxiosResponse<T> = await apiClient.post(this.endpoint, data);
    return res.data;
  }

  async update<K extends Partial<T>>(id: number, data: K): Promise<T> {
    const res: AxiosResponse<T> = await apiClient.patch(`${this.endpoint}/${id}`, data);
    return res.data;
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const res: AxiosResponse<{ success: boolean }> = await apiClient.delete(`${this.endpoint}/${id}`);
    return res.data;
  }

  async findPaginated(params: PaginationDto): Promise<{ items: T[]; total: number }> {
    const res: AxiosResponse<PaginatedResponse<T>> = await apiClient.get(this.endpoint, { params });
    
    if (!res.data || !("items" in res.data) || typeof res.data.total !== "number") {
      return { items: [], total: 0 };
    }

    return { items: res.data.items, total: res.data.total };
  }
}
