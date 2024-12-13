import { useSelector } from "react-redux";

const Tracker = () => {
  const days = useSelector((store) => store.dayData.days);

  const brushingRecord = Array.from({ length: 30 }, (_, index) => {
    const day = days[index];
    if (!day) return null; // No data for this day yet
    const dayKey = Object.keys(day)[0]; // e.g., "day1"
    const dayDetails = day[dayKey];
    const dateOnly = new Date(dayDetails.data_and_time).toLocaleDateString()
    return {
      didBrush: dayDetails.did_brush,
      date: dateOnly, // Use the formatted date string directly
    };
  });

  return (
    <>
      <div className="grid grid-cols-7 gap-2 p-4">
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
          ></div>
        ))}
      </div>
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
    </>
  );
};

export default Tracker;
