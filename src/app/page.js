"use client";

import { useState } from "react";
import { getWorkouts } from "./actions";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  const [userInput, setUserInput] = useState(""); // Input text state
  const [workout, setWorkouts] = useState(""); // Notifications output state

  return (
    <div className="chat-container">
      <div className="chat-box">
        {/* Display AI Response */}
        <pre className="ai-response">{workout}</pre>
      </div>

      <div className="user-input">
        <input
          className="responsebox"
          id="text"
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
          placeholder="Type your message here..."
        />

        <button
          onClick={async () => {
            const { workout } = await getWorkouts(userInput);
            const formattedWorkout = workout
              .map(
                (item) =>
                  `AI: Workout name: ${item.workout_name}\nDescriptionOfWorkout: ${item.Description_of_workout}\n`
              )
              .join("\n");

            setWorkouts(formattedWorkout);
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
