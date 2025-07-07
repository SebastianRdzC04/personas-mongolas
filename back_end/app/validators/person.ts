import vine from '@vinejs/vine'

export const createPersonValidator = vine.compile(
    vine.object({
        firstName: vine.string().trim(),
        lastName: vine.string().trim(),
        age: vine.number().min(0).max(120)
    })
)

export const updatePersonValidator = vine.compile(
    vine.object({
        firstName: vine.string().trim().optional(),
        lastName: vine.string().trim().optional(),
        age: vine.number().min(0).max(120).optional()
    })
)


