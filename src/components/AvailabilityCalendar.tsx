"use client";

import React from "react";

const times = [
  "12 AM",
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
  "11:59 PM",
];

// Helper function to group consecutive dates
function groupConsecutiveDates(dates: number[]): number[][] {
  if (dates.length === 0) return [];

  const sortedDates = [...dates].sort((a, b) => a - b);
  const groups: number[][] = [];
  let currentGroup: number[] = [sortedDates[0]];

  for (let i = 1; i < sortedDates.length; i++) {
    if (sortedDates[i] === sortedDates[i - 1] + 1) {
      // Consecutive date, add to current group
      currentGroup.push(sortedDates[i]);
    } else {
      // Gap found, start new group
      groups.push(currentGroup);
      currentGroup = [sortedDates[i]];
    }
  }
  groups.push(currentGroup);

  return groups;
}

export function AvailabilityCalendar({
  selectedDates,
}: {
  selectedDates?: number[];
}) {
  const sortedDates =
    selectedDates && selectedDates.length > 0
      ? [...selectedDates].sort((a, b) => a - b)
      : [];

  const dateGroups = groupConsecutiveDates(sortedDates);

  if (!selectedDates || selectedDates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-[#4d6137]">
        <div className="rounded-full bg-[#f6e6c7] flex items-center justify-center w-48 h-48 mb-6 overflow-hidden">
          <img src="/logo.png" alt="Tomeeto Tomahto Logo" className="w-full h-full object-contain p-8" />
        </div>
        <div className="text-white text-center text-sm">
          Select dates to see preview
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-[#4d6137] p-8 pt-0">
      <div className="flex justify-center mb-4">
        <div className="bg-[#e5722a] text-white px-8 py-2 rounded-b-sm font-semibold text-lg">
          Preview
        </div>
      </div>
      <div className="flex flex-col mt-32 justify-start items-center overflow-x-auto h-[600px]">
        <table className="min-w-[700px] w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="w-20"></th>
              {dateGroups.map((group, groupIndex) => (
                <React.Fragment key={`group-${groupIndex}`}>
                  {group.map((date, dateIndex) => {
                    const isFirst = dateIndex === 0;
                    const isLast = dateIndex === group.length - 1;
                    const isSingle = group.length === 1;

                    let roundingClass = "";
                    if (isSingle) {
                      roundingClass = "rounded-t-lg";
                    } else if (isFirst) {
                      roundingClass = "rounded-tl-lg";
                    } else if (isLast) {
                      roundingClass = "rounded-tr-lg";
                    }

                    return (
                      <th
                        key={date}
                        className={`text-center text-xs font-semibold text-white py-2 px-2 bg-orange-600/20 border-b-2 border-orange-400 ${roundingClass}`}
                      >
                        JUL {date}
                      </th>
                    );
                  })}
                  {groupIndex < dateGroups.length - 1 && (
                    <th className="w-2"></th>
                  )}
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, timeIndex) => (
              <tr key={time}>
                <td className="text-xs text-white pr-2 py-1 text-right align-middle">
                  {time}
                </td>
                {dateGroups.map((group, groupIndex) => (
                  <React.Fragment key={`group-${groupIndex}-${time}`}>
                    {group.map((date, dateIndex) => {
                      const isFirst = dateIndex === 0;
                      const isLast = dateIndex === group.length - 1;
                      const isSingle = group.length === 1;
                      const isLastTimeRow = timeIndex === times.length - 1;

                      let roundingClass = "";
                      let borderClass =
                        "border-r border-l border-b border-[#b6c2a1]";
                      let marginClass = "";

                      // Add bottom rounding only on the last time row
                      if (isLastTimeRow) {
                        if (isSingle) {
                          roundingClass = "rounded-b-lg";
                          borderClass = "border border-[#b6c2a1]";
                        } else if (isFirst) {
                          roundingClass = "rounded-bl-lg";
                          borderClass = "border-l border-b border-[#b6c2a1]";
                        } else if (isLast) {
                          roundingClass = "rounded-br-lg";
                          borderClass = "border-r border-b border-[#b6c2a1]";
                        } else {
                          borderClass = "border-b border-[#b6c2a1]";
                        }
                      } else {
                        // Regular rows without bottom rounding
                        if (isSingle) {
                          borderClass = "border border-[#b6c2a1]";
                        } else if (isFirst) {
                          borderClass = "border-l border-b border-[#b6c2a1]";
                        } else if (isLast) {
                          borderClass = "border-r border-b border-[#b6c2a1]";
                        } else {
                          borderClass = "border-b border-[#b6c2a1]";
                        }
                      }

                      // Add tiny gap between consecutive dates (except last in group)
                      if (!isLast) {
                        marginClass = "mr-1";
                      }

                      return (
                        <td
                          key={date}
                          className={`flex-none bg-white/80 h-12 w-12 hover:bg-orange-100 transition-colors ${borderClass} ${roundingClass} ${marginClass}`}
                        ></td>
                      );
                    })}
                    {groupIndex < dateGroups.length - 1 && (
                      <td className="w-2"></td>
                    )}
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}