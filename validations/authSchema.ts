// yup resolver is used for validate the fields 

import * as yup from "yup"

// signup validation schema
export const registerSchema = yup
  .object({
    name: yup.string().required().min(3).max(30),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(30).required(),
    password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm password is not matched") // to check the password and confirm password match or not
    .required()
  })
  .required()

export type registerType = yup.InferType<typeof registerSchema> // to define the type of registerSchema

// login validation schema
export const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(30).required(),
  })
  .required()

export type loginType = yup.InferType<typeof loginSchema> 