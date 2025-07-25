import { components } from '@nhsuk/frontend-lib'

export const name = 'Header'

/**
 * Nunjucks macro option params
 *
 * @satisfies {{ [param: string]: MacroParam }}
 */
export const params = {
  logo: {
    type: 'object',
    required: false,
    description: 'Object containing options for the logo',
    params: {
      href: {
        type: 'string',
        required: false,
        description:
          'The `href` of the link for the logo. If not set, and a `service.href` is set, or both are set to same value, then the logo and service name will be combined into a single link.'
      },
      src: {
        type: 'string',
        required: false,
        description:
          'The path of the logo image, if you are not using the default NHS logo.'
      },
      ariaLabel: {
        type: 'string',
        required: false,
        description:
          "The `aria-label` for the logo. Defaults to `'NHS homepage'`"
      }
    }
  },
  service: {
    type: 'object',
    required: false,
    description: 'Object containing options for the service name.',
    params: {
      text: {
        type: 'string',
        required: false,
        description: 'The text to use for the service name.'
      },
      href: {
        type: 'string',
        required: false,
        description: 'The `href` of the link for the service name.'
      }
    }
  },
  organisation: {
    type: 'object',
    required: false,
    description: 'Settings for header with organisational logo.',
    params: {
      name: {
        type: 'string',
        required: false,
        description: 'Organisation name.'
      },
      split: {
        type: 'string',
        required: false,
        description:
          'Longer organisation names can be split onto multiple lines.'
      },
      descriptor: {
        type: 'string',
        required: false,
        description: 'Organisation descriptor.'
      }
    }
  },
  navigation: {
    type: 'object',
    required: false,
    description: 'Object containing settings for the primary navigation.',
    params: {
      items: {
        type: 'array',
        required: false,
        description: 'Array of navigation links for use in the header.',
        params: {
          href: {
            type: 'string',
            required: true,
            description: 'The href of a navigation item in the header.'
          },
          text: {
            type: 'string',
            required: true,
            description:
              'If `html` is set, this is not required. Text for the navigation item. If `html` is provided, the `text` argument will be ignored.'
          },
          html: {
            type: 'string',
            required: true,
            description:
              'If `text` is set, this is not required. HTML for the navigation item. If `html` is provided, the `text` argument will be ignored.'
          },
          current: {
            type: 'boolean',
            required: false,
            description:
              'Set to true if this links to the current page being shown.'
          },
          active: {
            type: 'boolean',
            required: false,
            description:
              "Set to true if the current page is within this section, but the link doesn't necessarily link to the current page"
          },
          classes: {
            type: 'string',
            required: false,
            description: 'Classes to add to the list item containing the link.'
          },
          attributes: {
            type: 'object',
            required: false,
            description:
              'HTML attributes (for example data attributes) to add to the list item containing the link.'
          }
        }
      },
      ariaLabel: {
        type: 'string',
        required: false,
        description:
          "The `aria-label` for the primary navigation. Defaults to `'Menu'`"
      },
      classes: {
        type: 'string',
        required: false,
        description: 'Classes to add to the primary navigation.'
      },
      attributes: {
        type: 'object',
        required: false,
        description:
          'HTML attributes (for example data attributes) to add to the primary navigation.'
      }
    }
  },
  search: {
    type: 'object',
    required: false,
    description: 'Object containing settings for a search box',
    params: {
      action: {
        type: 'string',
        required: false,
        description:
          "The search action endpoint. Defaults to `'https://www.nhs.uk/search'`"
      },
      name: {
        type: 'string',
        required: false,
        description: "The name for the search field. Defaults to `'q'`"
      },
      placeholder: {
        type: 'string',
        required: false,
        description:
          "The placeholder text for the search field. Defaults to `'Search'`"
      },
      visuallyHiddenLabel: {
        type: 'string',
        required: false,
        description:
          "The label for the search field. Defaults to `'Search the NHS website'`"
      },
      visuallyHiddenButton: {
        type: 'string',
        required: false,
        description:
          "The label for the visually hidden button. Defaults to `'Search'`"
      }
    }
  },
  account: {
    type: 'object',
    required: false,
    description:
      'Object containing settings for the account section of the header.',
    params: {
      items: {
        type: 'array',
        required: false,
        description: 'Array of account items for use in the header.',
        params: {
          href: {
            type: 'string',
            required: false,
            description: 'The href of an account item in the header.'
          },
          text: {
            type: 'string',
            required: true,
            description:
              'If `html` is set, this is not required. Text for the account item. If `html` is provided, the `text` argument will be ignored.'
          },
          html: {
            type: 'string',
            required: true,
            description:
              'If `text` is set, this is not required. HTML for the account item. If `html` is provided, the `text` argument will be ignored.'
          },
          icon: {
            type: 'boolean',
            required: false,
            description:
              'Whether to include the account icon for the account item. Defaults to `false`.'
          },
          action: {
            type: 'string',
            required: false,
            description:
              'If set, the item will become a button wrapped in a form with the action given. Useful for log out buttons.'
          },
          method: {
            type: 'string',
            required: false,
            description:
              "The value to use for the `method` of the form if `action` is set. Defaults to `'post'`"
          }
        }
      },
      ariaLabel: {
        type: 'string',
        required: false,
        description:
          "The `aria-label` for the account navigation. Defaults to `'Account'`"
      },
      classes: {
        type: 'string',
        required: false,
        description: 'Classes to add to the account navigation.'
      },
      attributes: {
        type: 'object',
        required: false,
        description:
          'HTML attributes (for example data attributes) to add to the account navigation.'
      }
    }
  },
  baseUrl: {
    type: 'string',
    required: false,
    description: 'Base URL to prepend to the `logo.src` path.'
  },
  containerClasses: {
    type: 'string',
    required: false,
    description:
      'Classes to add to the header container, useful if you want to make the header fixed width.'
  },
  classes: {
    type: 'string',
    required: false,
    description: 'Classes to add to the header container.'
  },
  attributes: {
    type: 'object',
    required: false,
    description:
      'HTML attributes (for example data attributes) to add to the header container.'
  }
}

