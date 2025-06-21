"use client";

import { useState } from "react";
import { Send } from "lucide-react";

// Mock data for demonstration
const event = {
  id: "abc123",
  name: "Team Sync",
  description: "Weekly team sync-up",
  dates: [21, 22, 24, 26, 30],
};

const times = [
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
];

const mockComments = [
  {
    id: 1,
    userName: "Generic Oswaldo",
    content:
      "Lorem ipsum dolor this is hand typed comment content rama rama hotep",
    timestamp: "10:31 AM",
    isOwn: false,
  },
  {
    id: 2,
    userName: "Generic Oswaldo",
    content:
      "Lorem ipsum dolor this is hand typed comment content rama rama hotep",
    timestamp: "10:31 AM",
    isOwn: true,
  },
  {
    id: 3,
    userName: "Generic Oswaldo",
    content:
      "Lorem ipsum dolor this is hand typed comment content rama rama hotep",
    timestamp: "10:31 AM",
    isOwn: false,
  },
  {
    id: 4,
    userName: "Generic Oswaldo",
    content:
      "Lorem ipsum dolor this is hand typed comment content rama rama hotep",
    timestamp: "10:31 AM",
    isOwn: false,
  },
];

export default function ParticipantPage() {
  // 2D array: times x dates
  const [selected, setSelected] = useState(
    Array(times.length)
      .fill(null)
      .map(() => Array(event.dates.length).fill(false)),
  );
  const [dragging, setDragging] = useState(false);
  const [dragValue, setDragValue] = useState(true);
  const [name, setName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mockComments);

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
    setSelected((prev) => {
      const next = prev.map((arr) => [...arr]);
      next[row][col] = value;
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: send selected availability to backend
    alert("Availability submitted!");
  }

  function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        userName: name || "Anonymous",
        content: newComment.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
        isOwn: true,
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  }

  return (
    <div className="min-h-screen bg-[#FEFCFA] flex" onMouseUp={handleMouseUp}>
      {/* Left Sidebar */}
      <div className="w-[449px] bg-[#FEFCFA] flex flex-col relative">
        {/* Logo */}
        <div className="absolute left-[21px] top-[20px]">
          <div className="w-[114px] h-[114px] rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Tomeeto Tomahto Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Name Section */}
        <div className="mt-[167px] ml-[42px] w-[349px]">
          <div className="mb-[21px]">
            <label className="block text-[#334155] font-semibold text-[18px] leading-[21px] mb-[21px]">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[33px] px-[10.5px] py-[7px] border border-[#CBD5E1] rounded-[6px] bg-white shadow-sm text-[14px] leading-[17px]"
                placeholder="Enter your name"
              />
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="ml-[42px] w-[349px] mt-[36px] flex-1">
          <label className="block text-[#334155] font-semibold text-[18px] leading-[21px] mb-[21px]">
            Comments
          </label>

          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit} className="mb-[33px]">
            <div className="relative h-[93px] border border-[#CBD5E1] rounded-[6px] bg-white shadow-sm p-[10.5px]">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full h-[50px] resize-none border-none outline-none text-[14px]"
                placeholder="Add a comment..."
              />
              <div className="absolute bottom-[10.5px] right-[10.5px]">
                <button
                  type="submit"
                  className="w-[36px] h-[36px] bg-[#526A34] rounded-full border-2 border-[#2C2C2C] flex items-center justify-center hover:bg-[#455529] transition-colors"
                >
                  <Send
                    className="w-[17px] h-[17px] text-[#F5F5F5]"
                    strokeWidth={2}
                  />
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-[12px] max-h-[400px] overflow-y-auto">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`p-[18px] rounded-[6px] ${
                  comment.isOwn
                    ? "bg-gradient-to-r from-[#526A34]/50 to-[#526A34]/50 bg-white/50 bg-blend-overlay"
                    : "bg-[#F3D7AF]"
                }`}
              >
                <div className="flex justify-between items-start mb-[5px]">
                  <span className="text-black font-normal text-[14px] leading-[20px] tracking-[0.25px] font-roboto">
                    {comment.userName}
                  </span>
                  <span className="text-black font-normal text-[14px] leading-[20px] tracking-[0.25px] font-roboto">
                    {comment.timestamp}
                  </span>
                </div>
                <p
                  className={`font-medium text-[16px] leading-[24px] tracking-[0.5px] font-roboto ${
                    comment.isOwn ? "text-[#4F4F4F]" : "text-[#6B6B6B]"
                  }`}
                >
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Calendar Area */}
      <div className="flex-1 bg-[#526A34] relative">
        {/* Title */}
        <div className="text-center pt-[81px] pb-[67px]">
          <h1 className="text-[#FEFCFA] text-[24px] font-semibold leading-[28.8px] font-inter">
            Enter Your Availability
          </h1>
        </div>

        {/* Calendar Container */}
        <div className="px-[149px]">
          <div className="relative">
            {/* Calendar Grid */}
            <div className="bg-[#FEFCFA] rounded-t-[10px] relative">
              {/* Header rounded tops */}
              {event.dates.map((date, index) => (
                <div
                  key={date}
                  className="absolute top-0 w-[86px] h-[9px] bg-[#F3D7AF] rounded-t-[10px]"
                  style={{ left: `${64 + index * 121}px` }}
                />
              ))}

              {/* Table */}
              <table className="w-full border-separate border-spacing-0 select-none">
                <thead>
                  <tr>
                    <th className="w-[50px] h-[37px]"></th>
                    {event.dates.map((date) => (
                      <th
                        key={date}
                        className="text-center text-[16px] font-semibold text-[#FEFCFA] py-2 px-2 bg-[#526A34] relative w-[121px]"
                      >
                        <div className="relative z-10">JUL {date}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {times.map((time, rowIdx) => (
                    <tr key={time} className="h-[56px]">
                      <td className="text-[14px] text-[#FEFCFA] pr-2 text-right align-middle font-medium bg-[#526A34] border-r-2 border-[#DA5926] relative">
                        <div className="relative z-10">{time}</div>
                      </td>
                      {event.dates.map((date, colIdx) => {
                        const isSelected = selected[rowIdx][colIdx];
                        const isTopRow = rowIdx === 0;
                        const isBottomRow = rowIdx === times.length - 1;

                        return (
                          <td
                            key={date}
                            className={`h-[56px] w-[121px] border border-[#526A34] cursor-pointer transition-colors relative
                              ${isSelected ? "bg-[#A5E753]/50" : "bg-[#FEFCFA] hover:bg-[#A5E753]/20"}
                              ${isTopRow ? "border-t-2 border-t-[#DA5926]" : ""}
                              ${isBottomRow ? "border-b-2 border-b-[#DA5926]" : ""}
                            `}
                            onMouseDown={() =>
                              handleCellMouseDown(rowIdx, colIdx)
                            }
                            onMouseEnter={() =>
                              handleCellMouseEnter(rowIdx, colIdx)
                            }
                          ></td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="absolute bottom-[77px] right-[149px]">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-[7px] px-[10.5px] py-[7px] bg-[#DA5926] border border-[#DA5926] rounded-[28px] text-white font-medium text-[14px] hover:bg-[#c44d1f] transition-colors"
          >
            Save Availability
          </button>
        </div>

        {/* Navigation arrows (decorative) */}
        <div className="absolute top-[185px] left-[167px] w-6 h-6 text-[#FEFCFA]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="absolute top-[148px] right-[167px] w-6 h-6 text-[#FEFCFA] transform rotate-90">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="absolute bottom-[185px] left-[167px] w-6 h-6 text-[#FEFCFA]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            transform="rotate(180)"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}