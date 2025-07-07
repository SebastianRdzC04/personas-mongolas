import vine from '@vinejs/vine'

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().maxLength(254),
    password: vine.string().minLength(8),
  })
)

export const registerUserValidator = vine.compile(
    vine.object({
        fullName: vine.string().trim().maxLength(255),
        email: vine.string().email().trim().maxLength(254),
        password: vine.string().minLength(8),
    })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().maxLength(255).optional(),
    email: vine.string().email().trim().maxLength(254).optional(),
  })
)