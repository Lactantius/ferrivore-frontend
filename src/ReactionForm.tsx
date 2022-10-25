import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function ReactionForm({ idea, user }: ReactionFormProps): JSX.Element {
  return (
    <Box className="ReactionForm" component="form">
      <TextField type="number" />
    </Box>
  );
}

export default ReactionForm;
