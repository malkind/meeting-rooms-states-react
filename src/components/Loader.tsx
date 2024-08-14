import { LinearProgress } from "@mui/material";
import React from "react";

export default function Loader() {
  return (
    <div>
      <LinearProgress />
      Loading rooms...
    </div>
  );
}
