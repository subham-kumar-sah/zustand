import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import useHabbitStore from "../Store/Store";

const AddHabitForm = () => {
  const [name, setName] = React.useState("");
  const [frequency, setFrequency] = React.useState<"daily" | "weekly">("daily");
  const { habits, addHabit } = useHabbitStore();

  console.log("Current Habits:", habits);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") return;
    addHabit(name, frequency);
    setName("");
    setFrequency("daily");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter habit name"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={frequency}
            label="Frequency"
            onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" color="primary" variant="contained">
          Add Habit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;
