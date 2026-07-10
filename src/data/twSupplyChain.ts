import type { KnowledgeEdgeData, KnowledgeNodeData, QuestData, RegionData } from '../types/knowledge'

type NodeSeed = Omit<KnowledgeNodeData, 'position'>

export const regions: RegionData[] = [
  { id: 'core', title: '供應鏈核心', subtitle: '從晶片到 AI Factory 的全景入口', center: [0, 0, 0], radius: 7, color: '#193259', accent: '#7ee7ff' },
  { id: 'design', title: 'IC 設計城', subtitle: 'ASIC、IP、控制器與 Edge AI', center: [-24, 0, -14], radius: 10, color: '#302255', accent: '#b999ff' },
  { id: 'foundry', title: '晶圓與封裝谷', subtitle: 'Foundry、CoWoS、FOPLP 與設備', center: [0, 0, -25], radius: 11, color: '#183e52', accent: '#65e8e1' },
  { id: 'memory', title: '記憶體與載板礦區', subtitle: 'HBM、DRAM、ABF 與測試介面', center: [25, 0, -13], radius: 10, color: '#4a341b', accent: '#ffd36b' },
  { id: 'server', title: 'AI Server 工業城', subtitle: 'ODM、Rack 與 AI Factory', center: [25, 0, 16], radius: 11, color: '#183d2c', accent: '#81f3a8' },
  { id: 'thermal', title: '散熱與能源港', subtitle: '液冷、HVDC、SST 與機構件', center: [0, 0, 27], radius: 11, color: '#48233b', accent: '#ff9acc' },
  { id: 'network', title: '高速互連群島', subtitle: 'Ethernet、CPO、連接器與 Edge AI', center: [-25, 0, 15], radius: 10, color: '#213a52', accent: '#82bdff' },
]

