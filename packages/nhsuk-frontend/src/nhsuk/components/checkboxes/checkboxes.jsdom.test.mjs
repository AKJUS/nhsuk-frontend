import { components } from '@nhsuk/frontend-lib'
import { getByRole } from '@testing-library/dom'
import { outdent } from 'outdent'

import { initCheckboxes } from './checkboxes.mjs'

describe('Checkboxes', () => {
  /** @type {HTMLDivElement[]} */
  let $conditionals

  /** @type {HTMLInputElement[]} */
  let $inputs

  beforeEach(() => {
    const emailHtml = components.render('input', {
      context: {
        id: 'email',
        name: 'email',
        classes: 'nhsuk-u-width-two-thirds',
        label: {
          text: 'Email address'
        }
      }
    })

    const phoneHtml = components.render('input', {
      context: {
        id: 'phone',
        name: 'phone',
        classes: 'nhsuk-u-width-two-thirds',
        label: {
          text: 'Phone number'
        }
      }
    })

    const mobileHtml = components.render('input', {
      context: {
        id: 'mobile',
        name: 'mobile',
        classes: 'nhsuk-u-width-two-thirds',
        label: {
          text: 'Mobile phone number'
        }
      }
    })

    document.body.innerHTML = outdent`
      <form method="post" novalidate>
        ${components.render('checkboxes', {
          context: {
            idPrefix: 'contact',
            name: 'contact',
            fieldset: {
              legend: {
                text: 'How would you prefer to be contacted?',
                classes: 'nhsuk-fieldset__legend--l',
                isPageHeading: 'true'
              }
            },
            hint: {
              text: 'Select all options that are relevant to you'
            },
            items: [
              {
                value: 'email',
                text: 'Email',
                conditional: {
                  html: emailHtml
                }
              },
              {
                value: 'phone',
                text: 'Phone',
                conditional: {
                  html: phoneHtml
                }
              },
              {
                value: 'text',
                text: 'Text message',
                conditional: {
                  html: mobileHtml
                }
              }
            ]
          }
        })}
      </form>
    `

    const $container = document.querySelector('.nhsuk-checkboxes')

    $conditionals = [
      ...$container.querySelectorAll('.nhsuk-checkboxes__conditional')
    ]

    const $input1 = getByRole($container, 'checkbox', {
      name: 'Email'
    })

    const $input2 = getByRole($container, 'checkbox', {
      name: 'Phone'
    })

    const $input3 = getByRole($container, 'checkbox', {
      name: 'Text message'
    })

    $inputs = [$input1, $input2, $input3]

    jest.spyOn($input1, 'addEventListener')
    jest.spyOn($input2, 'addEventListener')
    jest.spyOn($input3, 'addEventListener')
  })

  describe('Initialisation', () => {
    it('should add event listeners', () => {
      initCheckboxes()

      for (const $input of $inputs) {
        expect($input.addEventListener).toHaveBeenCalledWith(
          'change',
          expect.any(Function)
        )
      }
    })

    it('should not throw with missing checkboxes', () => {
      for (const $input of $inputs) {
        $input.remove()
      }

      expect(() => initCheckboxes()).not.toThrow()
    })

    it('should not throw with empty body', () => {
      document.body.innerHTML = ''
      expect(() => initCheckboxes()).not.toThrow()
    })

    it('should not throw with empty scope', () => {
      const scope = document.createElement('div')
      expect(() => initCheckboxes({ scope })).not.toThrow()
    })
  })

  describe('Conditional content', () => {
    it('should be hidden by default', () => {
      initCheckboxes()

      for (const $input of $inputs) {
        const index = $inputs.indexOf($input)
        const $conditional = $conditionals.at(index)

        // Conditional content hidden
        expect($input).toHaveAttribute('aria-expanded', 'false')
        expect($conditional).toHaveClass(
          'nhsuk-checkboxes__conditional--hidden'
        )
      }
    })

    it('should be visible when input is checked', () => {
      initCheckboxes()

      for (const $input of $inputs) {
        const index = $inputs.indexOf($input)
        const $conditional = $conditionals.at(index)

        $input.click()

        // Conditional content visible
        expect($input).toHaveAttribute('aria-expanded', 'true')
        expect($conditional).not.toHaveClass(
          'nhsuk-checkboxes__conditional--hidden'
        )
      }
    })

    it('should be hidden when input is unchecked', () => {
      initCheckboxes()

      for (const $input of $inputs) {
        const index = $inputs.indexOf($input)
        const $conditional = $conditionals.at(index)

        $input.click()
        $input.click()

        // Conditional content hidden
        expect($input).toHaveAttribute('aria-expanded', 'false')
        expect($conditional).toHaveClass(
          'nhsuk-checkboxes__conditional--hidden'
        )
      }
    })
  })
})
