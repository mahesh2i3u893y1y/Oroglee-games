import { useState } from "react";
import { useSelector } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const Tracker = () => {
  const days = useSelector((store) => store.dayData.days);


  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0 = January, 11 = December
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Helper function to get the number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate(); // Last day of the month
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  // Create the brushing record for the current month
  const brushingRecord = Array.from({ length: daysInMonth }, (_, index) => {
    const day = days.find((entry) => {
      const entryDate = new Date(entry[Object.keys(entry)[0]].data_and_time);
      return (
        entryDate.getDate() === index + 1 &&
        entryDate.getMonth() === currentMonth &&
        entryDate.getFullYear() === currentYear
      );
    });

    if (!day) return null; // No data for this day yet
    const dayKey = Object.keys(day)[0];
    const dayDetails = day[dayKey];
    const dateOnly = new Date(dayDetails.data_and_time).toLocaleDateString();
    return {
      didBrush: dayDetails.did_brush,
      date: dateOnly,
    };
  });

  // Handlers for navigation
  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11); // Go to December of the previous year
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); // Go to January of the next year
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="p-4">
      {/* Header with Month and Year */}
      <div className="flex  justify-start gap-2 mb-4">
        <h2 className="text-lg font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePreviousMonth}
            className="px-2 py-1 bg-gray-50 rounded-full hover:bg-gray-200"
          >
            <GrFormPrevious />
          </button>
          <button
            onClick={handleNextMonth}
            className="px-2 py-1 bg-gray-50 rounded-full hover:bg-gray-200"
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>

      {/* Brushing Record */}
      <div className="grid grid-cols-7 gap-2">
        {brushingRecord.map((record, index) => (
          <div
            key={index}
            className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-white text-xs ${record === null
                ? "bg-gray-200"
                : record.didBrush
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            title={
              record === null
                ? "No data"
                : record.didBrush
                  ? `You brushed on ${record.date}`
                  : `You missed on ${record.date}`
            }
          >

          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex p-5 gap-4">
        <div className="flex gap-1">
          <div className="w-6 h-6 bg-green-500 rounded-md"></div>
          <p className="text-gray-400">Brushed</p>
        </div>
        <div className="flex gap-1">
          <div className="w-6 h-6 bg-red-500 rounded-md"></div>
          <p className="text-gray-400">Missed</p>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