const seeds: NodeSeed[] = [
  { id: 'taiwan-ai-supply-chain', title: '台灣 AI 半導體供應鏈', summary: '串起 IC 設計、晶圓、封裝、伺服器、散熱、電源與網通的主世界。', details: ['2026 source-backed 早期 thesis', '以產業節點與公司節點形成可探索地圖', '沿著上游到下游理解價值如何傳遞'], kind: 'hub', regionId: 'core', importance: 5, sourcePath: 'wiki/topics/taiwan-ai-semiconductor-supply-chain.md', updatedAt: '2026-05-11', xp: 120 },
  { id: 'ic-design', title: 'IC 設計', summary: 'Fabless、ASIC service、IP 與 interface IC 的知識樞紐。', details: ['CSP custom ASIC', '先進節點 IP', '高速介面與控制器'], kind: 'concept', regionId: 'design', importance: 5, sourcePath: 'wiki/concepts/ic-design.md', updatedAt: '2026-05-11', xp: 195 },
  { id: 'csp-custom-asic', title: 'CSP Custom ASIC', summary: 'Google TPU、AWS Trainium、Meta MTIA 等雲端自研晶片路線。', details: ['降低單一 GPU 依賴', '推升 ASIC design service', '需要先進封裝與 HBM'], kind: 'concept', regionId: 'design', importance: 4, sourcePath: 'wiki/concepts/csp-custom-asic.md', updatedAt: '2026-05-11', xp: 170 },
  { id: 'chiplet', title: 'Chiplet', summary: '以小晶片與異質整合組成高效能系統。', details: ['UCIe', '先進封裝', 'HBM integration'], kind: 'concept', regionId: 'design', importance: 3, sourcePath: 'wiki/concepts/chiplet.md', updatedAt: '2026-05-11', xp: 145 },
  { id: 'mediatek', title: '聯發科', ticker: '2454', summary: 'Mobile、Smart Edge、AI ASIC 與車用平台。', details: ['Mobile SoC', 'Smart Edge', 'AI ASIC / automotive'], kind: 'company', regionId: 'design', importance: 4, sourcePath: 'wiki/entities/mediatek.md', updatedAt: '2026-05-11', xp: 170 },
  { id: 'alchip', title: '世芯-KY', ticker: '3661', summary: 'Advanced AI ASIC 設計服務商。', details: ['ASIC service', 'advanced nodes', 'AI/HPC customers'], kind: 'company', regionId: 'design', importance: 3, sourcePath: 'wiki/entities/alchip.md', updatedAt: '2026-05-11', xp: 145 },
  { id: 'guc', title: '創意', ticker: '3443', summary: 'TSMC VCA、UCIe 與 HBM4 IP 相關 ASIC 服務。', details: ['TSMC VCA', 'UCIe', 'HBM4 IP'], kind: 'company', regionId: 'design', importance: 4, sourcePath: 'wiki/entities/guc.md', updatedAt: '2026-05-11', xp: 170 },
  { id: 'faraday', title: '智原', ticker: '3035', summary: 'ASIC 與 IP 設計服務，亦連結 Edge AI。', details: ['ASIC service', 'IP licensing', 'edge AI'], kind: 'company', regionId: 'design', importance: 3, sourcePath: 'wiki/entities/faraday-tech.md', updatedAt: '2026-05-11', xp: 145 },
  { id: 'm31', title: 'M31', ticker: '6643', summary: '先進節點矽智財與 royalty 模型。', details: ['Silicon IP', 'advanced nodes', 'royalty'], kind: 'company', regionId: 'design', importance: 2, sourcePath: 'wiki/entities/m31.md', updatedAt: '2026-05-11', xp: 120 },
  { id: 'phison', title: '群聯', ticker: '8299', summary: 'NAND controller 與 local AI memory tier。', details: ['NAND controller', 'storage', 'local AI'], kind: 'company', regionId: 'design', importance: 3, sourcePath: 'wiki/entities/phison.md', updatedAt: '2026-05-11', xp: 145 },
  { id: 'andes', title: '晶心科', ticker: '6533', summary: 'RISC-V 與 Edge AI IP。', details: ['RISC-V', 'processor IP', 'edge AI'], kind: 'company', regionId: 'design', importance: 2, sourcePath: 'wiki/entities/andes-tech.md', updatedAt: '2026-05-11', xp: 120 },

  { id: 'wafer-foundry', title: '晶圓代工', summary: 'AI 先進製程與 CoWoS 產能瓶頸的核心層。', details: ['advanced nodes', 'yield and capacity', 'CoWoS bottleneck'], kind: 'concept', regionId: 'foundry', importance: 5, sourcePath: 'wiki/concepts/wafer-foundry.md', updatedAt: '2026-05-11', xp: 195 },
  { id: 'advanced-packaging', title: '先進封裝', summary: 'CoWoS、SoIC、FOPLP 與玻璃基板形成的整合技術群。', details: ['CoWoS / SoIC', 'FOPLP / CoPoS', 'HBM integration'], kind: 'concept', regionId: 'foundry', importance: 5, sourcePath: 'wiki/concepts/advanced-packaging.md', updatedAt: '2026-05-17', xp: 195 },
  { id: 'glass-substrate', title: '玻璃基板', summary: 'AI/HPC 先進封裝的長期材料與尺寸擴張路線。', details: ['glass core substrate', 'low warpage', 'TGV'], kind: 'concept', regionId: 'foundry', importance: 3, sourcePath: 'wiki/concepts/glass-substrate.md', updatedAt: '2026-05-11', xp: 145 },
  { id: 'copos', title: 'CoPoS / Panel Packaging', summary: 'Chip-on-Panel-on-Substrate 與面板級封裝市場路線。', details: ['panel scale', 'cost and throughput', 'non-CoWoS alternatives'], kind: 'concept', regionId: 'foundry', importance: 3, sourcePath: 'wiki/concepts/copos.md', updatedAt: '2026-05-11', xp: 145 },
  { id: 'tsmc', title: '台積電', ticker: '2330', summary: '晶圓代工與先進封裝龍頭，也是整個世界的主要樞紐。', details: ['advanced foundry', 'CoWoS / SoIC', 'N16HV near-eye display platform'], kind: 'company', regionId: 'foundry', importance: 5, sourcePath: 'wiki/entities/tsmc.md', updatedAt: '2026-05-17', xp: 195 },
  { id: 'ase', title: '日月光投控', ticker: '3711', summary: '全球 OSAT 龍頭與 advanced packaging 重要參與者。', details: ['OSAT', 'system-in-package', 'advanced packaging'], kind: 'company', regionId: 'foundry', importance: 4, sourcePath: 'wiki/entities/ase.md', updatedAt: '2026-05-11', xp: 170 },
  { id: 'powertech', title: '力成科技', ticker: '6239', aliases: ['PTI'], summary: '記憶體 OSAT 龍頭，2026 thesis 轉向 memory cycle、Micron spillover 與 FOPLP。', details: ['2026 暫停新 HBM 客戶開發，2027 重啟', 'FOPLP 510×515 mm，試產 yield 90–95%', 'AMD 已確認為 2.5D 面板級 EFB 整合夥伴'], kind: 'company', regionId: 'foundry', importance: 5, sourcePath: 'wiki/entities/powertech.md', updatedAt: '2026-05-25', xp: 195 },
  { id: 'er-engineering', title: '鈦昇', ticker: '8027', summary: 'TGV、玻璃基板與 FOPLP 設備鏈。', details: ['TGV equipment', 'glass substrate', 'FOPLP'], kind: 'company', regionId: 'foundry', importance: 2, sourcePath: 'wiki/entities/er-engineering.md', updatedAt: '2026-05-11', xp: 120 },
  { id: 'grand-process', title: '弘塑', ticker: '3131', summary: '先進封裝濕製程與設備供應鏈。', details: ['wet process', 'advanced packaging', 'capacity expansion'], kind: 'company', regionId: 'foundry', importance: 3, sourcePath: 'wiki/entities/grand-process-technology.md', updatedAt: '2026-05-11', xp: 145 },

  { id: 'memory-dram-hbm', title: 'DRAM / HBM / NAND', summary: 'AI memory cycle、HBM 整合與成本傳導的核心概念。', details: ['HBM3E / HBM4', 'DDR5', 'datacenter SSD'], kind: 'concept', regionId: 'memory', importance: 5, sourcePath: 'wiki/concepts/memory-dram-hbm.md', updatedAt: '2026-05-11', xp: 195 },
  { id: 'abf-substrate', title: 'ABF 載板', summary: '高階運算晶片與封裝中介層的重要載板。', details: ['high-layer-count substrates', 'AI/HPC demand', 'glass substrate caveat'], kind: 'concept', regionId: 'memory', importance: 4, sourcePath: 'wiki/concepts/abf-substrate.md', updatedAt: '2026-05-11', xp: 170 },
  { id: 'ic-testing', title: '封裝與測試', summary: 'OSAT、wafer sort 與 AI-HPC test interface。', details: ['packaging', 'wafer sort', 'probe cards'], kind: 'concept', regionId: 'memory', importance: 4, sourcePath: 'wiki/concepts/ic-packaging-testing.md', updatedAt: '2026-05-13', xp: 170 },
  { id: 'unimicron', title: '欣興', ticker: '3037', summary: 'ABF 載板的重要供應商。', details: ['ABF substrate', 'high-end PCB', 'AI/HPC'], kind: 'company', regionId: 'memory', importance: 4, sourcePath: 'wiki/entities/unimicron.md', updatedAt: '2026-05-11', xp: 170 },
  { id: 'nanya-pcb', title: '南電', ticker: '8046', summary: 'ABF 載板供應商。', details: ['ABF substrate', 'package substrates', 'cycle exposure'], kind: 'company', regionId: 'memory', importance: 3, sourcePath: 'wiki/entities/nanya-pcb.md', updatedAt: '2026-05-11', xp: 145 },
  { id: 'kinsus', title: '景碩', ticker: '3189', summary: 'IC 載板供應鏈。', details: ['IC substrate', 'ABF / BT', 'advanced packaging support'], kind: 'company', regionId: 'memory', importance: 3, sourcePath: 'wiki/entities/kinsus.md', updatedAt: '2026-05-11', xp: 145 },
  { id: 'mpi', title: '旺矽', ticker: '6223', summary: 'Probe card 與 AI-HPC wafer sort test interface。', details: ['probe cards', 'RF / photonics test', 'AI-HPC wafer sort'], kind: 'company', regionId: 'memory', importance: 4, sourcePath: 'wiki/entities/mpi-corp.md', updatedAt: '2026-05-13', xp: 170 },
  { id: 'nanya-tech', title: '南亞科', ticker: '2408', summary: 'DRAM 與 memory cycle 代表公司。', details: ['DRAM', 'memory cycle', 'pricing'], kind: 'company', regionId: 'memory', importance: 3, sourcePath: 'wiki/entities/nanya-tech.md', updatedAt: '2026-05-11', xp: 145 },
  { id: 'winbond', title: '華邦電', ticker: '2344', summary: '利基型記憶體與特殊應用。', details: ['specialty DRAM', 'NOR flash', 'cycle'], kind: 'company', regionId: 'memory', importance: 3, sourcePath: 'wiki/entities/winbond.md', updatedAt: '2026-05-11', xp: 145 },

  { id: 'ai-server-odm', title: 'AI Server ODM', summary: 'AI 伺服器組裝、rack integration 與寄售模式。', details: ['L6 to L10/L11', 'rack-scale integration', 'consigned components'], kind: 'concept', regionId: 'server', importance: 5, sourcePath: 'wiki/concepts/ai-server-odm.md', updatedAt: '2026-05-17', xp: 195 },
  { id: 'gb300', title: 'GB300 NVL72', summary: 'NVIDIA rack-scale AI system 與供應鏈拉動核心。', details: ['NVL72 rack', 'liquid cooling', 'power and interconnect'], kind: 'concept', regionId: 'server', importance: 4, sourcePath: 'wiki/concepts/gb300-nvl72.md', updatedAt: '2026-05-11', xp: 170 },
  { id: 'ai-factory', title: 'AI Factory', summary: '把 GPU、電力、網路與冷卻整合成算力工廠。', details: ['compute infrastructure', 'energy', 'network fabric'], kind: 'concept', regionId: 'server', importance: 4, sourcePath: 'wiki/concepts/ai-factory.md', updatedAt: '2026-05-11', xp: 170 },
  { id: 'foxconn', title: '鴻海', ticker: '2317', summary: 'EMS、AI server 與 AI factory 的大型整合商。', details: ['AI servers', 'EMS scale', 'AI factory'], kind: 'company', regionId: 'server', importance: 5, sourcePath: 'wiki/entities/foxconn.md', updatedAt: '2026-05-17', xp: 195 },
  { id: 'quanta', title: '廣達', ticker: '2382', summary: 'AI server ODM / QCT，GB300 ramp 與高 AI mix。', details: ['GB300 ramp', 'AI mix 約 75%', '訂單能見度延伸至 2027+'], kind: 'company', regionId: 'server', importance: 5, sourcePath: 'wiki/entities/quanta.md', updatedAt: '2026-05-17', xp: 195 },
  { id: 'wiwynn', title: '緯穎', ticker: '6669', summary: 'CSP 白牌 AI rack、代採購、CPO 與 Vera Rubin readiness。', details: ['CSP direct model', 'rack-scale systems', 'CPO readiness'], kind: 'company', regionId: 'server', importance: 5, sourcePath: 'wiki/entities/wiwynn.md', updatedAt: '2026-05-17', xp: 195 },
  { id: 'wistron', title: '緯創', ticker: '3231', summary: 'ODM 與 AI server 供應鏈。', details: ['AI server', 'ODM', 'manufacturing expansion'], kind: 'company', regionId: 'server', importance: 4, sourcePath: 'wiki/entities/wistron.md', updatedAt: '2026-05-11', xp: 170 },
  { id: 'inventec', title: '英業達', ticker: '2356', summary: 'AI server 從 L6 向 L10/L11 整合的觀察標的。', details: ['server assembly', 'rack integration', 'L10/L11 signal'], kind: 'company', regionId: 'server', importance: 3, sourcePath: 'wiki/entities/inventec.md', updatedAt: '2026-05-11', xp: 145 },

  { id: 'server-cooling', title: '伺服器散熱', summary: 'GB200/GB300 液冷、CDU、QD 與 heat exchanger。', details: ['liquid cooling', 'CDU', 'quick disconnect'], kind: 'concept', regionId: 'thermal', importance: 5, sourcePath: 'wiki/concepts/server-thermal-cooling.md', updatedAt: '2026-05-11', xp: 195 },
  { id: 'power-delivery', title: '伺服器電源', summary: 'HVDC、SST、BBU 與 supercapacitor 形成資料中心電力鏈。', details: ['HVDC', 'solid-state transformer', 'BBU'], kind: 'concept', regionId: 'thermal', importance: 5, sourcePath: 'wiki/concepts/power-delivery.md', updatedAt: '2026-05-11', xp: 195 },
  { id: 'cdu', title: 'CDU 液冷分配', summary: 'Coolant Distribution Unit 與液冷迴路核心。', details: ['pump and control', 'heat exchange', 'rack cooling'], kind: 'concept', regionId: 'thermal', importance: 3, sourcePath: 'wiki/concepts/coolant-distribution-unit.md', updatedAt: '2026-05-11', xp: 145 },
  { id: 'avc', title: '奇鋐', ticker: '3017', summary: '伺服器散熱龍頭，並透過富世達延伸 QD 與滑軌。', details: ['air and liquid cooling', 'AVC group', 'GB200/GB300 exposure'], kind: 'company', regionId: 'thermal', importance: 5, sourcePath: 'wiki/entities/avc.md', updatedAt: '2026-05-25', xp: 195 },
  { id: 'auras', title: '雙鴻', ticker: '3324', summary: '伺服器散熱、液冷與 CDU。', details: ['thermal modules', 'liquid cooling', 'CDU'], kind: 'company', regionId: 'thermal', importance: 4, sourcePath: 'wiki/entities/auras.md', updatedAt: '2026-05-11', xp: 170 },
  { id: 'kaori', title: '高力', ticker: '8996', summary: 'CDU BPHE 與 heat exchanger。', details: ['brazed plate heat exchanger', 'CDU', 'thermal infrastructure'], kind: 'company', regionId: 'thermal', importance: 3, sourcePath: 'wiki/entities/kaori.md', updatedAt: '2026-05-11', xp: 145 },
  { id: 'delta', title: '台達電', ticker: '2308', summary: '電源、HVDC 與散熱整合。', details: ['power systems', 'HVDC', 'thermal integration'], kind: 'company', regionId: 'thermal', importance: 5, sourcePath: 'wiki/entities/delta-electronics.md', updatedAt: '2026-05-11', xp: 195 },
  { id: 'liteon', title: '光寶科', ticker: '2301', summary: '伺服器電源與 SST。', details: ['server PSU', 'SST', 'power conversion'], kind: 'company', regionId: 'thermal', importance: 4, sourcePath: 'wiki/entities/lite-on.md', updatedAt: '2026-05-11', xp: 170 },
  { id: 'fositek', title: '富世達', ticker: '6805', summary: 'AVC 集團系，UQD04 對應 GB200/GB300 與 AWS IRHX，亦有滑軌與 hinge。', details: ['UQD04 quick disconnect', 'server revenue 2026 Q1 +547% YoY', 'hinge and rail mechanisms'], kind: 'company', regionId: 'thermal', importance: 4, sourcePath: 'wiki/entities/fositek.md', updatedAt: '2026-05-25', xp: 170 },

  { id: 'high-speed-interconnect', title: '高速互連', summary: '800G/1.6T Ethernet、CPO 與高速連接器。', details: ['Ethernet fabric', 'optical interconnect', 'connectors'], kind: 'concept', regionId: 'network', importance: 5, sourcePath: 'wiki/concepts/high-speed-interconnect.md', updatedAt: '2026-05-13', xp: 195 },
  { id: 'cpo', title: 'CPO / LPO / NPO', summary: '光電共封裝與 rack-scale 光互連路線。', details: ['co-packaged optics', 'lower power per bit', 'photonics testing'], kind: 'concept', regionId: 'network', importance: 4, sourcePath: 'wiki/concepts/cpo-lpo-npo.md', updatedAt: '2026-05-13', xp: 170 },
  { id: 'edge-ai', title: 'Edge AI', summary: 'NPU、AI PC、裝置端推論與 AI 眼鏡。', details: ['on-device inference', 'NPU', 'smart devices'], kind: 'concept', regionId: 'network', importance: 4, sourcePath: 'wiki/concepts/edge-ai.md', updatedAt: '2026-05-17', xp: 170 },
  { id: 'ai-glasses', title: 'AI 眼鏡', summary: 'Audio glasses、display glasses、micro-LED 與 waveguide。', details: ['near-eye display', 'micro-LED', 'optics and audio'], kind: 'concept', regionId: 'network', importance: 3, sourcePath: 'wiki/concepts/ai-glasses.md', updatedAt: '2026-05-17', xp: 145 },
  { id: 'accton', title: '智邦', ticker: '2345', summary: '800G / 1.6T switch 與 AI networking。', details: ['Ethernet switches', '800G / 1.6T', 'AI networking'], kind: 'company', regionId: 'network', importance: 5, sourcePath: 'wiki/entities/accton.md', updatedAt: '2026-05-11', xp: 195 },
  { id: 'bizlink', title: '貿聯-KY', ticker: '3665', summary: '線束、busbar、optics 與 interconnect。', details: ['cable assemblies', 'busbar', 'optical interconnect'], kind: 'company', regionId: 'network', importance: 4, sourcePath: 'wiki/entities/bizlink.md', updatedAt: '2026-05-11', xp: 170 },
  { id: 'lotes', title: '嘉澤', ticker: '3533', summary: 'Connector、socket 與 liquid-cooling QD。', details: ['CPU sockets', 'connectors', 'quick disconnect'], kind: 'company', regionId: 'network', importance: 4, sourcePath: 'wiki/entities/lotes.md', updatedAt: '2026-05-11', xp: 170 },
  { id: 'realtek', title: '瑞昱', ticker: '2379', summary: '網通與連線 IC。', details: ['network IC', 'connectivity', 'edge devices'], kind: 'company', regionId: 'network', importance: 3, sourcePath: 'wiki/entities/realtek.md', updatedAt: '2026-05-10', xp: 145 },
  { id: 'htc', title: '宏達電', ticker: '2498', summary: 'VIVE EAGLE AI 眼鏡品牌與 XR 場景。', details: ['AI glasses brand', 'XR ecosystem', 'Taiwan and Japan launch'], kind: 'company', regionId: 'network', importance: 3, sourcePath: 'wiki/entities/htc.md', updatedAt: '2026-05-17', xp: 145 },
  { id: 'playnitride', title: '錼創', ticker: '6854', summary: 'micro-LED on silicon AI 眼鏡顯示。', details: ['0.49-inch FHD', '4536 PPI', '3000 nits'], kind: 'company', regionId: 'network', importance: 3, sourcePath: 'wiki/entities/playnitride.md', updatedAt: '2026-05-17', xp: 145 },
]

