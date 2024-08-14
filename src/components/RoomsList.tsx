import React from "react";
import { Room } from "../interfaces/MeetingRoom.interface";
import Card from "@mui/material/Card";
import {
  CardActions,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";

export default function RoomsList({
  rooms,
  setState,
  setRoom,
}: {
  rooms: Room[];
  setState: Function;
  setRoom: Function;
}) {
  const onRoomClicked = (room: Room) => {
    setState("roomSelected");
    setRoom(room);
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      data-testid="rooms-list"
    >
      {rooms.map((room: Room) => (
        <Grid item key={room.id}>
          <Card
            variant="outlined"
            sx={{ backgroundColor: "rgba(85, 166, 246, 0.1)" }}
          >
            <CardContent>
              <Typography variant="h5">{room.name}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                size="small"
                onClick={() => onRoomClicked(room)}
              >
                View Room Meetings
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
