import { Request, Response } from 'express';
import { GenderSequelize } from '../sequelize/gender.sequelize';

export const listGender = async (req: Request, res: Response) => {
  try {
    const genders = await GenderSequelize.findAll();
    return res.json(genders);
  }
  catch (e) {
    return res.status(404).json({
      message: 'Error',
      detail: e
    });
  }
}

export const getGender = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const gender = await GenderSequelize.findByPk(id);

    if (gender) {
      return res.json(gender);
    }

    return res.json({
      message: `El género no existe`
    })
  }
  catch (e) {
    return res.status(404).json({
      message: 'Error',
      detail: e
    });
  }
}

export const createGender = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;

    if (name === undefined) {
      return res.status(400).json({
        message: 'No se encontró ningun nombre'
      });
    }

    const gender = await GenderSequelize.create({name});

    return res.status(202).json(gender);
  }
  catch (e) {
    return res.status(404).json({
      message: 'Error',
      detail: e
    });
  }
}

export const updateGender = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const name = req.body.name;

    const gender = await GenderSequelize.findByPk(id);

    if (gender && name) {
      const updatedGender = await gender.update({name});

      return res.json(updatedGender);
    }

    return res.json({
      message: 'No se encontro datos que actualizar'
    });

  } catch (e) {
    return res.status(404).json({
      message: 'Error',
      detail: e
    });
  }
}