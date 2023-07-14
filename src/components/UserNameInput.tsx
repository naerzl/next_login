import React from "react"
import { TextField } from "@mui/material"
import FormControl from "@mui/material/FormControl"
const UserNameInput = React.forwardRef(
  (props: { field?: any; trigger?: any; errors?: any }, ref) => {
    const { trigger, field, errors } = props
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
          label="账号"
          variant="outlined"
          error={errors ? true : false}
          helperText={errors ? "请正确填写账号" : null}
          onBlur={handleBlur}
        />
      </FormControl>
    )
  },
)

UserNameInput.displayName = "UserNameInput"
export default UserNameInput
