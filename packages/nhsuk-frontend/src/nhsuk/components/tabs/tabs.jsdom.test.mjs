import { components } from '@nhsuk/frontend-lib'
import {
  createEvent,
  fireEvent,
  getByRole,
  getAllByRole
} from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'

import { examples } from './macro-options.mjs'
import { Tabs, initTabs } from './tabs.mjs'

const user = userEvent.setup()

describe('Tabs', () => {
  /** @type {HTMLElement} */
  let $root

  /** @type {HTMLElement} */
  let $list

  /** @type {HTMLElement[]} */
  let $listItems

  /** @type {HTMLAnchorElement[]} */
  let $tabs

  /** @type {HTMLElement[]} */
  let $panels

  beforeEach(() => {
    document.body.innerHTML = components.render('tabs', examples.default)

    $root = /** @type {HTMLElement} */ (
      document.querySelector(`[data-module="${Tabs.moduleName}"]`)
    )

    $list = getByRole($root, 'list')
    $listItems = getAllByRole($root, 'listitem')
    $tabs = getAllByRole($root, 'link')

    $panels = /** @type {HTMLElement[]} */ ([
      ...document.querySelectorAll('.nhsuk-tabs__panel')
    ])

    $tabs.forEach(($tab) => jest.spyOn($tab, 'addEventListener'))
    jest.spyOn(window, 'addEventListener')
  })

  describe('Initialisation via init function', () => {
    it('should add event listeners', () => {
      initTabs()

      expect(window.addEventListener).toHaveBeenCalledWith(
        'hashchange',
        expect.any(Function),
        true
      )

      for (const $tab of $tabs) {
        expect($tab.addEventListener).toHaveBeenNthCalledWith(
          1,
          'click',
          expect.any(Function),
          true
        )

        expect($tab.addEventListener).toHaveBeenNthCalledWith(
          2,
          'keydown',
          expect.any(Function),
          true
        )
      }
    })

    it('should throw with missing tab links', () => {
      for (const $tab of $tabs) {
        $tab.remove()
      }

      expect(() => initTabs()).toThrow(
        `${Tabs.moduleName}: Links (\`<a class="nhsuk-tabs__tab">\`) not found`
      )
    })

    it('should throw with missing list', () => {
      // Change selector instead of removing to ensure links are still found
      $list.classList.remove('nhsuk-tabs__list')
      $list.classList.add('nhsuk-tabs__typo')

      expect(() => initTabs()).toThrow(
        `${Tabs.moduleName}: List (\`<ul class="nhsuk-tabs__list">\`) not found`
      )
    })

    it('should throw with missing list items', () => {
      // Change selector instead of removing to ensure links are still found
      for (const $listItem of $listItems) {
        $listItem.classList.remove('nhsuk-tabs__list-item')
        $listItem.classList.add('nhsuk-tabs__typo')
      }

      expect(() => initTabs()).toThrow(
        'List items (`<li class="nhsuk-tabs__list-item">`) not found'
      )
    })

    it('should not throw with empty body', () => {
      document.body.innerHTML = ''
      expect(() => initTabs()).not.toThrow()
    })

    it('should not throw with empty scope', () => {
      const scope = document.createElement('div')
      expect(() => initTabs({ scope })).not.toThrow()
    })
  })

  describe('Initialisation via class', () => {
    it('should not throw with $root element', () => {
      expect(() => new Tabs($root)).not.toThrow()
    })

    it('should throw with unsupported browser', () => {
      document.body.classList.remove('nhsuk-frontend-supported')

      expect(() => new Tabs($root)).toThrow(
        'NHS.UK frontend is not supported in this browser'
      )
    })

    it('should throw with missing breakpoint CSS property', () => {
      document.documentElement.style.removeProperty('--nhsuk-breakpoint-tablet')

      expect(() => new Tabs($root)).toThrow(
        `${Tabs.moduleName}: CSS custom property (\`--nhsuk-breakpoint-tablet\`) on pseudo-class \`:root\` not found`
      )
    })

    it('should throw with missing $root element', () => {
      expect(() => new Tabs()).toThrow(
        `${Tabs.moduleName}: Root element (\`$root\`) not found`
      )
    })

    it('should throw with wrong $root element type', () => {
      const $svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

      expect(() => new Tabs($svg)).toThrow(
        `${Tabs.moduleName}: Root element (\`$root\`) is not of type HTMLElement`
      )
    })

    it('should throw when initialised twice', () => {
      expect(() => {
        new Tabs($root)
        new Tabs($root)
      }).toThrow(
        `${Tabs.moduleName}: Root element (\`$root\`) already initialised`
      )
    })
  })

  describe('Accessibility (mobile)', () => {
    beforeEach(() => {
      jest.mocked(window.matchMedia).mockImplementationOnce((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        addEventListener: jest.fn(),
        removeListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))

      initTabs()
    })

    it('should not add accessible name and role', () => {
      expect($list).not.toHaveAttribute('role')

      for (const $tab of $tabs) {
        const index = $tabs.indexOf($tab)
        const $item = $listItems.at(index)
        const $panel = $panels.at(index)

        expect($item).not.toHaveAttribute('role')

        expect($tab).not.toHaveAttribute('id')
        expect($tab).not.toHaveAttribute('role')
        expect($tab).not.toHaveAttribute('aria-controls')

        expect($panel).not.toHaveAttribute('role')
        expect($panel).not.toHaveAttribute('aria-labelledby')
      }
    })
  })

  describe('Accessibility (tablet, desktop)', () => {
    beforeEach(() => {
      initTabs()
    })

    it('should add accessible name and role', () => {
      expect($list).toHaveAttribute('role', 'tablist')

      for (const $tab of $tabs) {
        const index = $tabs.indexOf($tab)
        const $item = $listItems.at(index)
        const $panel = $panels.at(index)

        expect($item).toHaveAttribute('role', 'presentation')

        // Panel is controlled by the tab link
        expect($tab).toHaveAttribute('id')
        expect($tab).toHaveAttribute('role', 'tab')
        expect($tab).toHaveAttribute('aria-controls', $panel.id)

        // Panel is labelled by the tab link
        expect($panel).toHaveAttribute('role', 'tabpanel')
        expect($panel).toHaveAttribute('aria-labelledby', $tab.id)
      }
    })
  })

  describe('Panel content', () => {
    beforeEach(() => {
      window.location.hash = ''

      initTabs()
    })

    it('should be hidden except for first tab', () => {
      const $tab = $tabs.at(0)
      const $panel = $panels.at(0)
      const $panelsHidden = $panels.filter(
        ($currentPanel) => $currentPanel !== $panel
      )

      // First panel visible
      expect($tab).toHaveAttribute('aria-selected', 'true')
      expect($panel).not.toHaveClass('nhsuk-tabs__panel--hidden')
      expect($panelsHidden).toHaveLength(2)

      for (const $panelHidden of $panelsHidden) {
        const index = $panels.indexOf($panelHidden)
        const $tabHidden = $tabs.at(index)

        // Other panels hidden
        expect($tabHidden).not.toHaveAttribute('aria-selected', 'true')
        expect($panelHidden).toHaveClass('nhsuk-tabs__panel--hidden')
      }
    })

    it.each(['#example1', '#example1', '#example1'])(
      'should be hidden except for first tab with unknown %s hash',
      (selector) => {
        window.location.hash = selector

        const $tab = $tabs.at(0)
        const $panel = $panels.at(0)
        const $panelsHidden = $panels.filter(
          ($currentPanel) => $currentPanel !== $panel
        )

        // Trigger hash change
        fireEvent(window, createEvent('hashchange', window))

        // First panel visible
        expect($tab).toHaveAttribute('aria-selected', 'true')
        expect($panel).not.toHaveClass('nhsuk-tabs__panel--hidden')
        expect($panelsHidden).toHaveLength(2)

        for (const $panelHidden of $panelsHidden) {
          const index = $panels.indexOf($panelHidden)
          const $tabHidden = $tabs.at(index)

          // Other panels hidden
          expect($tabHidden).not.toHaveAttribute('aria-selected', 'true')
          expect($panelHidden).toHaveClass('nhsuk-tabs__panel--hidden')
        }
      }
    )

    it.each(['#tab-one', '#tab-two', '#tab-three'])(
      'should be visible when %s is active',
      (selector) => {
        window.location.hash = selector

        const $tab = document.querySelector(`a[href="${selector}"]`)
        const $panel = document.querySelector(selector)
        const $panelsHidden = $panels.filter(
          ($currentPanel) => $currentPanel !== $panel
        )

        // Trigger hash change
        fireEvent(window, createEvent('hashchange', window))

        // Active panel visible
        expect($tab).toHaveAttribute('aria-selected', 'true')
        expect($panel).not.toHaveClass('nhsuk-tabs__panel--hidden')
        expect($panelsHidden).toHaveLength(2)

        for (const $panelHidden of $panelsHidden) {
          const index = $panels.indexOf($panelHidden)
          const $tabHidden = $tabs.at(index)

          // Other panels hidden
          expect($tabHidden).not.toHaveAttribute('aria-selected', 'true')
          expect($panelHidden).toHaveClass('nhsuk-tabs__panel--hidden')
        }
      }
    )

    it.each(['#tab-one', '#tab-two', '#tab-three'])(
      'should be visible when %s is clicked',
      (selector) => {
        const $tab = document.querySelector(`a[href="${selector}"]`)
        const $panel = document.querySelector(selector)
        const $panelsHidden = $panels.filter(
          ($currentPanel) => $currentPanel !== $panel
        )

        $tab.click()

        // Clicked panel visible
        expect($tab).toHaveAttribute('aria-selected', 'true')
        expect($panel).not.toHaveClass('nhsuk-tabs__panel--hidden')
        expect($panelsHidden).toHaveLength(2)

        for (const $panelHidden of $panelsHidden) {
          const index = $panels.indexOf($panelHidden)
          const $tabHidden = $tabs.at(index)

          // Other panels hidden
          expect($tabHidden).not.toHaveAttribute('aria-selected', 'true')
          expect($panelHidden).toHaveClass('nhsuk-tabs__panel--hidden')
        }
      }
    )

    it('should move to next panel using right arrow key', async () => {
      $tabs.at(0).click()
      await user.keyboard('[ArrowRight]')

      // Activated 2nd tab panel
      expect($tabs.at(1)).toHaveAttribute('aria-selected', 'true')
      expect($panels.at(1)).not.toHaveClass('nhsuk-tabs__panel--hidden')

      await user.keyboard('[ArrowRight]')

      // Activated 3rd tab panel
      expect($tabs.at(2)).toHaveAttribute('aria-selected', 'true')
      expect($panels.at(2)).not.toHaveClass('nhsuk-tabs__panel--hidden')
    })

    it('should not move to next panel using right arrow key (last tab)', async () => {
      $tabs.at(2).click()
      await user.keyboard('[ArrowRight]')

      // Stuck on last tab panel
      expect($tabs.at(2)).toHaveAttribute('aria-selected', 'true')
      expect($panels.at(2)).not.toHaveClass('nhsuk-tabs__panel--hidden')

      await user.keyboard('[ArrowRight]')

      // Stuck on last tab panel (no change)
      expect($tabs.at(2)).toHaveAttribute('aria-selected', 'true')
      expect($panels.at(2)).not.toHaveClass('nhsuk-tabs__panel--hidden')
    })

    it('should move to previous panel using left arrow key', async () => {
      $tabs.at(2).click()
      await user.keyboard('[ArrowLeft]')

      // Activated 2nd tab panel
      expect($tabs.at(1)).toHaveAttribute('aria-selected', 'true')
      expect($panels.at(1)).not.toHaveClass('nhsuk-tabs__panel--hidden')

      await user.keyboard('[ArrowLeft]')

      // Activated first tab panel
      expect($tabs.at(0)).toHaveAttribute('aria-selected', 'true')
      expect($panels.at(0)).not.toHaveClass('nhsuk-tabs__panel--hidden')
    })

    it('should not move to previous panel using left arrow key (first tab)', async () => {
      $tabs.at(0).click()
      await user.keyboard('[ArrowLeft]')

      // Stuck on first tab panel
      expect($tabs.at(0)).toHaveAttribute('aria-selected', 'true')
      expect($panels.at(0)).not.toHaveClass('nhsuk-tabs__panel--hidden')

      await user.keyboard('[ArrowLeft]')

      // Stuck on first tab panel (no change)
      expect($tabs.at(0)).toHaveAttribute('aria-selected', 'true')
      expect($panels.at(0)).not.toHaveClass('nhsuk-tabs__panel--hidden')
    })
  })
})
