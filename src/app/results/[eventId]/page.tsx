'use client';

import Link from 'next/link';

// Mock data for demonstration
const event = {
  id: 'abc123',
  name: 'Team Sync',
  description: 'Weekly team sync-up',
  dates: [21, 22, 23],
};
const times = [
  '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'
];
const participants = [
  { name: 'Alice', availability: [[1,1,0],[1,0,0],[1,1,1],[0,0,1],[0,1,1],[1,1,1],[0,0,0],[1,1,0],[0,0,0],[1,1,1],[0,0,0],[1,1,1]] },
  { name: 'Bob', availability: [[1,0,0],[1,1,1],[0,0,1],[1,1,1],[0,1,1],[1,0,1],[0,0,0],[1,1,0],[0,0,0],[1,1,1],[0,0,0],[1,1,1]] },
  { name: 'Carol', availability: [[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[1,1,1],[0,0,0],[1,1,0],[0,0,0],[1,1,1],[0,0,0],[1,1,1]] },
];

function getHeatmap() {
  // Sum availabilities for each cell
  const heatmap: number[][] = times.map((_, row) => event.dates.map((_, col) => 0));
  for (const p of participants) {
    for (let row = 0; row < times.length; row++) {
      for (let col = 0; col < event.dates.length; col++) {
        heatmap[row][col] += p.availability[row][col];
      }
    }
  }
  return heatmap;
}

const heatmap = getHeatmap();
const max = Math.max(...heatmap.flat());

function getCellColor(val: number) {
  if (val === 0) return 'bg-white';
  if (val === max) return 'bg-[#e5722a] text-white';
  if (val >= Math.ceil(max/2)) return 'bg-orange-200';
  return 'bg-orange-50';
}

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-[#4d6137] flex flex-col items-center p-8">
      <div className="bg-white rounded shadow p-6 w-full max-w-2xl mb-8">
        <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
        <p className="mb-2 text-gray-700">{event.description}</p>
        <div className="mb-2 text-sm">Share this link: <span className="font-mono bg-gray-100 px-2 py-1 rounded">https://yourapp.com/results/{event.id}</span></div>
        <Link href={`/participant/${event.id}`} className="inline-block mt-2 bg-[#e5722a] text-white px-4 py-2 rounded hover:bg-[#d45e13]">Add your availability</Link>
      </div>
      <div className="bg-white rounded shadow p-6 w-full max-w-4xl">
        <div className="mb-4 text-lg font-semibold text-[#4d6137]">Availability Heatmap</div>
        <div className="overflow-x-auto">
          <table className="min-w-[400px] w-full border-separate border-spacing-0">
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
                    <td key={date} className={`border border-[#b6c2a1] h-8 w-16 text-center align-middle ${getCellColor(heatmap[rowIdx][colIdx])}`}>{heatmap[rowIdx][colIdx]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 