import { settingsSelector } from 'redux/selectors'

describe('(Redux Selector) settings', () => {
  it('should return the settings state', () => {
    const settings = {
      foo: 1,
      bar: 2
    }

    expect(settingsSelector({ settings })).to.deep.equal(settings)
  })
})
