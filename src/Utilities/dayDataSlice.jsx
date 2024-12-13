import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  days: [],
  baseDate: null,
  totalPausesUsed: 0,
  pauseExhausted: false,
  brushedToday: false, 
  nextDayAvailable: false, 
};

const dayDataSlice = createSlice({
  name: 'dayData',
  initialState,
  reducers: {
    addNewDay(state, action) {
      const missedDay = action.payload?.missed || false;
      const newDayIndex = state.days.length + 1;
      let currentDate;

      if (!state.baseDate) {
        state.baseDate = new Date();
        currentDate = new Date(state.baseDate);
      } else {
        currentDate = new Date(state.baseDate);
        currentDate.setDate(state.baseDate.getDate() + newDayIndex - 1);
      }

      const lastDay = state.days.length > 0 ? state.days[state.days.length - 1] : null;
      const lastDayDetails = lastDay ? Object.values(lastDay)[0] : null;

      let newPauseLeft = lastDayDetails ? lastDayDetails.pause_left : 5;
      let newCurrentStreak = lastDayDetails ? lastDayDetails.current_streak : 0;
      let totalPoints = lastDayDetails ? lastDayDetails.total_points : 0;

      const continuityDay = missedDay ? 0 : newCurrentStreak + 1;
      const pointsToAdd = missedDay ? 0 : continuityDay;

      if (missedDay) {
        newPauseLeft = Math.max(0, newPauseLeft - 1);
        state.totalPausesUsed += 1;

        if (state.totalPausesUsed >= 5) {
          state.pauseExhausted = true;
        }

        if (state.pauseExhausted) {
          newCurrentStreak = 0;
        }
      } else {
        if (!state.pauseExhausted) {
          newCurrentStreak += 1;
        } else {
          newCurrentStreak += 1;
        }
        totalPoints += pointsToAdd;
      }
     
      const newDay = {
        [`day${newDayIndex}`]: {
          did_brush: !missedDay,
          day_number: `day${newDayIndex}`,
          added_points: pointsToAdd,
          removed_points: missedDay ? 1 : 0,
          total_points: totalPoints,
          current_streak: newCurrentStreak,
          data_and_time: currentDate.toLocaleString(),
          pause_left: newPauseLeft,
          current_badge: "",
          tag_name: "",
        },
      };

      state.days.push(newDay);

      state.brushedToday = !missedDay;
      state.nextDayAvailable = !missedDay;
    },
    enableNextDay(state) {
      state.brushedToday = false;
      state.nextDayAvailable = false;
    },
  },
});

export const { addNewDay, enableNextDay } = dayDataSlice.actions;
export default dayDataSlice.reducer;
