export interface Room {
  name: string;
  meetings: Meeting[];
  id: number;
}

export interface Meeting {
  startTime: number;
  endTime: number;
  title: string;
  description: string;
  owner?: string;
  id?: number;
}
