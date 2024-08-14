import React from "react";
import { Meeting } from "../interfaces/MeetingRoom.interface";
import Accordion from "@mui/material/Accordion";
import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import dayjs from "dayjs";

export default function MeetingSummary({
  meeting,
  setState,
  setMeeting,
  deleteMeeting,
}: {
  meeting: Meeting;
  setState: Function;
  setMeeting: Function;
  deleteMeeting: Function;
}) {
  const onDeleteBooking = () => {
    deleteMeeting(meeting.id);
  };

  const onEditMeeting = () => {
    setState("edit");
    setMeeting(meeting);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>{meeting.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="meeting details">
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Start time</TableCell>
                  <TableCell>End time</TableCell>
                  <TableCell>Owner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{meeting.description}</TableCell>
                  <TableCell>
                    {dayjs(meeting.startTime).format("HH:mm")}
                  </TableCell>
                  <TableCell>
                    {dayjs(meeting.endTime).format("HH:mm")}
                  </TableCell>
                  <TableCell>{meeting.owner}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
        <Divider></Divider>
        <AccordionActions>
          <Button onClick={onDeleteBooking}>Delete Meeting</Button>
          <Button onClick={onEditMeeting}>Edit Meeting</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
