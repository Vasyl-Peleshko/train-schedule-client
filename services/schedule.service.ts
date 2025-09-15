import { api } from './api';
import { Schedule } from '../types/schedule';

interface GetSchedulesParams {
  search?: string;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}

export const getSchedules = async (params?: GetSchedulesParams): Promise<Schedule[]> => {
  const { data } = await api.get('/schedule', { params });
  return data;
};

export const getScheduleById = async (id: number): Promise<Schedule> => {
  const { data } = await api.get(`/schedule/${id}`);
  return data;
};

export const createSchedule = async (schedule: Partial<Schedule>): Promise<Schedule> => {
  const { data } = await api.post('/schedule', schedule);
  return data;
};

export const updateSchedule = async (id: number, schedule: Partial<Schedule>): Promise<Schedule> => {
  const { data } = await api.put(`/schedule/${id}`, schedule);
  return data;
};

export const deleteSchedule = async (id: number): Promise<void> => {
  await api.delete(`/schedule/${id}`);
};
