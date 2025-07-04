import {
  initAll,
  initButtons,
  initCharacterCounts,
  initCheckboxes,
  initDetails,
  initErrorSummary,
  initHeader,
  initRadios,
  initSkipLinks,
  initTabs
} from './index.mjs'
import * as NHSUKFrontend from './index.mjs'

jest.mock('./components/button/button.mjs')
jest.mock('./components/character-count/character-count.mjs')
jest.mock('./components/checkboxes/checkboxes.mjs')
jest.mock('./components/details/details.mjs')
jest.mock('./components/error-summary/error-summary.mjs')
jest.mock('./components/header/header.mjs')
jest.mock('./components/radios/radios.mjs')
jest.mock('./components/skip-link/skip-link.mjs')
jest.mock('./components/tabs/tabs.mjs')

describe('NHS.UK frontend', () => {
  describe('Exports', () => {
    it('should export init all function', () => {
      expect(NHSUKFrontend).toHaveProperty('initAll')
    })

    it('should export init component functions', () => {
      expect(NHSUKFrontend).toHaveProperty('initButtons')
      expect(NHSUKFrontend).toHaveProperty('initCharacterCounts')
      expect(NHSUKFrontend).toHaveProperty('initCheckboxes')
      expect(NHSUKFrontend).toHaveProperty('initDetails')
      expect(NHSUKFrontend).toHaveProperty('initErrorSummary')
      expect(NHSUKFrontend).toHaveProperty('initHeader')
      expect(NHSUKFrontend).toHaveProperty('initRadios')
      expect(NHSUKFrontend).toHaveProperty('initSkipLinks')
      expect(NHSUKFrontend).toHaveProperty('initTabs')
    })
  })

  describe('initAll', () => {
    it('should init components', () => {
      initAll()

      expect(initButtons).toHaveBeenCalled()
      expect(initCharacterCounts).toHaveBeenCalled()
      expect(initCheckboxes).toHaveBeenCalled()
      expect(initDetails).toHaveBeenCalled()
      expect(initErrorSummary).toHaveBeenCalled()
      expect(initHeader).toHaveBeenCalled()
      expect(initRadios).toHaveBeenCalled()
      expect(initSkipLinks).toHaveBeenCalled()
      expect(initTabs).toHaveBeenCalled()
    })

    it('should init components (with scope)', () => {
      const scope = document

      initAll(scope)

      expect(initHeader).toHaveBeenCalled()
      expect(initSkipLinks).toHaveBeenCalled()

      expect(initButtons).toHaveBeenCalledWith({ scope })
      expect(initCharacterCounts).toHaveBeenCalledWith({ scope })
      expect(initCheckboxes).toHaveBeenCalledWith({ scope })
      expect(initDetails).toHaveBeenCalledWith({ scope })
      expect(initErrorSummary).toHaveBeenCalledWith({ scope })
      expect(initRadios).toHaveBeenCalledWith({ scope })
      expect(initTabs).toHaveBeenCalledWith({ scope })
    })
  })
})
