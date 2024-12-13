import { createSlice } from "@reduxjs/toolkit";

const initialGamesState = [
  {
    id:1,
    played:false,
    notplayed:true,
    status:"locked",
    name: "Pair it Up",
    link: "/games/memoryflip",
    img: "https://cdn.pixabay.com/photo/2014/12/21/23/58/flamingos-576492_1280.png",
    rules: "Match all the pairs within the given time to win!",
  },
  {
    played:false,
    notplayed:true,
    status:"locked",
    id:2,
    name: "Puzzle",
    link: "/games/puzzle",
    img: "https://cdn.pixabay.com/photo/2012/04/05/02/19/jigsaw-26002_1280.png",
   
  },
  {
  id:3,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Catch a Fruit",
  link: "/games/fruit-catcher",
  img: "https://cdn.pixabay.com/photo/2020/07/22/20/57/fruits-basket-5429751_1280.png",
  
  rules: "Catch as many falling fruits as you can within the time limit!",
},
{
  id:4,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Tap and Smile",
  link: "/games/emoji-game",
  img: "https://cdn.pixabay.com/photo/2020/02/09/09/38/smiley-4832492_1280.png",
  rules: "Tap the smiling emojis and avoid the sad ones for points!",
},
{
  id:5,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Tic Tac Toe",
  link: "/games/tic-tac-toe",
  img: "https://cdn.pixabay.com/photo/2023/01/22/23/16/tic-tac-toe-7737546_1280.jpg",
  video: "https://example.com/videos/tic-tac-toe.mp4",
  rules: "Get three in a row to win against your opponent!",
},
{
  id:6,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Snake",
  link: "/games/snake",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/snake.mp4",
  rules: "Eat food and grow, but don't hit the walls or yourself!",
},
{
  id:7,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Rock Paper Scissor",
  link: "/games/rock-paper-scissor",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/rock-paper-scissor.mp4",
  rules: "Choose rock, paper, or scissors and outsmart the computer!",
},
{
  id:8,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Fluffy Bird",
  link: "/games/fluffy-bird",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/fluffy-bird.mp4",
  rules: "Tap to keep the bird flying and avoid the obstacles!",
},
{
  id:9,
  played:false,
  notplayed:true,
  status:"locked",
  name: "2048",
  link: "/games/2048",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/2048.mp4",
  rules: "Combine tiles with the same numbers to reach 2048!",
},
{
  id:10,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Sudoko",
  link: "/games/sudoko",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/sudoko.mp4",
  rules: "Fill the grid with numbers 1-9 without repeating in rows, columns, or boxes!",
},
{
  id:11,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Madness",
  link: "/games/madness",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/madness.mp4",
  rules: "Survive the chaos and complete objectives to win!",
},
{
  id:12,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Matching Game",
  link: "/games/matching-game",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/matching-game.mp4",
  rules: "Find and match all pairs to win!",
},
{
  id:13,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Spot Differences",
  link: "/games/differences",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/spot-differences.mp4",
  rules: "Spot all the differences between two pictures!",
},
{
  id:14,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Shadow Game",
  link: "/games/shadow-game",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/shadow-game.mp4",
  rules: "Match the objects with their shadows before time runs out!",
},
{
  id:15,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Finding Word",
  link: "/games/dots-game",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/finding-word.mp4",
  rules: "Find all the hidden words to solve the puzzle and score points!",
},
{
  id:16,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Guess Number",
  link: "/games/tooth-defender",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/guess-number.mp4",
  rules: "Guess the number chosen by the computer in the least attempts!",
},
{
  id:17,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Maths Quiz",
  link: "/games/maths-quiz",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/maths-quiz.mp4",
  rules: "Answer math questions quickly to earn points!",
},
{
  id:18,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Missing Number",
  link: "/games/missing-number",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/missing-number.mp4",
  rules: "Fill in the missing number to complete the sequence!",
},
{
  id:19,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Odd One Out",
  link: "/games/odd-one-out",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/odd-one-out.mp4",
  rules: "Find the object that doesn't belong in the group!",
},
{
  id:20,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Reorder It",
  link: "/games/reorder-it",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/reorder-it.mp4",
  rules: "Rearrange the pieces to form the correct sequence or image!",
},
{
  id:21,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Find It",
  link: "/games/find-it",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/find-it.mp4",
  rules: "Search and find all the hidden objects in the scene!",
},
{
  id:22,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Missing Letter",
  link: "/games/missing-letter",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/missing-letter.mp4",
  rules: "Guess the missing letters to complete the word!",
},
{
  id:23,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Number Pattern",
  link: "/games/number-pattern",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/number-pattern.mp4",
  rules: "Identify and complete the number patterns in the grid!",
},
{
  id:24,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Moon Activity",
  link: "/games/moon-game",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/moon-activity.mp4",
  rules: "Perform actions related to the moon phases and earn points!",
},
{
  id:25,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Monkey",
  link: "/games/monkey-game",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/monkey-game.mp4",
  rules: "Help the monkey collect bananas and avoid obstacles!",
},
{
  id:26,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Bodmas Maths",
  link: "/games/bodmas-maths",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/bodmas-maths.mp4",
  rules: "Solve equations using BODMAS rules to score points!",
},
{
  id:27,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Quick Tap",
  link: "/games/quick-tap",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/quick-tap.mp4",
  rules: "Tap quickly on the targets to earn points before time runs out!",
},
{
  id:28,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Image Suspense",
  link: "/games/image-suspense",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/image-suspense.mp4",
  rules: "Unveil the hidden image piece by piece before time runs out!",
},
{
  id:29,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Spin Wheel",
  link: "/games/spin-wheel",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/spin-wheel.mp4",
  rules: "Spin the wheel and complete challenges to win rewards!",
},
{
  id:30,
  played:false,
  notplayed:true,
  status:"locked",
  name: "Spin Math",
  link: "/games/spin-math",
  img: "https://cdn.pixabay.com/photo/2013/07/13/13/42/snake-161424_1280.png",
  video: "https://example.com/videos/spin-math.mp4",
  rules: "Spin the wheel to get math questions and solve them to score points!",
},
  
];

const gamesSlice = createSlice({
  name: "games",
  initialState: initialGamesState,
  reducers: {
    updateGameStatus(state, action) {
      const { id, status } = action.payload;
      const game = state.find((game) => game.id === id);
      if (game) {
        game.status = status;
        game.played = status === "played";
        game.notplayed = status !== "played";
      }
    },
    unlockRandomGame(state) {
      const lockedGames = state.filter((game) => game.status === "locked");
      if (lockedGames.length > 0) {
        const randomIndex = Math.floor(Math.random() * lockedGames.length);
        const gameToUnlock = lockedGames[randomIndex];
        gameToUnlock.status = "unlocked";
        gameToUnlock.notplayed = true;
      }
    },
    markGameAsPlayed(state, action) {
      const gameId = action.payload;
      const game = state.find((game) => game.id === gameId);
      if (game && !game.played) {
        game.played = true;
        game.status = "played"; 
      }
    },
  },
});

export const { updateGameStatus, unlockRandomGame, markGameAsPlayed } =
  gamesSlice.actions;

export default gamesSlice.reducer;