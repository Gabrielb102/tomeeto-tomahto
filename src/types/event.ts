export type TimeOption = {
  dayOfWeek?: number; // 0-6 for Sunday-Saturday
  date?: string; // ISO date string
  startTime: string;
  endTime: string;
  timezone: string;
};

export type CreateEventInput = {
  title: string;
  description: string;
  timeOptions: TimeOption[];
}; 