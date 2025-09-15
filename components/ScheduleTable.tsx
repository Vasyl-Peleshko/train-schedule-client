import React from 'react';
import { Schedule } from '../types/schedule';

interface ScheduleTableProps {
  schedules: Schedule[];
  onEdit?: (schedule: Schedule) => void;
  onDelete?: (id: number) => void;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedules, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Train #</th>
            <th className="py-2 px-4 text-left">Origin</th>
            <th className="py-2 px-4 text-left">Destination</th>
            <th className="py-2 px-4 text-left">Departure</th>
            <th className="py-2 px-4 text-left">Arrival</th>
            <th className="py-2 px-4 text-left">Status</th>
            {onEdit && <th className="py-2 px-4 text-left">Edit</th>}
            {onDelete && <th className="py-2 px-4 text-left">Delete</th>}
          </tr>
        </thead>
        <tbody>
          {schedules.map(s => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{s.train_number}</td>
              <td className="py-2 px-4">{s.origin}</td>
              <td className="py-2 px-4">{s.destination}</td>
              <td className="py-2 px-4">{new Date(s.departure_time).toLocaleString()}</td>
              <td className="py-2 px-4">{new Date(s.arrival_time).toLocaleString()}</td>
              <td className="py-2 px-4">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  s.status === 'on-time' 
                    ? 'bg-green-100 text-green-800' 
                    : s.status === 'delayed' 
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {s.status}
                </span>
              </td>
              {onEdit && (
                <td className="py-2 px-4">
                  <button
                    onClick={() => onEdit(s)}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    Edit
                  </button>
                </td>
              )}
              {onDelete && (
                <td className="py-2 px-4">
                  <button
                    onClick={() => onDelete(s.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200 font-medium"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
