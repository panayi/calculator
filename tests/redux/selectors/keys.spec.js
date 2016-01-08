import { keysSelector } from 'redux/selectors'

describe('(Redux Selector) keys', () => {
  it('should return the keys state', () => {
    const keys = 'a,b,c'

    expect(keysSelector({ keys })).to.deep.equal(keys)
  })
})
