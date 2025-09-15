import React, { useState } from 'react';
import { Schedule } from '../types/schedule';

interface ScheduleFormProps {
  initialData?: Partial<Schedule>;
  onSubmit: (data: Partial<Schedule>) => void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    train_number: initialData.train_number || '',
    origin: initialData.origin || '',
    destination: initialData.destination || '',
    departure_time: initialData.departure_time || '',
    arrival_time: initialData.arrival_time || '',
    status: initialData.status || 'on-time',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      train_number: '',
      origin: '',
      destination: '',
      departure_time: '',
      arrival_time: '',
      status: '',
    });
  };
  const now = new Date().toISOString().slice(0,16);

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
      <input
        type="text"
        name="train_number"
        placeholder="Train Number (e.g. 12345)"
        value={form.train_number}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
        pattern="^\d{3,5}$"
        title="Train number must be 3-5 digits"
      />
      <input
        type="text"
        name="origin"
        placeholder="Origin"
        value={form.origin}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
        pattern="^[A-Za-z\s]{2,15}$"
        title="Origin must contain only letters and be at least 2 characters long, max 15"
      />
      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={form.destination}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
        pattern="^[A-Za-z\s]{2,15}$"
        title="Destination must contain only letters and be at least 2 characters long, max 15"
      />
      <input
        type="datetime-local"
        name="departure_time"
        placeholder="Departure Time"
        value={form.departure_time}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
        min={now}
      />
      <input
        type="datetime-local"
        name="arrival_time"
        placeholder="Arrival Time"
        value={form.arrival_time}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
        min={form.departure_time || now}
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="on-time">On-time</option>
        <option value="delayed">Delayed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Save
      </button>
    </form>
  );
};

export default ScheduleForm;
