'use client';

import { Schedule } from '@/types/schedule';
import React, { useState, useEffect } from 'react';

interface EditScheduleModalProps {
  schedule: Schedule | null;
  onClose: () => void;
  onSave: (formData: Partial<Schedule>) => void;
}

const EditScheduleModal: React.FC<EditScheduleModalProps> = ({ schedule, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Schedule>>({});

  useEffect(() => {
    if (schedule) setFormData(schedule);
  }, [schedule]);

  if (!schedule) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const formatDateTime = (dateString: string | undefined) => {
		if (!dateString) return '';
		const date = new Date(dateString);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		return `${year}-${month}-${day}T${hours}:${minutes}`;
	};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Schedule</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="train_number"
            value={formData.train_number || ''}
            onChange={handleChange}
            placeholder="Train Number"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="origin"
            value={formData.origin || ''}
            onChange={handleChange}
            placeholder="Origin"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="destination"
            value={formData.destination || ''}
            onChange={handleChange}
            placeholder="Destination"
            className="w-full p-2 border rounded"
          />
          <input
            type="datetime-local"
            name="departure_time"
            value={formatDateTime(formData.departure_time)}
            onChange={handleChange}
            placeholder="Departure Time"
            className="w-full p-2 border rounded"
          />
          <input
            type="datetime-local"
            name="arrival_time"
						value={formatDateTime(formData.arrival_time)}            
						onChange={handleChange}
            placeholder="Arrival Time"
            className="w-full p-2 border rounded"
          />
          <select
            name="status"
            value={formData.status || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Status</option>
            <option value="on_time">On Time</option>
            <option value="delayed">Delayed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditScheduleModal;
