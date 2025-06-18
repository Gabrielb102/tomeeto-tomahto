'use client';

import { Button } from '@/components/ui/button';

const times = [
  '12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '11:59 PM'
];

const defaultDays = Array.from({ length: 31 }, (_, i) => `JUL ${i + 1}`);

export function AvailabilityCalendar({ selectedDates }: { selectedDates?: number[] }) {
  const days = selectedDates && selectedDates.length > 0
    ? selectedDates.map(d => `JUL ${d}`)
    : defaultDays;

  if (!selectedDates || selectedDates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-[#4d6137]">
        <div className="rounded-full bg-[#f6e6c7] flex items-center justify-center w-48 h-48 mb-6">
          <img src="/logo.png" alt="logo" className="h-24 w-auto" />
        </div>
        <div className="text-white text-center text-sm">Select dates to see preview</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-[#4d6137] p-8 pt-0">
      <div className="flex justify-center mb-4">
        <div className="bg-[#e5722a] text-white px-8 py-2 rounded-b-sm font-semibold text-lg">Preview</div>
      </div>
      <div className="flex flex-col mt-32 justify-start items-center overflow-x-auto h-[600px]">
        <table className="min-w-[700px] w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="w-20"></th>
              {days.map(day => (
                <th key={day} className="text-center text-xs font-semibold text-white py-2 px-2">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map(time => (
              <tr key={time}>
                <td className="text-xs text-white pr-2 py-1 text-right align-middle">{time}</td>
                {days.map(day => (
                  <td key={day} className="flex-none bg-white/80 border border-[#b6c2a1] h-12 w-12 hover:bg-orange-100 transition-colors"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 