import React, { useEffect, useState } from "react";
import { Meeting, Room } from "../interfaces/MeetingRoom.interface";
import { Button, Stack } from "@mui/material";
import MeetingSummary from "./MeetingSummary";

export default function Meetings({
  room,
  setState,
  setMeeting,
  deleteMeeting,
}: {
  room: Room;
  setState: Function;
  setMeeting: Function;
  deleteMeeting: Function;
}) {
  const goBack = () => {
    setState("back");
  };

  const scheduleMeeting = () => {
    setState("new");
  };
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    setMeetings(room.meetings);
  }, [room]);

  return (
    <div>
      <h1>Room {room.name}</h1>
      <br />
      {meetings.length === 0 && (
        <span>
          Add a meeting to have meeting scheduled for this room <br />
        </span>
      )}
      <Stack direction="column" spacing={2} justifyContent="center">
        {meetings.map((meeting) => (
          <MeetingSummary
            key={meeting.id}
            meeting={meeting}
            setState={setState}
            setMeeting={setMeeting}
            deleteMeeting={deleteMeeting}
          ></MeetingSummary>
        ))}
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "center", my: 2 }}
      >
        <Button
          sx={{ my: 2 }}
          variant="contained"
          size="small"
          onClick={() => scheduleMeeting()}
        >
          Schedule Meeting
        </Button>
        <Button
          sx={{ my: 2 }}
          variant="contained"
          size="small"
          onClick={() => goBack()}
        >
          Go back to rooms list
        </Button>
      </Stack>
    </div>
  );
}
