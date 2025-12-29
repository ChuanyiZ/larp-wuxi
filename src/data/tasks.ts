export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type TaskType = 'main' | 'side' | 'report'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  taskType: TaskType
  reward?: number
  area?: string
  due?: string
}

export interface TaskMain extends Task {
  taskType: 'main'
  seal: string
  reward: number
}

export interface TaskSide extends Task {
  taskType: 'side'
  reward?: number
}

export interface TaskReport extends Exclude<Task, 'reward' | 'area'> {
  taskType: 'report'
}

export const tasks: (TaskMain | TaskSide | TaskReport)[] = [
  // main tasks
  {
    id: 'seal-river',
    title: '取得河口船单印记',
    description: '清名桥河埠、码头取船单或牌匾印影，验证漕运票据',
    status: 'todo',
    taskType: 'main',
    seal: '埠',
    reward: 100,
    area: '清名桥河埠',
    due: '亥初前',
  },
  {
    id: 'seal-market',
    title: '搜集市廛铺号印记',
    description: '南长街、南禅寺周边收集店号收条，核对字号与位置',
    status: 'todo',
    taskType: 'main',
    seal: '市',
    reward: 100,
    area: '南长街',
    due: '亥初前',
  },
  {
    id: 'seal-spring',
    title: '惠山泉/祠堂印记',
    description: '惠山泉或祠堂门券/纪念章，记泉名与姓氏旁证',
    status: 'todo',
    taskType: 'main',
    seal: '泉',
    reward: 100,
    area: '惠山',
    due: '亥初前',
  },
  {
    id: 'seal-academy',
    title: '东林书院印记',
    description: '东林书院门券/纪念章并抄记顾宪成题记一句',
    status: 'todo',
    taskType: 'main',
    seal: '東',
    reward: 100,
    area: '东林书院',
    due: '亥初前',
  },
  // report tasks
  {
    id: 'brief',
    title: '撰写初报四句',
    description: '四印齐备后，按格式封缄初报',
    status: 'todo',
    taskType: 'report',
    due: '亥初',
  },
  // side tasks
  {
    id: 'side-plum',
    title: '蜡梅香信',
    description:
      '到梅园（编者注：或你路线中更顺的赏蜡梅点），取“蜡梅”作冬令物证。梅园蜡梅通常冬季开放，盛花期多在冬月腊月',
    status: 'todo',
    taskType: 'side',
    reward: 50,
    area: '梅园',
  },
  {
    id: 'side-dessert',
    title: '糕团年味',
    description: '寻一处糕团店/作坊，买团子/青白团子/年糕等“冬令年礼”',
    status: 'todo',
    taskType: 'side',
    reward: 20,
    area: '本地小店',
  },
  {
    id: 'side-noodle',
    title: '面食探访',
    description: '到街头巷里，寻一处做无锡本地口味的面食',
    status: 'todo',
    taskType: 'side',
    reward: 30,
    area: '本地小店',
  },
  {
    id: 'side-wonton',
    title: '汤头问路',
    description: '寻一处小馄饨或“馄饨面”之铺，点一份小食',
    status: 'todo',
    taskType: 'side',
    reward: 30,
    area: '菜市场',
  },
  {
    id: 'side-eel',
    title: '鲜甜鳝辨',
    description: '寻一处做鳝鱼菜的店家，取一份可分食的小份',
    status: 'todo',
    taskType: 'side',
    reward: 50,
    area: '本地小店',
  },
  {
    id: 'side-souvenir',
    title: '手信验明：惠山泥人或小物',
    description: '寻一件能代表无锡的手信小物（惠山泥人、明信片、风物小挂件皆可）',
    status: 'todo',
    taskType: 'side',
    area: '手信店',
  },
]

export const statusLabels: Record<TaskStatus, string> = {
  'todo': '待办',
  'in-progress': '进行中',
  'done': '已完成',
}

export const taskTypeLabels: Record<TaskType, string> = {
  'main': '主线',
  'side': '支线',
  'report': '回报',
}
