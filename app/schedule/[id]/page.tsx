'use client';

import Layout from '@/components/Layout';
import { getScheduleById } from '@/services/schedule.service';
import { Schedule } from '@/types/schedule';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SchedulePage = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [schedule, setSchedule] = useState<Schedule | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchSchedule = async () => {
      const data = await getScheduleById(Number(id));
      setSchedule(data);
    };
    fetchSchedule();
  }, [id]);

  if (!schedule) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Train {schedule.train_number}</h1>
        <p><strong>Origin:</strong> {schedule.origin}</p>
        <p><strong>Destination:</strong> {schedule.destination}</p>
        <p><strong>Departure:</strong> {new Date(schedule.departure_time).toLocaleString()}</p>
        <p><strong>Arrival:</strong> {new Date(schedule.arrival_time).toLocaleString()}</p>
        <p><strong>Status:</strong> {schedule.status}</p>
      </div>
    </Layout>
  );
};

export default SchedulePage;
