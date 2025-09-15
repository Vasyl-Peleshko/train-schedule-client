'use client';

import { useEffect, useState } from 'react';
import ScheduleTable from '../components/ScheduleTable';
import ScheduleForm from '../components/ScheduleForm';
import { Schedule } from '../types/schedule';
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from '../services/schedule.service';
import { getUser } from '../services/auth.service';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import EditScheduleModal from '@/components/EditScheduleModal';

const HomePage = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('departure_time');
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getUser();
        setLoading(false);
      } catch (err) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const fetchSchedules = async () => {
    const data = await getSchedules({ search, sortBy, order });
    setSchedules(data);
  };

  useEffect(() => {
    if (!loading) fetchSchedules();
  }, [search, sortBy, order, loading]);

  const handleCreate = async (formData: Partial<Schedule>) => {
    await createSchedule(formData);
    fetchSchedules();
    
  };

  const handleSaveEdit = async (formData: Partial<Schedule>) => {
    if (editingSchedule) {
      await updateSchedule(editingSchedule.id, formData);
      setEditingSchedule(null);
      fetchSchedules();
    }
  };

  const handleDelete = async (id: number) => {
    await deleteSchedule(id);
    fetchSchedules();
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <Layout>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded flex-grow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="departure_time">Departure</option>
          <option value="arrival_time">Arrival</option>
          <option value="train_number">Train #</option>
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as 'ASC' | 'DESC')}
          className="p-2 border rounded"
        >
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>

      <ScheduleForm onSubmit={handleCreate} />

      <div className="mt-6">
        <ScheduleTable
          schedules={schedules}
          onEdit={setEditingSchedule}
          onDelete={handleDelete}
        />
      </div>

      {editingSchedule && (
        <EditScheduleModal
          schedule={editingSchedule}
          onClose={() => setEditingSchedule(null)}
          onSave={handleSaveEdit}
        />
      )}
    </Layout>
  );
};

export default HomePage;