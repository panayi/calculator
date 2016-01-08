import { calculationsSelector } from 'redux/selectors'

describe('(Redux Selector) calculations', () => {
  it('should return the calculations state', () => {
    const calculations = [{
      input: 'gibberish input string expression',
      output: 293840391
    }]

    expect(calculationsSelector({ calculations })).to.deep.equal(calculations)
  })
})
