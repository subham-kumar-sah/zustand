import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import useHabbitStore, { type Habit } from "../Store/Store";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleIcon from "@mui/icons-material/Delete";

const HabitList = () => {
  const { habits, removeHabit, toggleHabbit } = useHabbitStore();
  const today = new Date().toISOString().split("T")[0];

  const getStreak = (habit: Habit) => {
    let streak = 0;
    const currentDate = new Date();
    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
      currentDate.setDate(currentDate.getDate() - 1);
    }
    return streak;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habits.map((habit) => {
        return (
          <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
            <Grid container alignItems={"center"}>
              <Grid>
                <Typography variant="h6" component="h2">
                  {habit.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {habit.frequency}
                </Typography>
              </Grid>
              <Grid>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => toggleHabbit?.(habit.id, today)}
                    color={
                      habit.completedDates.includes(today)
                        ? "success"
                        : "primary"
                    }
                  >
                    {habit.completedDates.includes(today)
                      ? "Completed"
                      : "Mark Complete"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleIcon />}
                    onClick={() => removeHabit?.(habit.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography>Current Streak: {getStreak(habit)}</Typography>
              <LinearProgress
                sx={{ mt: 1 }}
                variant="determinate"
                value={(getStreak(habit) / 30) * 100}
              />
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};

export default HabitList;