/**
 * Nunjucks macro option examples
 *
 @satisfies {{ [example: string]: MacroExample }}
 */
export const examples = {
  'default': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#'
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'with navigation': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#'
      },
      navigation: {
        items: [
          {
            href: '#',
            text: 'Health A to Z'
          },
          {
            href: '#',
            text: 'Live Well'
          },
          {
            href: '#',
            text: 'Mental health'
          },
          {
            href: '#',
            text: 'Care and support'
          },
          {
            href: '#',
            text: 'Pregnancy'
          },
          {
            href: '#',
            text: 'NHS services'
          }
        ]
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'with navigation overflow': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#'
      },
      navigation: {
        items: [
          {
            href: '#',
            text: 'Health A to Z'
          },
          {
            href: '#',
            text: 'Live Well'
          },
          {
            href: '#',
            text: 'Mental health'
          },
          {
            href: '#',
            text: 'Care and support'
          },
          {
            href: '#',
            text: 'Pregnancy',
            active: true
          },
          {
            href: '#',
            text: 'NHS services'
          },
          {
            href: '#',
            text: 'Another item #1'
          },
          {
            href: '#',
            text: 'Another item #2'
          }
        ]
      }
    }
  },
  'with navigation (white)': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#'
      },
      navigation: {
        classes: 'nhsuk-header__navigation--white',
        items: [
          {
            href: '#',
            text: 'Health A to Z'
          },
          {
            href: '#',
            text: 'Live Well'
          },
          {
            href: '#',
            text: 'Mental health'
          },
          {
            href: '#',
            text: 'Care and support'
          },
          {
            href: '#',
            text: 'Pregnancy'
          },
          {
            href: '#',
            text: 'NHS services'
          }
        ]
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'with search': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#'
      },
      search: true
    },
    screenshot: {
      name: 'search input',
      states: ['focus'],
      selector: '.nhsuk-header__search-input',
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'with logo': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#'
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'with logo unlinked': {
    layout: 'layouts/example-full-width.njk',
    context: {},
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'with account (logged in)': {
    layout: 'layouts/example-full-width.njk',
    context: {
      service: {
        href: '#',
        text: 'Manage patients'
      },
      account: {
        items: [
          {
            href: '#',
            text: 'florence.nightingale@nhs.net',
            icon: true
          },
          {
            action: '#',
            text: 'Log out'
          }
        ]
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'with account (logged out)': {
    layout: 'layouts/example-full-width.njk',
    context: {
      service: {
        href: '#',
        text: 'Manage patients'
      },
      account: {
        items: [
          {
            href: '#',
            text: 'Log in'
          }
        ]
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'with account, search, navigation (logged in, complex)': {
    layout: 'layouts/example-full-width.njk',
    context: {
      service: {
        href: '#',
        text: 'Manage patients'
      },
      search: {
        placeholder: 'Name or NHS number',
        visuallyHiddenLabel: 'Search patients by name or NHS number'
      },
      account: {
        items: [
          {
            href: '#',
            text: 'Florence Nightingale',
            icon: true
          },
          {
            text: 'Regional Manager, Hull and East Yorkshire Hospitals NHS Trust'
          },
          {
            href: '#',
            text: 'Change role'
          },
          {
            action: '#',
            text: 'Log out'
          }
        ]
      },
      navigation: {
        items: [
          {
            href: '#',
            text: 'Home'
          },
          {
            href: '#',
            text: 'Create user'
          },
          {
            href: '#',
            text: 'Find user'
          }
        ]
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'with service name, account, search and navigation': {
    layout: 'layouts/example-full-width.njk',
    context: {
      service: {
        text: 'Search patient directory',
        href: '#'
      },
      search: {
        placeholder: 'Name or NHS number',
        visuallyHiddenLabel: 'Search patients by name or NHS number'
      },
      account: {
        items: [
          {
            text: 'Florence Nightingale',
            icon: true
          },
          {
            action: '#',
            text: 'Log out'
          }
        ]
      },
      navigation: {
        items: [
          {
            href: '#',
            text: 'Home'
          },
          {
            href: '#',
            text: 'Patient list'
          },
          {
            href: '#',
            text: 'Advanced search'
          },
          {
            href: '#',
            text: 'Help guides'
          }
        ]
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'with service name, account, search and navigation (white)': {
    layout: 'layouts/example-full-width.njk',
    context: {
      service: {
        text: 'Search patient directory',
        href: '#'
      },
      search: {
        placeholder: 'Name or NHS number',
        visuallyHiddenLabel: 'Search patients by name or NHS number'
      },
      account: {
        items: [
          {
            text: 'Florence Nightingale',
            icon: true
          },
          {
            action: '#',
            text: 'Log out'
          }
        ]
      },
      navigation: {
        classes: 'nhsuk-header__navigation--white',
        items: [
          {
            href: '#',
            text: 'Home'
          },
          {
            href: '#',
            text: 'Patient list'
          },
          {
            href: '#',
            text: 'Advanced search'
          },
          {
            href: '#',
            text: 'Help guides'
          }
        ]
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'with service name, search and navigation': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#'
      },
      service: {
        text: 'Digital service manual',
        href: '#'
      },
      search: {
        visuallyHiddenLabel: 'Search the NHS digital service manual'
      },
      navigation: {
        items: [
          {
            href: '#',
            text: 'Standards and technology'
          },
          {
            href: '#',
            text: 'Design system',
            current: true
          },
          {
            href: '#',
            text: 'Content style guide'
          },
          {
            href: '#',
            text: 'Accessibility'
          },
          {
            href: '#',
            text: 'Community and contribution'
          }
        ]
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'with service name, search and navigation (white)': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#'
      },
      service: {
        text: 'Digital service manual',
        href: '#'
      },
      search: {
        visuallyHiddenLabel: 'Search the NHS digital service manual'
      },
      navigation: {
        classes: 'nhsuk-header__navigation--white',
        items: [
          {
            href: '#',
            text: 'Standards and technology'
          },
          {
            href: '#',
            text: 'Design system',
            current: true
          },
          {
            href: '#',
            text: 'Content style guide'
          },
          {
            href: '#',
            text: 'Accessibility'
          },
          {
            href: '#',
            text: 'Community and contribution'
          }
        ]
      }
    }
  },
  'with service name logo separate, search': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#nhs',
        ariaLabel: 'NHS homepage'
      },
      service: {
        text: 'Find your NHS number',
        href: '#'
      },
      search: {}
    },
    screenshot: [
      {
        states: ['hover', 'focus'],
        selector: '.nhsuk-header__service-name',
        viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
      },
      {
        name: 'logo',
        states: ['hover', 'focus'],
        selector: '.nhsuk-header__service-logo',
        viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
      }
    ]
  },
  'with service name logo separate, search (long service name)': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#nhs',
        ariaLabel: 'NHS homepage'
      },
      service: {
        text: 'This is a long service name',
        href: '#'
      },
      search: {}
    }
  },
  'with service name logo separate, search (longer service name)': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#nhs',
        ariaLabel: 'NHS homepage'
      },
      service: {
        text: 'This is an even longer service name to fully test wrapping',
        href: '#'
      },
      search: {}
    }
  },
  'with service name logo combo, search': {
    layout: 'layouts/example-full-width.njk',
    context: {
      service: {
        text: 'Prototype kit',
        href: '#'
      },
      search: {
        visuallyHiddenLabel: 'Search the NHS digital service manual'
      }
    },
    screenshot: [
      {
        viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
      },
      {
        name: 'logo',
        states: ['hover', 'focus'],
        selector: '.nhsuk-header__service-logo',
        viewports: ['desktop']
      }
    ]
  },
  'with service name unlinked, search': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#',
        ariaLabel: 'NHS homepage'
      },
      service: {
        text: 'Find your NHS number'
      },
      search: {}
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'with navigation (justified)': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#'
      },
      navigation: {
        classes: 'nhsuk-header__navigation--justified',
        items: [
          {
            href: '#',
            text: 'Health A to Z'
          },
          {
            href: '#',
            text: 'Live Well'
          },
          {
            href: '#',
            text: 'Mental health'
          },
          {
            href: '#',
            text: 'Care and support'
          },
          {
            href: '#',
            text: 'Pregnancy'
          },
          {
            href: '#',
            text: 'NHS services'
          }
        ]
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'organisational with search': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#'
      },
      organisation: {
        name: 'Anytown Anyplace',
        split: 'Anywhere',
        descriptor: 'NHS Foundation Trust'
      },
      search: {
        visuallyHiddenLabel: 'Search the Anytown Anyplace Anywhere website'
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'organisational with search, navigation': {
    layout: 'layouts/example-full-width.njk',
    context: {
      logo: {
        href: '#'
      },
      organisation: {
        name: 'Anytown Anyplace',
        split: 'Anywhere',
        descriptor: 'NHS Foundation Trust'
      },
      search: {
        visuallyHiddenLabel: 'Search the Anytown Anyplace Anywhere website'
      },
      navigation: {
        items: [
          {
            href: '#',
            text: 'Your hospital visit'
          },
          {
            href: '#',
            text: 'Wards and departments',
            active: true
          },
          {
            href: '#',
            text: 'Conditions and treatments'
          },
          {
            href: '#',
            text: 'Our people'
          },
          {
            href: '#',
            text: 'Join our team'
          }
        ]
      }
    }
  },
  'organisational white with service name logo separate, search': {
    layout: 'layouts/example-full-width.njk',
    context: {
      classes: 'nhsuk-header--white',
      logo: {
        href: '#nhs',
        ariaLabel: 'NHS homepage'
      },
      service: {
        text: 'Find your NHS number',
        href: '#'
      },
      search: {}
    },
    screenshot: [
      {
        viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
      },
      {
        states: ['hover', 'focus'],
        selector: '.nhsuk-header__service-name',
        viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
      },
      {
        name: 'logo',
        states: ['hover', 'focus'],
        selector: '.nhsuk-header__service-logo',
        viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
      }
    ]
  },
  'organisational white with service name logo combo, search': {
    layout: 'layouts/example-full-width.njk',
    context: {
      classes: 'nhsuk-header--white',
      service: {
        text: 'Prototype kit',
        href: '#'
      },
      search: {
        visuallyHiddenLabel: 'Search the NHS digital service manual'
      }
    }
  },
  'organisational white with service name unlinked, search': {
    layout: 'layouts/example-full-width.njk',
    context: {
      classes: 'nhsuk-header--white',
      logo: {
        href: '#',
        ariaLabel: 'NHS homepage'
      },
      service: {
        text: 'Find your NHS number'
      },
      search: {}
    }
  },
  'organisational white with navigation (justified)': {
    layout: 'layouts/example-full-width.njk',
    context: {
      classes: 'nhsuk-header--white',
      logo: {
        href: '#'
      },
      navigation: {
        classes: 'nhsuk-header__navigation--justified',
        items: [
          {
            href: '#',
            text: 'Health A to Z'
          },
          {
            href: '#',
            text: 'Live Well'
          },
          {
            href: '#',
            text: 'Mental health'
          },
          {
            href: '#',
            text: 'Care and support'
          },
          {
            href: '#',
            text: 'Pregnancy'
          },
          {
            href: '#',
            text: 'NHS services'
          }
        ]
      }
    }
  },
  'organisational white with search': {
    layout: 'layouts/example-full-width.njk',
    context: {
      classes: 'nhsuk-header--white',
      logo: {
        href: '#'
      },
      organisation: {
        name: 'Anytown Anyplace',
        split: 'Anywhere',
        descriptor: 'NHS Foundation Trust'
      },
      search: {
        visuallyHiddenLabel: 'Search the Anytown Anyplace Anywhere website'
      }
    },
    screenshot: [
      {
        viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
      },
      {
        name: 'logo',
        states: ['hover', 'focus'],
        selector: '.nhsuk-header__service-logo',
        viewports: ['desktop']
      },
      {
        name: 'search input',
        states: ['focus'],
        selector: '.nhsuk-header__search-input',
        viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
      }
    ]
  },
  'organisational white with search, navigation': {
    layout: 'layouts/example-full-width.njk',
    context: {
      classes: 'nhsuk-header--white',
      logo: {
        href: '#'
      },
      organisation: {
        name: 'Anytown Anyplace',
        split: 'Anywhere',
        descriptor: 'NHS Foundation Trust'
      },
      search: {
        visuallyHiddenLabel: 'Search the Anytown Anyplace Anywhere website'
      },
      navigation: {
        items: [
          {
            href: '#',
            text: 'Your hospital visit'
          },
          {
            href: '#',
            text: 'Wards and departments',
            active: true
          },
          {
            href: '#',
            text: 'Conditions and treatments'
          },
          {
            href: '#',
            text: 'Our people'
          },
          {
            href: '#',
            text: 'Join our team'
          }
        ]
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'organisational white with search, navigation (white)': {
    layout: 'layouts/example-full-width.njk',
    context: {
      classes: 'nhsuk-header--white',
      logo: {
        href: '#'
      },
      organisation: {
        name: 'Anytown Anyplace',
        split: 'Anywhere',
        descriptor: 'NHS Foundation Trust'
      },
      search: {
        visuallyHiddenLabel: 'Search the Anytown Anyplace Anywhere website'
      },
      navigation: {
        classes: 'nhsuk-header__navigation--white',
        items: [
          {
            href: '#',
            text: 'Your hospital visit'
          },
          {
            href: '#',
            text: 'Wards and departments',
            active: true
          },
          {
            href: '#',
            text: 'Conditions and treatments'
          },
          {
            href: '#',
            text: 'Our people'
          },
          {
            href: '#',
            text: 'Join our team'
          }
        ]
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'organisational white with account (logged in)': {
    layout: 'layouts/example-full-width.njk',
    context: {
      classes: 'nhsuk-header--white',
      service: {
        href: '#',
        text: 'Manage patients'
      },
      account: {
        items: [
          {
            href: '#',
            text: 'florence.nightingale@nhs.net',
            icon: true
          },
          {
            action: '#',
            text: 'Log out'
          }
        ]
      }
    },
    screenshot: {
      viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
    }
  },
  'organisational white with account (logged out)': {
    layout: 'layouts/example-full-width.njk',
    context: {
      classes: 'nhsuk-header--white',
      service: {
        href: '#',
        text: 'Manage patients'
      },
      account: {
        items: [
          {
            href: '#',
            text: 'Log in'
          }
        ]
      }
    }
  },
  'organisational white with search, navigation (custom logo)': {
    layout: 'layouts/example-full-width.njk',
    context: {
      classes: 'nhsuk-header--white',
      logo: {
        href: '#',
        src: '/nhsuk-frontend/assets/example-logo.svg',
        ariaLabel:
          'Great Ormond Street Hospital for Children, NHS Foundation Trust'
      },
      search: {
        visuallyHiddenLabel: 'Search the Great Ormond Street Hospital website'
      },
      navigation: {
        items: [
          {
            href: '#',
            text: 'Parents and families'
          },
          {
            href: '#',
            text: 'Wards and departments'
          },
          {
            href: '#',
            text: 'Conditions and treatments'
          },
          {
            href: '#',
            text: 'Learning'
          },
          {
            href: '#',
            text: 'Our research'
          },
          {
            href: '#',
            text: 'Our people'
          },
          {
            href: '#',
            text: 'Our children'
          },
          {
            href: '#',
            text: 'Hospital',
            active: true
          },
          {
            href: '#',
            text: 'Private care'
          },
          {
            href: '#',
            text: 'Charity'
          }
        ]
      }
    },
    screenshot: [
      {
        viewports: ['mobile', 'tablet', 'desktop', 'large-desktop']
      },
      {
        name: 'logo',
        states: ['hover', 'focus'],
        selector: '.nhsuk-header__service-logo'
      },
      {
        name: 'menu',
        states: ['click'],
        selector: '#toggle-menu',
        viewports: [
          'mobile',
          'tablet',
          'desktop',
          'large-desktop',
          'xlarge-desktop'
        ]
      }
    ]
  }
}

export const options = components.getMacroOptions(params)

/**
 * @import { MacroExample, MacroParam } from '@nhsuk/frontend-lib/components.mjs'
 */
