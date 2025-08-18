import React from "react";
import { Container, Box, Typography } from "@mui/material";
import "./App.css";
import useHabbitStore from "./Store/Store";
import AddHabitForm from "./Components/add-habit-form";
import HabitList from "./Components/habit-list";

function App() {
  const store = useHabbitStore();
  console.log(store);
  const { fetchHabits } = useHabbitStore();

  React.useEffect(() => {
    fetchHabits?.();
  }, []);

  return (
    <Container>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Habit Tracker
        </Typography>
        <AddHabitForm />
        <HabitList />
      </Box>
    </Container>
  );
}

export default App;
