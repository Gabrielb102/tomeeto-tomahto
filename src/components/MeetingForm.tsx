"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

const DAYS_IN_MONTH = 31;
const MONTH_LABEL = "July 2024";
const FIRST_DAY_OFFSET = 1; // 0=Sun, 1=Mon, ...

export function MeetingForm({
  onDatesChange,
}: {
  onDatesChange?: (dates: number[]) => void;
}) {
  const [tab, setTab] = useState("dates");
  const [meetingName, setMeetingName] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [meetingPassword, setMeetingPassword] = useState("");
  const [selectedDates, setSelectedDates] = useState<number[]>([]);

  // Use useEffect to notify parent of changes, avoiding setState during render
  useEffect(() => {
    if (onDatesChange) {
      onDatesChange(selectedDates);
    }
  }, [selectedDates, onDatesChange]);

  const handleDateClick = (date: number) => {
    setSelectedDates((prev) => {
      const exists = prev.includes(date);
      return exists ? prev.filter((d) => d !== date) : [...prev, date];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: meetingName,
        description: meetingDescription || "No description",
        password: meetingPassword || undefined,
        timeOptions: [],
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col h-full p-8 bg-white min-w-[350px] max-w-[400px] w-full">
      <div className="mb-8 flex items-end gap-2">
        <img src="/logo.png" alt="logo" className="h-10 w-auto" />
        <span className="font-bold text-xl text-[#3d5c2c]">
          tomeeto tomahto
        </span>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
        <Input
          placeholder="Meeting Name"
          className="font-semibold text-[21px] h-12"
          value={meetingName}
          onChange={(e) => setMeetingName(e.target.value)}
        />
        <Input
          placeholder="Meeting Description"
          className=""
          value={meetingDescription}
          onChange={(e) => setMeetingDescription(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password (optional)"
          className=""
          value={meetingPassword}
          onChange={(e) => setMeetingPassword(e.target.value)}
        />
        <Input placeholder="Video Conference Link" className="" />
        <div>
          <div className="font-medium mb-2">Meeting Availability</div>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-2">
              <TabsTrigger value="dates">Specific Dates</TabsTrigger>
              <TabsTrigger value="days">Days of the Week</TabsTrigger>
            </TabsList>
            <TabsContent value="dates">
              <div className="border rounded p-2">
                <div className="text-sm mb-2">{MONTH_LABEL}</div>
                <div className="grid grid-cols-7 gap-1 text-xs text-center">
                  <div>Su</div>
                  <div>Mo</div>
                  <div>Tu</div>
                  <div>We</div>
                  <div>Th</div>
                  <div>Fr</div>
                  <div>Sa</div>
                  {Array.from({ length: FIRST_DAY_OFFSET }).map((_, i) => (
                    <div key={"empty-" + i}></div>
                  ))}
                  {Array.from({ length: DAYS_IN_MONTH }, (_, i) => {
                    const day = i + 1;
                    const selected = selectedDates.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        className={`rounded w-7 h-7 flex items-center justify-center border transition-colors ${selected ? "bg-[#e5722a] text-white border-[#e5722a]" : "hover:bg-orange-100 border-transparent"}`}
                        onClick={() => handleDateClick(day)}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="days">
              <div className="flex gap-2 flex-wrap">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <Button
                      key={day}
                      variant="outline"
                      className="px-3 py-1 text-xs"
                    >
                      {day}
                    </Button>
                  ),
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <Button className="bg-[#e5722a] hover:bg-[#d45e13] text-white mt-4 self-start font-bold">
          LET'S MEET!
        </Button>
      </form>
    </div>
  );
}
