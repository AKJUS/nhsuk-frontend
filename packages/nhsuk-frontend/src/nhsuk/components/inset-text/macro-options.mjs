import { components } from '@nhsuk/frontend-lib'

export const name = 'Inset text'

/**
 * Nunjucks macro option params
 *
 * @satisfies {{ [param: string]: MacroParam }}
 */
export const params = {
  text: {
    type: 'string',
    required: true,
    description:
      'Text content to be used within the inset text component. If `html` is provided, the `text` argument will be ignored.'
  },
  html: {
    type: 'string',
    required: true,
    description:
      'HTML content to be used within the inset text component. If `html` is provided, the `text` argument will be ignored.'
  },
  caller: {
    type: 'nunjucks-block',
    required: false,
    description:
      'Not strictly a parameter but a Nunjucks code convention. Using a `call` block enables you to call a macro with all the text inside the tag. This is helpful if you want to pass a lot of content into a macro. To use it, you will need to wrap the entire inset text component in a `call` block.'
  },
  classes: {
    type: 'string',
    required: false,
    description: 'Classes to add to the inset text.'
  },
  attributes: {
    type: 'object',
    required: false,
    description:
      'HTML attributes (for example data attributes) to add to the inset text.'
  }
}

export const options = components.getMacroOptions(params)

/**
 * @import { MacroParam } from '@nhsuk/frontend-lib/components.mjs'
 */
