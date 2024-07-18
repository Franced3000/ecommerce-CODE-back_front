import { body, param, check } from 'express-validator';



export const userValidator = [
  body('name')
    .notEmpty()
    .withMessage('Il nome è obbligatorio')
    .isString()
    .withMessage('Il nome deve essere una stringa'),
  body('email')
    .notEmpty()
    .withMessage('L\'email è obbligatoria')
    .isEmail()
    .withMessage('Formato email non valido'),
  body('password')
    .notEmpty()
    .withMessage('La password è obbligatoria')
    .isLength({ min: 6 })
    .withMessage('La password deve essere lunga almeno 6 caratteri'),
];

export const idParamValidator = [
  param('id')
    .isInt()
    .withMessage('L\'ID deve essere un numero intero'),
];

const whitelistEmails = [
    'admin1@example.com',
    'admin2@example.com',
    'admin3@example.com'
  ];

export const adminRegisterValidator = [
    check('name')
      .notEmpty()
      .withMessage('Il nome è obbligatorio'),
    check('email')
      .isEmail()
      .withMessage('L\'email fornita non è valida')
      .custom(email => {
        if (!whitelistEmails.includes(email)) {
          throw new Error('Email non presente nella whitelist');
        }
        return true;
      }),
    check('password')
      .isLength({ min: 6 })
      .withMessage('La password deve essere almeno di 6 caratteri')
  ];

  export const adminValidator = [
    check('email')
      .custom(email => {
        if (!whitelistEmails.includes(email)) {
          throw new Error('Email non presente nella whitelist');
        }
        return true;
      })
  ];