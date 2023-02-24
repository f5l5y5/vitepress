const arr = [
  { name: 'p0', id: 0 },
  { name: 'p1', id: 1, pid: 0 },
  { name: 'p1-1', id: 11, pid: 1 },
  { name: 'p2', id: 2, pid: 0 },
  { name: 'p2-1', id: 22, pid: 2 },
  { name: 'p2-2', id: 23, pid: 2 },
]

const obj = [
  {
    name: 'p0',
    id: 0,
    children: [
      {
        name: 'p1',
        id: 1,
        children: [
          {
            name: 'p1-1',
            id: 11,
          },
        ],
      },
      {
        name: 'p2',
        id: 2,
        children: [
          {
            name: 'p2-1',
            id: 22,
          },
          {
            name: 'p2-2',
            id: 23,
          },
        ],
      },
    ],
  },
]

const listToTree = (list, id, pid) => {
  let tree = []
  list.filter
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
