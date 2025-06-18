'use client';

import { useState } from 'react';

// Mock data for demonstration
const event = {
  id: 'abc123',
  name: 'Team Sync',
  description: 'Weekly team sync-up',
  dates: [21, 22, 23],
};
const times = [
  '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '11:59 PM',
];

export default function ParticipantPage() {
  // 2D array: times x dates
  const [selected, setSelected] = useState(
    Array(times.length).fill(null).map(() => Array(event.dates.length).fill(false))
  );
  const [dragging, setDragging] = useState(false);
  const [dragValue, setDragValue] = useState(true);

  function handleCellMouseDown(row: number, col: number) {
    setDragging(true);
    setDragValue(!selected[row][col]);
    toggleCell(row, col, !selected[row][col]);
  }
  function handleCellMouseEnter(row: number, col: number) {
    if (dragging) toggleCell(row, col, dragValue);
  }
  function handleMouseUp() {
    setDragging(false);
  }
  function toggleCell(row: number, col: number, value: boolean) {
    setSelected(prev => {
      const next = prev.map(arr => [...arr]);
      next[row][col] = value;
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: send selected availability to backend
    alert('Availability submitted!');
  }

  return (
    <div className="min-h-screen bg-[#4d6137] flex flex-col items-center p-8" onMouseUp={handleMouseUp}>
      <div className="bg-white rounded shadow p-6 w-full max-w-2xl mb-8">
        <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
        <p className="mb-2 text-gray-700">{event.description}</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 w-full max-w-4xl">
        <div className="mb-4 text-lg font-semibold text-[#4d6137]">Select Your Availability</div>
        <div className="h-[500px] overflow-x-auto">
          <table className="min-w-[400px] w-full border-separate border-spacing-0 select-none">
            <thead>
              <tr>
                <th className="w-20"></th>
                {event.dates.map(date => (
                  <th key={date} className="text-center text-xs font-semibold text-[#4d6137] py-2 px-2">JUL {date}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time, rowIdx) => (
                <tr key={time}>
                  <td className="text-xs text-[#4d6137] pr-2 py-1 text-right align-middle font-semibold">{time}</td>
                  {event.dates.map((date, colIdx) => (
                    <td
                      key={date}
                      className={`border border-[#b6c2a1] h-8 w-16 text-center align-middle cursor-pointer transition-colors ${selected[rowIdx][colIdx] ? 'bg-[#e5722a] text-white' : 'bg-white hover:bg-orange-100'}`}
                      onMouseDown={() => handleCellMouseDown(rowIdx, colIdx)}
                      onMouseEnter={() => handleCellMouseEnter(rowIdx, colIdx)}
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="submit" className="mt-6 bg-[#e5722a] text-white px-6 py-2 rounded hover:bg-[#d45e13]">Submit Availability</button>
      </form>
    </div>
  );
} 