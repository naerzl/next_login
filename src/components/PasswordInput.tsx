import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import React from "react"

const PasswordInput = React.forwardRef(
  (props: { field?: any; trigger?: any; errors?: any }, ref) => {
    const { field, trigger, errors } = props
    const [showPassword, setShowPassword] = React.useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
    }
    const MyHelperText = ({ id }: { id: string }) => {
      return errors ? (
        <FormHelperText error id={id}>
          请正确填写密码
        </FormHelperText>
      ) : (
        <></>
      )
    }
    const handleBlur = () => {
      trigger(field.name)
    }
    return (
      <FormControl fullWidth className="mb-4">
        <InputLabel htmlFor="outlined-adornment-password" error={errors ? true : false}>
          密码
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          fullWidth
          {...field}
          error={errors ? true : false}
          ref={ref}
          onBlur={handleBlur}
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
        <MyHelperText id="outlined-adornment-password" />
      </FormControl>
    )
  },
)

PasswordInput.displayName = "PasswordInput"
export default PasswordInput
