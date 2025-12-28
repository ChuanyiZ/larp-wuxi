export type TaskStatus = 'todo' | 'in-progress' | 'done'

export type Task = {
  id: string
  title: string
  description?: string
  status: TaskStatus
  area?: string
  due?: string
}

export const tasks: Task[] = [
  {
    id: 'seal-river',
    title: '取得河口船单印记',
    description: '清名桥河埠、码头取船单或牌匾印影，验证漕运票据',
    status: 'in-progress',
    area: '清名桥河埠',
    due: '亥初前',
  },
  {
    id: 'seal-market',
    title: '搜集市廛铺号印记',
    description: '南长街、南禅寺周边收集店号收条，核对字号与位置',
    status: 'todo',
    area: '南长街',
    due: '亥初前',
  },
  {
    id: 'seal-spring',
    title: '惠山泉/祠堂印记',
    description: '惠山泉或祠堂门券/纪念章，记泉名与姓氏旁证',
    status: 'todo',
    area: '惠山',
    due: '亥初前',
  },
  {
    id: 'seal-academy',
    title: '东林书院印记',
    description: '东林书院门券/纪念章并抄记顾宪成题记一句',
    status: 'in-progress',
    area: '东林书院',
    due: '亥初前',
  },
  {
    id: 'brief-initial',
    title: '撰写初报四句',
    description: '四印齐备后，按格式封缄初报。待印记完成自动解锁。',
    status: 'done',
  },
]

export const statusLabels: Record<TaskStatus, string> = {
  'todo': '待办',
  'in-progress': '进行中',
  'done': '已完成',
}
