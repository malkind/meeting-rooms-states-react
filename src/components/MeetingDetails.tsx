import React, { useState } from "react";
import { Meeting, Room } from "../interfaces/MeetingRoom.interface";
import { Button, TextField, Stack, Box } from "@mui/material";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function MeetingDetails({
  meeting,
  room,
  setState,
  setMeeting,
  meetingUpdate,
}: {
  meeting: Meeting | null;
  room: Room;
  setState: Function;
  setMeeting: Function;
  meetingUpdate: Function;
}) {
  const [title, setTitle] = useState(meeting?.title || "");
  const [description, setDescription] = useState(meeting?.description || "");
  const [startTime, setStartTime] = useState(meeting?.startTime);
  const [endTime, setEndTime] = useState(meeting?.endTime);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setState("save");

    meetingUpdate({
      ...meeting,
      title,
      description,
      startTime,
      endTime,
    });
  };
  const onCancel = () => {
    setState("cancel");
    setMeeting(null);
  };
  return (
    <Box
      sx={{
        border: "1px dashed grey",
        padding: 5,
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2>Meeting details</h2>
        <TextField
          type="text"
          label="Room name"
          fullWidth
          required
          sx={{ mb: 4 }}
          value={room.name}
          disabled
        ></TextField>
        <TextField
          type="text"
          label="Meeting name"
          fullWidth
          required
          sx={{ mb: 4 }}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        ></TextField>
        <TextField
          type="text"
          label="Meeting description"
          multiline
          fullWidth
          sx={{ mb: 4 }}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></TextField>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeField
            label="Start time"
            sx={{ mb: 4 }}
            ampm={false}
            fullWidth
            required
            onChange={(value, context) => {
              setStartTime(dayjs(value).valueOf());
            }}
            value={startTime ? dayjs(startTime) : null}
          ></TimeField>
          <TimeField
            label="End time"
            sx={{ mb: 4 }}
            ampm={false}
            fullWidth
            required
            onChange={(value, context) => {
              setEndTime(dayjs(value).valueOf());
            }}
            value={endTime ? dayjs(endTime) : null}
          ></TimeField>
        </LocalizationProvider>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" fullWidth type="submit">
            Save
          </Button>
          <Button variant="contained" fullWidth onClick={onCancel}>
            Exit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
