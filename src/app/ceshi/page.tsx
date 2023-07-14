"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

interface FormInputs {
  singleErrorInput: string
}

export default function Ceshi() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>()
  const onSubmit = (data: FormInputs) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("singleErrorInput", { required: "不是错" })} />
      <ErrorMessage errors={errors} name="singleErrorInput" />

      <ErrorMessage
        errors={errors}
        name="singleErrorInput"
        render={({ message }) => {
          console.log(message)
          return <p>{message}</p>
        }}
      />

      <input type="submit" />
    </form>
  )
}
