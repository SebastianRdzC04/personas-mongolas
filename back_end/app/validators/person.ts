import vine from '@vinejs/vine'

export const createPersonValidator = vine.compile(
    vine.object({
        firstName: vine.string().trim(),
        lastName: vine.string().trim(),
        age: vine.number().min(0).max(120),
        gender: vine.string().in(['male', 'female'])
    })
)

export const updatePersonValidator = vine.compile(
    vine.object({
        firstName: vine.string().trim().optional(),
        lastName: vine.string().trim().optional(),
        age: vine.number().min(0).max(120).optional(),
        gender: vine.string().in(['male', 'female']).optional()
    })
)


