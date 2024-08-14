import { useEffect, useState } from "react";
import { Meeting, Room } from "./interfaces/MeetingRoom.interface";
import "./App.css";
import RoomsList from "./components/RoomsList";
import Meetings from "./components/Meetings";
import MeetingDetails from "./components/MeetingDetails";
import { Box } from "@mui/material";
import * as api from "./services/api";
import { Config } from "./state-machine/simpleState.interface";
import { Machine } from "./state-machine/simpleStateMachine";
import Loader from "./components/Loader";

function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [room, setRoom] = useState<any>(null);
  const [meeting, setMeeting] = useState<any>(null);
  const [state, setState] = useState("");
  const [deleteMeeting, setDeleteMeeting] = useState<number>();
  const [meetingUpdate, setMeetingUpdate] = useState<Meeting>();
  const [newMeeting, setNewMeeting] = useState<Meeting>();

  const [machine, setMachine] = useState<any>();
  useEffect(() => {
    api.getConfig().then((config: Config) => {
      const stateMachine = new Machine(config);
      setMachine(stateMachine);
    });
  }, []);
  const [machineState, setMachineState] = useState("idle");
  useEffect(() => {
    if (!machine) {
      return;
    }

    machine.transition(state);
    setMachineState(machine.getState());
  }, [machine, setMachine, setState, state]);

  useEffect(() => {
    if (!machine) {
      return;
    }
    api.getRooms().then((rooms: Room[]) => {
      setRooms(rooms);
      machine.transition("roomsFetched");
      setMachineState(machine.getState());
    });
  }, [machine, setMachine]);

  useEffect(() => {
    if (!deleteMeeting) {
      return;
    }

    room.meetings = room.meetings.filter(
      (meeting: Meeting) => meeting.id !== deleteMeeting
    );

    api
      .deleteMeeting(room.id, deleteMeeting)
      .then(() => {
        setDeleteMeeting(undefined);
        setRooms([...rooms]);
        setRoom({ ...room });
      })
      .catch((err) => console.error(err));
  }, [deleteMeeting, room, rooms]);

  useEffect(() => {
    if (!newMeeting) {
      return;
    }
    const meeting = {
      ...newMeeting,
      id: new Date().getTime(),
    };
    room.meetings.push(meeting);
    api.createMeeting(room.id, meeting).then(() => {
      setNewMeeting(undefined);
      setRooms([...rooms]);
      setRoom({ ...room });
    });
  }, [newMeeting, room, rooms]);

  useEffect(() => {
    if (!meetingUpdate) {
      return;
    }

    room.meetings = room.meetings.map((meeting: Meeting) =>
      meeting.id !== meetingUpdate.id ? meeting : meetingUpdate
    );

    api
      .updateMeeting(room.id, meetingUpdate)
      .then(() => {
        setMeetingUpdate(undefined);
        setRooms([...rooms]);
        setRoom({ ...room });
      })
      .catch((err) => console.error(err));
  }, [meeting, meetingUpdate, room, rooms]);

  return (
    <div className="App">
      <Box
        width={720}
        height="100vh"
        justifyContent="center"
        display="flex"
        alignItems="center"
      >
        {machineState === "idle" && <Loader></Loader>}
        {machineState === "viewRooms" && (
          <RoomsList
            rooms={rooms}
            setState={setState}
            setRoom={setRoom}
          ></RoomsList>
        )}
        {machineState === "viewRoom" && (
          <Meetings
            room={room}
            setState={setState}
            setMeeting={setMeeting}
            deleteMeeting={setDeleteMeeting}
          ></Meetings>
        )}
        {machineState === "editing" && (
          <MeetingDetails
            meeting={meeting}
            room={room}
            setState={setState}
            setMeeting={setMeeting}
            meetingUpdate={setMeetingUpdate}
          ></MeetingDetails>
        )}
        {machineState === "scheduling" && (
          <MeetingDetails
            meeting={null}
            room={room}
            setState={setState}
            setMeeting={setMeeting}
            meetingUpdate={setNewMeeting}
          ></MeetingDetails>
        )}
      </Box>
    </div>
  );
}

export default App;