const regionGroups = new Map<string, NodeSeed[]>()
for (const seed of seeds) {
  const group = regionGroups.get(seed.regionId) ?? []
  group.push(seed)
  regionGroups.set(seed.regionId, group)
}

export const knowledgeNodes: KnowledgeNodeData[] = seeds.map((seed) => {
  const region = regions.find((item) => item.id === seed.regionId)!
  const group = regionGroups.get(seed.regionId)!
  const index = group.findIndex((item) => item.id === seed.id)
  if (seed.regionId === 'core') return { ...seed, position: [0, 1.2, 0] }
  const ring = index < 5 ? 0 : 1
  const ringItems = ring === 0 ? Math.min(group.length, 5) : Math.max(group.length - 5, 1)
  const localIndex = ring === 0 ? index : index - 5
  const angle = (localIndex / ringItems) * Math.PI * 2 + (region.center[0] + region.center[2]) * 0.013
  const distance = ring === 0 ? region.radius * 0.42 : region.radius * 0.76
  return { ...seed, position: [region.center[0] + Math.cos(angle) * distance, seed.kind === 'concept' ? 1.25 : 0.65, region.center[2] + Math.sin(angle) * distance] }
})

const edgeSeeds: KnowledgeEdgeData[] = [
  ['taiwan-ai-supply-chain','ic-design','group'], ['taiwan-ai-supply-chain','wafer-foundry','group'], ['taiwan-ai-supply-chain','memory-dram-hbm','group'], ['taiwan-ai-supply-chain','ai-server-odm','group'], ['taiwan-ai-supply-chain','server-cooling','group'], ['taiwan-ai-supply-chain','high-speed-interconnect','group'],
  ['ic-design','tsmc','supply'], ['tsmc','advanced-packaging','enables'], ['advanced-packaging','memory-dram-hbm','enables'], ['memory-dram-hbm','ai-server-odm','supply'], ['ai-server-odm','server-cooling','supply'], ['server-cooling','high-speed-interconnect','related'], ['high-speed-interconnect','ic-design','related'],
  ['csp-custom-asic','alchip','related'], ['csp-custom-asic','guc','related'], ['chiplet','advanced-packaging','enables'], ['mediatek','edge-ai','enables'], ['tsmc','ase','supply'], ['tsmc','powertech','supply'], ['powertech','copos','enables'], ['er-engineering','glass-substrate','enables'], ['grand-process','advanced-packaging','enables'],
  ['abf-substrate','unimicron','group'], ['abf-substrate','nanya-pcb','group'], ['abf-substrate','kinsus','group'], ['ic-testing','mpi','group'], ['memory-dram-hbm','nanya-tech','group'], ['memory-dram-hbm','winbond','group'],
  ['gb300','quanta','enables'], ['gb300','wiwynn','enables'], ['ai-server-odm','foxconn','group'], ['ai-server-odm','quanta','group'], ['ai-server-odm','wiwynn','group'], ['ai-server-odm','wistron','group'], ['ai-factory','foxconn','related'],
  ['server-cooling','avc','group'], ['server-cooling','auras','group'], ['cdu','kaori','group'], ['power-delivery','delta','group'], ['power-delivery','liteon','group'], ['avc','fositek','related'],
  ['high-speed-interconnect','accton','group'], ['high-speed-interconnect','bizlink','group'], ['high-speed-interconnect','lotes','group'], ['cpo','wiwynn','related'], ['edge-ai','ai-glasses','enables'], ['ai-glasses','htc','group'], ['ai-glasses','playnitride','group'],
].map(([from,to,relation]) => ({ from, to, relation })) as KnowledgeEdgeData[]

const nodeIds = new Set(knowledgeNodes.map((node) => node.id))
export const knowledgeEdges = edgeSeeds.filter((edge) => nodeIds.has(edge.from) && nodeIds.has(edge.to))

export const mainQuest: QuestData = {
  id: 'ai-rack-route', title: '打造一座 AI Factory',
  description: '沿著晶片設計、晶圓、封裝、伺服器、散熱、電源與網路完成供應鏈巡禮。',
  orderedNodeIds: ['ic-design', 'tsmc', 'advanced-packaging', 'memory-dram-hbm', 'quanta', 'avc', 'delta', 'accton'], reward: 1200,
}

export const nodeById = new Map(knowledgeNodes.map((node) => [node.id, node]))
export const regionById = new Map(regions.map((region) => [region.id, region]))
