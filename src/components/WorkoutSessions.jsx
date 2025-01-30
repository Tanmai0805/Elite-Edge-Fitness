import React from "react";

const WorkoutSessions = () => {
  return (
    <section className="workout_session">
      {/* Top Workout Session */}
      <div className="wrapper">
        <h1>Top Workout Sessions</h1>
        <p>
          Take your fitness to the next level with our expertly designed workout sessions. 
          From strength training to cardio and endurance, our sessions are tailored to meet all fitness goals, 
          whether you're a beginner or a seasoned athlete.
        </p>
        <img src="/img5.jpg" alt="Person working out at the gym" />
      </div>

      {/* Featured Bootcamps */}
      <div className="wrapper">
        <h1>Featured Bootcamps</h1>
        <p>
          Join our bootcamps to experience the best group fitness training. Led by certified trainers, 
          these programs are designed to help you build strength, improve stamina, and achieve your fitness goals 
          in a fun and motivating environment.
        </p>
        <div className="bootcamps">
          {/* Bootcamp 1 */}
          <div>
            <h6>Strength and Conditioning Bootcamp</h6>
            <p>
              Build strength and improve your overall fitness with this high-intensity program. 
              Our trainers will guide you through weightlifting, bodyweight exercises, and endurance drills, 
              all designed to maximize your physical potential.
            </p>
          </div>

          {/* Bootcamp 2 */}
          <div>
            <h6>Cardio and Endurance Bootcamp</h6>
            <p>
              Boost your stamina and burn calories with our comprehensive cardio-focused bootcamp. 
              This program is a mix of dynamic exercises such as running intervals, cycling sessions, 
              and high-intensity aerobic workouts, ensuring a full-body calorie-burning experience.
            </p>
            <p>
              Each session is designed to challenge your limits and improve your cardiovascular health. 
              You'll work on speed, agility, and endurance through fun and varied drills that keep you engaged and motivated.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkoutSessions;
