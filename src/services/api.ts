import { Meeting, Room } from "../interfaces/MeetingRoom.interface";
import { Config } from "../state-machine/simpleState.interface";

export function getRooms(): Promise<Room[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("http://localhost:8000/rooms")
        .then((data) => data.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    }, 2000);
  });
  //return fetch("http://localhost:8000/rooms").then((data) => data.json());
}

export function deleteMeeting(
  roomId: number,
  meetingId: number
): Promise<void> {
  return fetch("http://localhost:8000/rooms")
    .then((data) => data.json())
    .then((rooms: Room[]) => {
      const room = rooms.find((room: Room) => room.id === roomId);
      if (!room) {
        // throw exception
        return Promise.reject("Room doesn't exist");
      }
      room.meetings = room.meetings.filter(
        (meeting: Meeting) => meeting.id !== meetingId
      );
      const requestOptions: RequestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
      };
      fetch(`http://localhost:8000/rooms/${room.id}`, requestOptions);
    });
}

export function updateMeeting(
  roomId: number,
  updatedMeeting: Meeting
): Promise<void> {
  return fetch("http://localhost:8000/rooms")
    .then((data) => data.json())
    .then((rooms: Room[]) => {
      const room = rooms.find((room: Room) => room.id === roomId);
      if (!room) {
        // throw exception
        return Promise.reject("Room doesn't exist");
      }

      room.meetings = room.meetings.map((meeting: Meeting) =>
        meeting.id !== updatedMeeting.id ? meeting : updatedMeeting
      );

      const requestOptions: RequestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
      };
      fetch(`http://localhost:8000/rooms/${room.id}`, requestOptions);
    });
}

export function createMeeting(
  roomId: number,
  meeting: Meeting
): Promise<Meeting> {
  return fetch("http://localhost:8000/rooms")
    .then((data) => data.json())
    .then((rooms: Room[]) => {
      const room = rooms.find((room: Room) => room.id === roomId);
      if (!room) {
        // throw exception
        return Promise.reject("Room doesn't exist");
      }

      const newMeeting = {
        ...meeting,
        id: new Date().getTime(),
        owner: "Daniel",
      };

      room.meetings.push(newMeeting);

      const requestOptions: RequestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
      };
      return fetch(
        `http://localhost:8000/rooms/${room.id}`,
        requestOptions
      ).then(() => newMeeting);
    });
}

export function getConfig(): Promise<Config> {
  return fetch("http://localhost:8000/config").then((data) => data.json());
}
