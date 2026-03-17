import { z } from 'zod'

export const internalRegistrationSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  roll_number: z.string().min(5, 'Enter a valid roll number'),
  department: z.string().min(1, 'Select your department'),
  year: z.number().min(1).max(4, 'Year must be between 1 and 4'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Enter a valid email address'),
})

export const externalRegistrationSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  college_name: z.string().min(2, 'Enter your college name'),
  course: z.string().min(1, 'Select your course'),
  year: z.number().min(1).max(4, 'Year must be between 1 and 4'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Enter a valid email address'),
  ambassador_code: z.string().optional(),
})

export const ambassadorApplicationSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  college_name: z.string().min(2, 'Enter your college name'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Enter a valid email address'),
})

export type InternalRegistrationInput = z.infer<typeof internalRegistrationSchema>
export type ExternalRegistrationInput = z.infer<typeof externalRegistrationSchema>
export type AmbassadorApplicationInput = z.infer<typeof ambassadorApplicationSchema>
