import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import React from "react"

const PasswordInput = React.forwardRef(
  (props: { field?: any; trigger?: any; errors?: any; id: string; ErrorMessage?: any }, ref) => {
    const { field, trigger, errors, ErrorMessage } = props
    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
    }
    const handleBlur = () => {
      trigger(field.name)
    }
    return (
      <FormControl fullWidth className="mb-4">
        <InputLabel htmlFor={props.id} error={errors ? true : false}>
          密码
        </InputLabel>
        <OutlinedInput
          id={props.id}
          type={showPassword ? "text" : "password"}
          fullWidth
          {...field}
          error={errors ? true : false}
          ref={ref}
          onBlur={handleBlur}
          autoComplete="new-password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="密码"
        />
        {ErrorMessage && ErrorMessage()}
      </FormControl>
    )
  },
)

PasswordInput.displayName = "PasswordInput"
export default PasswordInput
