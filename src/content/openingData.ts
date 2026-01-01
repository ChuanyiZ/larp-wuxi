export type OpeningNode =
  | {
      type: 'p'
      text: string
      class?: string
      bold?: boolean
      note?: string
    }
  | {
      type: 'list'
      items: { text: string; note?: string }[]
      class?: string
    }
  | {
      type: 'vertical'
      class?: string
      containerClass?: string
      children: OpeningNode[]
    }

export const openingBlocks: OpeningNode[] = [
  {
    type: 'p',
    text: '你穿回了万历末年，一觉醒来，竟成了南直隶松江府上海县衙的一名捕快。清晨的班房阴冷刺骨。你正要起身盥洗，顺便去廊下晒一晒日头，同僚却把你叫住，往你怀里塞了几份折得齐整的差票。「嗳哟，老万，侬又走运咧。昨个上峰就点名要侬去办这桩。路上做得紧些，勿要误了程期。转来记得捎点吃食，阿拉也沾沾光。个么常州府噢……侬自家当心点，话我就勿多讲了」你刚要展开票子，心里却先沉了一下：这趟差，怕又不省心。',
  },
  {
    type: 'vertical',
    containerClass: 'vertical-container drop-shadow-lg/50 drop-shadow-paper-500',
    class: 'vertical-chinese h-80 bg-paper-100',
    children: [
      { type: 'p', text: '巡按南直隶监察御史 沈', class: 'ps-0!', bold: true },
      { type: 'p', text: '为稽查私盐影射盐引等弊事 札付松江府', class: 'ps-0!', bold: true },
      {
        type: 'p',
        text: '奉都察院勘札、准南京刑部咨。内开：江南盐课亏折，近有奸商伪造盐引，影射关防，通同关津、牙行、钱铺，以票据往来隐匿课银，流害运河津口，官帑受损。合行严饬，密加稽察。已奉钦依在案，钦遵。',
        class: 'indent-[-2em]!',
      },
      {
        type: 'p',
        text: '为此札付：仰松江府即于所属上海县快班内，拣选精干捕快一名，给与关文、不得声张，赍赴常州府无锡县一带，密行稽访。到彼务照：',
      },
      {
        type: 'list',
        class: 'ps-2! counter-traditional',
        items: [
          { text: '暗访牙行钱铺及诸兑换铺户，核对其印记字号、来往票据账簿' },
          { text: '访察运河交割、仓单船单之出入，验其盐引、关防真伪，有无影射夹带' },
          { text: '如获实据，即先禀明常州府、无锡县官，会同拘拿要犯，封固证物，造册收贮' },
          { text: '毋得惊扰良民，毋得漏泄风声；凡需盘诘者，须以案由为名，慎密从事' },
        ],
      },
      {
        type: 'p',
        text: '该役自到彼日起，限十日内具结回报；仍听随事续报。敢有迁延怠玩，定行指参究治，决不姑容',
      },
      { type: 'p', text: '右札付', class: 'ps-0!' },
      { type: 'p', text: '万历三十九年冬月初四日', class: 'ps-0!' },
      { type: 'p', text: '巡按南直隶监察御史 沈 〔花押〕', class: 'ps-0!' },
    ],
  },
  {
    type: 'p',
    text: '限期十日，看起来还好。你又展开了第二份松江府的牒文',
  },
  {
    type: 'vertical',
    containerClass: 'vertical-container drop-shadow-lg/50 drop-shadow-paper-500',
    class: 'vertical-chinese h-80 bg-paper-100',
    children: [
      {
        type: 'p',
        text: '松江府为稽查私盐影射盐引等弊事牒仰上海县遵行事',
        class: 'ps-0!',
        bold: true,
      },
      {
        type: 'p',
        text: '本府奉巡按御史札付：称江南盐课亏折，近有奸商伪造盐引、影射关防，通同关津牙行钱铺，以票据往来隐匿课银，流毒运河津口等因，饬令密加稽察。已奉钦依，合行遵照。',
        class: 'indent-[-2em]!',
      },
      {
        type: 'p',
        text: '仰上海县即于快班内拣选精干差役一名，给与关文路引，毋许声张，密赴常州府无锡县一带稽访。原札限十日具结回报；今案情紧急，恐奸徒闻风潜遁，着该役一日内具初报：务将要害凭据先行攒集，封缄递报本府，以便续行会同拿问。',
      },
      { type: 'p', text: '除将巡按札付抄发照会外，希即刻遵办，毋得迟误。' },
      { type: 'p', text: '须至牒者', class: 'ps-0!' },
      { type: 'p', text: '右牒 仰 上海县 准此', class: 'ps-0!' },
      { type: 'p', text: '万历三十九年冬月初七日', class: 'ps-0!' },
      { type: 'p', text: '松江府知府 徐 〔花押〕', class: 'ps-0!' },
    ],
  },
  {
    type: 'p',
    text: '这下好了，须一日来回，果然是中彩了。赶紧看看张知县在差票里有何吩咐吧。',
  },
  {
    type: 'vertical',
    containerClass: 'vertical-container drop-shadow-lg/50 drop-shadow-paper-500',
    class: 'vertical-chinese h-80 bg-paper-100',
    children: [
      { type: 'p', text: '上海县 快班差役 万某 收执', class: 'ps-0!', bold: true },
      {
        type: 'p',
        text: '奉府照会：巡按御史饬查私盐影射盐引等弊。今点你密赴常州府无锡县一带，假以查验舟车、市廛为名，慎密稽访。此案风声最忌外泄，沿途勿与人争口角。',
        class: 'indent-[-2em]!',
      },
      {
        type: 'p',
        text: '本差限期一日要紧：亥初前须得「四枚印信」，以便封缄初报。集得四印即为办差得力；其余人证细访，听候续差。',
      },
      { type: 'p', text: '一、四枚印信证据', class: 'ps-2!', bold: true },
      {
        type: 'p',
        text: '得其一处「印影/印记」为证：能盖章最好；若无章可盖，即取「票根、收条、门券」之章，或以牌匾碑刻之「清晰照片」权作印影',
      },
      { type: 'p', text: '第一印【河口船单钤记】：', class: 'ps-4!', bold: true },
      {
        type: 'p',
        text: '到古运河清名桥一带河埠、码头、票亭处，访船单仓单名目，取一处「码头、船票、游船」之章，或拍清名桥牌匾作印影。',
        note: '编者注：此地为运河要津，最宜做「盐货夹带」之线索起点。',
      },
      { type: 'p', text: '第二印【市廛铺号印记】：', class: 'ps-4!', bold: true },
      {
        type: 'p',
        text: '到南长街、南禅寺近旁市肆，茶肆、当铺风格店、老字号小食店皆可，设法取得一张带字号的收条票据之章，记其字号与位置。',
      },
      { type: 'p', text: '第三印【山泉祠堂印记】：', class: 'ps-4!', bold: true },
      {
        type: 'p',
        text: '到惠山一带（惠山泉、祠堂群或古镇票亭），取其门券/纪念章一枚，另记「泉名、水脉、祠堂姓氏」一句作旁证。',
        note: '编者注：此为无锡士民聚处，问得口信也最顺。',
      },
      { type: 'p', text: '第四印【书院讲会印记】：', class: 'ps-4!', bold: true },
      {
        type: 'p',
        text: '到东林书院取门券/纪念章一枚；并当场抄记「顾宪成」或「东林」相关题记一条作附证。',
        note: '编者注：万历三十二年东林书院重建，至万历三十九年前后「东林是否朋党」的争论已起：此印既是地标证据，也是政治风向。',
      },
      { type: 'p', text: '二、冬令风物支线差务、兼作歇脚', class: 'ps-4!', bold: true },
      {
        type: 'p',
        text: '每寻得一样风物，得一「歇脚点数」，换得银两预算50，可抵报销。尽力而为，不必强求。',
      },
      {
        type: 'list',
        class: 'ps-4! counter-ten-stems',
        items: [
          {
            text: '【蜡梅香信】到梅园（编者注：或你路线中更顺的赏蜡梅点），取「蜡梅」作冬令物证。梅园蜡梅通常冬季开放，盛花期多在冬月腊月',
          },
          { text: '【糕团年味】 寻一处糕团店/作坊，买团子/青白团子/年糕等「冬令年礼」' },
          {
            text: '【面食探访】到街头巷里，寻一处做无锡本地口味的面食（如：红汤、清汤一类，或能体现「浇头、汤头、锅气」的面）',
          },
          { text: '【汤头问路】寻一处小馄饨或「馄饨面」之铺，点一份小食' },
          { text: '【鲜甜鳝辨】寻一处做鳝鱼菜的店家，鳝丝、脆鳝皆可，取一份可分食的小份' },
          {
            text: '【手信验明：惠山泥人或小物】寻一件能代表无锡的手信小物（惠山泥人、明信片、风物小挂件皆可）。',
          },
        ],
      },
      { type: 'p', text: '三、回禀指要', class: 'ps-4!', bold: true },
      { type: 'p', text: '亥初前，四印齐，写「初报四句」封缄如下【初报格式】 四句即可' },
      {
        type: 'list',
        class: 'ps-4! counter-ten-stems',
        items: [
          { text: '某处得河口印：附印影' },
          { text: '某处得铺号印：附印影' },
          { text: '某处得山泉祠堂印：附印影' },
          { text: '某处得书院印：附印影抄记一句' },
        ],
      },
      {
        type: 'p',
        text: '禁约：不得擅自拿人；不得惊扰良民；不得泄漏风声。遇盘问，以「查漕、访市、寻亲」应对，宁断线，不硬顶。',
      },
      { type: 'p', text: '万历三十九年冬月初八日', class: 'ps-0!' },
      { type: 'p', text: '上海县知县 张 〔县用印〕', class: 'ps-0!' },
      { type: 'p', text: '并给关文、路引各一，随身收好。', class: 'ps-0!' },
    ],
  },
  {
    type: 'p',
    text: '知县都把任务分好了，照着来就不会有问题。更何况支线任务还能用来报销，看来上峰素来待你不薄。事不宜迟，这就出发！',
  },
]
