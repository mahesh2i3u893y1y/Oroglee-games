
import { useSelector } from "react-redux";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaRegSmileBeam, FaMedal } from "react-icons/fa";

const getWeeklySummary = (days) => {
  const weeklySummary = [];
  let week = [];
  let totalPoints = 0;
  let streak = 0;

  days.forEach((day, index) => {
    const dayDetails = Object.values(day)[0];
    const date = new Date(dayDetails.data_and_time).toLocaleDateString();
    totalPoints += dayDetails.added_points;
    streak = dayDetails.current_streak;

    week.push({
      date,
      didBrush: dayDetails.did_brush,
      points: dayDetails.added_points,
    });

    // If the week is complete or it's the last day, create a summary
    if ((index + 1) % 7 === 0 || index === days.length - 1) {
      weeklySummary.push({
        weekNumber: Math.ceil((index + 1) / 7),
        startDate: week[0].date,
        endDate: week[week.length - 1].date,
        totalPoints,
        streak,
        days: week,
        badge: streak >= 7 ? "Motivated Brusher" : streak >= 14 ? "Brushing Champion" : "",
      });
      // Reset for the next week
      week = [];
    }
  });

  return weeklySummary;
};

const Timeline = () => {
  const days = useSelector((store) => store.dayData.days);

  // Generate weekly summaries from Redux store data
  const weeklyData = getWeeklySummary(days);

  return (
    <div className="p-5 bg-gray-100 min-h-screen overflow-y-auto pt-16 w-full">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
        Journey Timeline
      </h1>
      <VerticalTimeline>
        {weeklyData.map((week, index) => (
          <VerticalTimelineElement
            key={index}
            date={`Week ${week.weekNumber}: ${week.startDate} - ${week.endDate}`}
            icon={week.badge ? <FaMedal /> : <FaRegSmileBeam />}
            iconStyle={{
              background: week.badge ? "rgb(33, 150, 243)" : "rgb(233, 30, 99)",
              color: "#fff",
            }}
          >
            <h3 className="vertical-timeline-element-title">
              {week.badge ? `Badge Earned: ${week.badge}` : "Keep Brushing!"}
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Total Points: {week.totalPoints}
            </h4>
            <p>Current Streak: {week.streak}</p>
            <ul className="list-disc pl-4">
              {week.days.map((day, i) => (
                <li key={i}>
                  {day.date}: {day.didBrush ? "Brushed ✔️" : "Missed ❌"} (+{day.points} points)
                </li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Timeline;
