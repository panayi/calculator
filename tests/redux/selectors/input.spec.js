import { inputSelector } from 'redux/selectors'

describe('(Redux Selector) input', () => {
  it('should return the input state', function () {
    const input = 'enter something'

    expect(inputSelector({ input })).to.equal(input)
  })
})
