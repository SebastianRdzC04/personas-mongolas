import type { HttpContext } from '@adonisjs/core/http'

import { createPersonValidator, updatePersonValidator } from '#validators/person'
import Person from '#models/person'
import Log from '../mongo_models/Log.js'
import { Gender } from '#models/person'


export default class PeopleController {
  /**
   * Display a list of resource
   */
  async index({ response, auth }: HttpContext) {
    const people = await Person.query().orderBy('createdAt', 'desc')

    await Log.create({
        userId: auth.user?.id || null,
        action: 'read_all',
        description: `el usuario ${auth.user?.fullName || 'desconocido'} ha consultado todas las personas`,
    })

    return response.ok({
      message: 'People retrieved successfully',
      people: people.map(person => (person)),
    })
  }

  
  async show({ params, response, auth }: HttpContext) {
    const person = await Person.findOrFail(params.id)

    await Log.create({
        personId: person.id,
        action: 'read',
        description: `el usuario ${auth.user?.fullName || 'desconocido'} ha consultado una persona con ID ${person.id}`,
        userId: auth.user?.id || null,
    })

    return response.ok({
      message: 'Person found',
      person: person,
    })
  }

  async store({ request, response, auth }: HttpContext) {
    const data = request.all()
    const payload = await createPersonValidator.validate(data)

    const person = await Person.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      age: payload.age,
      gender: payload.gender as Gender,
    })

    await Log.create({
        userId: auth.user?.id || null,
        personId: person.id,
        action: 'create',
        description: `El usuario ${auth.user?.fullName || 'desconocido'} ha creado una persona con ID ${person.id}`,
    })

    return response.created({
      message: 'Person created successfully',
      person: {
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        age: person.age,
      },
    })
  }

  async update({ params, request, response, auth }: HttpContext) {
    const data = request.all()
    const payload = await updatePersonValidator.validate(data)

    const person = await Person.findOrFail(params.id)

    person.firstName = payload.firstName || person.firstName
    person.lastName = payload.lastName || person.lastName
    person.age = payload.age || person.age
    person.gender = payload.gender as Gender || person.gender as Gender

    await person.save()

    await Log.create({
        userId: auth.user?.id || null,
        personId: person.id,
        action: 'update',
        description: `El usuario ${auth.user?.fullName || 'desconocido'} ha actualizado una persona con ID ${person.id}`,
    })

    return response.ok({
      message: 'Person updated successfully',
      person: {
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        age: person.age,
      },
    })
  }


  async destroy({ params, response, auth }: HttpContext) {
    const person = await Person.findOrFail(params.id)

    await person.delete()

    await Log.create({
        userId: auth.user?.id || null,
        personId: person.id,
        action: 'delete',
        description: `El usuario ${auth.user?.fullName || 'desconocido'} ha eliminado una persona con ID ${person.id}`,
    })

    return response.ok(
      {
        message: 'Person deleted successfully'
      }
    )
  }

  async viewLogs({ response, auth }: HttpContext) {
    const logs = await Log.find().sort({ createdAt: -1 });

    return response.ok({
      message: 'Logs retrieved successfully',
      logs: logs.map(log => ({
        id: log.id,
        action: log.action,
        description: log.description,
        createdAt: log.createdAt,
      })),
    })
  }


}