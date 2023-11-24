import React from "react"
import { TextField } from "@mui/material"
import FormControl from "@mui/material/FormControl"
const UserNameInput = React.forwardRef(
  (props: { field?: any; trigger?: any; errors?: any; ErrorMessage?: any }, ref) => {
    const { trigger, field, errors, ErrorMessage } = props
    const handleBlur = () => {
      trigger(field.name)
    }
    return (
      <FormControl fullWidth className="mb-4">
        <TextField
          {...field}
          ref={ref}
          id="outlined-basic"
          fullWidth
          // autoComplete="off"
          className="phone:text-4xl"
          label="账号"
          variant="outlined"
          error={!!errors}
          onBlur={handleBlur}
        />
        {ErrorMessage && ErrorMessage()}
      </FormControl>
    )
  },
)

UserNameInput.displayName = "UserNameInput"
export default UserNameInput
