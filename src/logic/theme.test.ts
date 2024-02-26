import { Theme, themes } from './theme'

describe('Theme', () => {
  describe('constructor', () => {
    it('should correctly assign properties', () => {
      const theme = new Theme({
        primary: 'primary',
        secondary: 'secondary',
        primaryAccent: 'primaryAccent',
        secondaryAccent: 'secondaryAccent',
        background: 'background',
        name: 'name'
      })

      expect(theme.primary).toBe('primary')
      expect(theme.secondary).toBe('secondary')
      expect(theme.primaryAccent).toBe('primaryAccent')
      expect(theme.secondaryAccent).toBe('secondaryAccent')
      expect(theme.background).toBe('background')
      expect(theme.name).toBe('name')
    })
  })

  describe('CSS', () => {
    it('should return a CSS string', () => {
      const theme = new Theme({
        primary: 'primary',
        secondary: 'secondary',
        primaryAccent: 'primaryAccent',
        secondaryAccent: 'secondaryAccent',
        background: 'background',
        name: 'name'
      })

      const css = theme.CSS()
      expect(css).toBe(
        '--primary: primary; --secondary: secondary; --primaryAccent: primaryAccent; --secondaryAccent: secondaryAccent; --background: background'
      )
    })
  })
})

describe('themes', () => {
  it('should be an array of Theme instances', () => {
    expect(themes).toBeInstanceOf(Array)
    themes.forEach((theme) => {
      expect(theme).toBeInstanceOf(Theme)
    })
  })
})
