'use client';

import { useState } from 'react';
import { MeetingForm } from '@/components/MeetingForm';
import { AvailabilityCalendar } from '@/components/AvailabilityCalendar';

export default function Home() {
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  return (
    <main className="min-h-screen h-screen w-full flex">
      <div className="w-[420px] h-full border-r border-[#e5e7eb] bg-white">
        <MeetingForm onDatesChange={setSelectedDates} />
      </div>
      <div className="flex-1 h-full">
        <AvailabilityCalendar selectedDates={selectedDates} />
      </div>
    </main>
  );
}
