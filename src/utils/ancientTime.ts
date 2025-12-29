const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const

const branchFromHour = (hour: number): string => {
  const normalized = ((hour % 24) + 24) % 24
  const index = Math.floor((normalized + 1) / 2) % 12
  return branches[index] ?? '子'
}

const phaseFromHour = (hour: number): '初' | '正' => {
  const normalized = ((hour % 24) + 24) % 24
  return normalized % 2 === 0 ? '正' : '初'
}

const quarterLabels = ['初刻', '一刻', '二刻', '三刻'] as const
const quarterFromMinutes = (minutes: number): string =>
  quarterLabels[Math.floor(minutes / 15)] ?? quarterLabels[0]

export const toTraditionalTime = (date: Date = new Date()): string => {
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const branch = branchFromHour(hour)
  const phase = phaseFromHour(hour)
  const quarterLabel = quarterFromMinutes(minutes)
  return `${branch}${phase}${quarterLabel}`
}

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest
  const makeDate = (hour: number, minute = 0) => {
    const d = new Date(2000, 0, 1, hour, minute, 0, 0)
    return d
  }

  describe('branchFromHour', () => {
    it.each([
      { hour: 0, expected: '子' },
      { hour: 1, expected: '丑' },
      { hour: 2, expected: '丑' },
      { hour: 3, expected: '寅' },
      { hour: 4, expected: '寅' },
      { hour: 5, expected: '卯' },
      { hour: 6, expected: '卯' },
      { hour: 7, expected: '辰' },
      { hour: 8, expected: '辰' },
      { hour: 9, expected: '巳' },
      { hour: 10, expected: '巳' },
      { hour: 11, expected: '午' },
      { hour: 12, expected: '午' },
      { hour: 13, expected: '未' },
      { hour: 14, expected: '未' },
      { hour: 15, expected: '申' },
      { hour: 16, expected: '申' },
      { hour: 17, expected: '酉' },
      { hour: 18, expected: '酉' },
      { hour: 19, expected: '戌' },
      { hour: 20, expected: '戌' },
      { hour: 21, expected: '亥' },
      { hour: 22, expected: '亥' },
      { hour: 23, expected: '子' },
    ])('handles $hour as $expected', ({ hour, expected }) => {
      expect(branchFromHour(hour)).toBe(expected)
    })
  })

  describe('toTraditionalTime', () => {
    it('maps midnight to 子正', () => {
      expect(toTraditionalTime(makeDate(0, 0))).toBe('子正初刻')
    })

    it('maps 23:00 to 子初', () => {
      expect(toTraditionalTime(makeDate(23, 0))).toBe('子初初刻')
    })

    it('maps mid-branch times to correct phase and quarter', () => {
      expect(toTraditionalTime(makeDate(1, 30))).toBe('丑初二刻')
      expect(toTraditionalTime(makeDate(12, 0))).toBe('午正初刻')
      expect(toTraditionalTime(makeDate(17, 45))).toBe('酉初三刻')
    })

    it.each([
      { hour: 5, minute: 0, expected: '卯初初刻' },
      { hour: 5, minute: 14, expected: '卯初初刻' },
      { hour: 5, minute: 15, expected: '卯初一刻' },
      { hour: 5, minute: 30, expected: '卯初二刻' },
      { hour: 5, minute: 45, expected: '卯初三刻' },
      { hour: 6, minute: 0, expected: '卯正初刻' },
      { hour: 6, minute: 15, expected: '卯正一刻' },
    ])('handles $hour:$minute as $expected', ({ hour, minute, expected }) => {
      expect(toTraditionalTime(makeDate(hour, minute))).toBe(expected)
    })
  })
}
