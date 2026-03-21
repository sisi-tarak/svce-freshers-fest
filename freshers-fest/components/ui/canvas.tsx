// Smooth cursor-trail canvas animation
// Adapted for Freshers Fest — warm orange/amber trailing lines

interface Oscillator {
  phase: number
  offset: number
  frequency: number
  amplitude: number
}

interface NodePoint {
  x: number
  y: number
  vx: number
  vy: number
}

interface TrailLine {
  spring: number
  friction: number
  nodes: NodePoint[]
  update: () => void
  draw: () => void
}

let ctx: CanvasRenderingContext2D & { running?: boolean; frame?: number }
let oscillator: Oscillator
let oscillatorValue = 0
let pos = { x: 0, y: 0 }
let lines: TrailLine[] = []
let animationRunning = false

const CONFIG = {
  friction: 0.5,
  trails: 30,
  size: 40,
  dampening: 0.025,
  tension: 0.99,
}

function createOscillator(opts: Partial<Oscillator>): Oscillator {
  return {
    phase: opts.phase || 0,
    offset: opts.offset || 0,
    frequency: opts.frequency || 0.001,
    amplitude: opts.amplitude || 1,
  }
}

function updateOscillator(o: Oscillator): number {
  o.phase += o.frequency
  oscillatorValue = o.offset + Math.sin(o.phase) * o.amplitude
  return oscillatorValue
}

function createNode(): NodePoint {
  return { x: 0, y: 0, vx: 0, vy: 0 }
}

function createLine(spring: number): TrailLine {
  const s = spring + 0.1 * Math.random() - 0.05
  const f = CONFIG.friction + 0.01 * Math.random() - 0.005
  const nodes: NodePoint[] = []

  for (let i = 0; i < CONFIG.size; i++) {
    const node = createNode()
    node.x = pos.x
    node.y = pos.y
    nodes.push(node)
  }

  return {
    spring: s,
    friction: f,
    nodes,
    update() {
      let sp = this.spring
      let t = this.nodes[0]
      t.vx += (pos.x - t.x) * sp
      t.vy += (pos.y - t.y) * sp

      for (let i = 0; i < this.nodes.length; i++) {
        t = this.nodes[i]
        if (i > 0) {
          const prev = this.nodes[i - 1]
          t.vx += (prev.x - t.x) * sp
          t.vy += (prev.y - t.y) * sp
          t.vx += prev.vx * CONFIG.dampening
          t.vy += prev.vy * CONFIG.dampening
        }
        t.vx *= this.friction
        t.vy *= this.friction
        t.x += t.vx
        t.y += t.vy
        sp *= CONFIG.tension
      }
    },
    draw() {
      let x = this.nodes[0].x
      let y = this.nodes[0].y

      ctx.beginPath()
      ctx.moveTo(x, y)

      let i: number
      for (i = 1; i < this.nodes.length - 2; i++) {
        const curr = this.nodes[i]
        const next = this.nodes[i + 1]
        x = 0.5 * (curr.x + next.x)
        y = 0.5 * (curr.y + next.y)
        ctx.quadraticCurveTo(curr.x, curr.y, x, y)
      }

      const curr = this.nodes[i]
      const next = this.nodes[i + 1]
      ctx.quadraticCurveTo(curr.x, curr.y, next.x, next.y)
      ctx.stroke()
      ctx.closePath()
    },
  }
}

function initLines() {
  lines = []
  for (let i = 0; i < CONFIG.trails; i++) {
    lines.push(createLine(0.45 + (i / CONFIG.trails) * 0.025))
  }
}

function onMouseMove(e: MouseEvent | TouchEvent) {
  if ('touches' in e && e.touches) {
    pos.x = e.touches[0].pageX
    pos.y = e.touches[0].pageY
  } else if ('clientX' in e) {
    pos.x = e.clientX
    pos.y = e.clientY
  }
}

function onFirstInteraction(e: MouseEvent | TouchEvent) {
  document.removeEventListener('mousemove', onFirstInteraction as EventListener)
  document.removeEventListener('touchstart', onFirstInteraction as EventListener)
  document.addEventListener('mousemove', onMouseMove as EventListener)
  document.addEventListener('touchmove', onMouseMove as EventListener)
  document.addEventListener('touchstart', ((ev: TouchEvent) => {
    if (ev.touches.length === 1) {
      pos.x = ev.touches[0].pageX
      pos.y = ev.touches[0].pageY
    }
  }) as EventListener)
  onMouseMove(e)
  initLines()
  render()
}

function render() {
  if (!ctx || !ctx.running) return

  ctx.globalCompositeOperation = 'source-over'
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.globalCompositeOperation = 'lighter'

  // Warm orange-amber hue range (15-45) instead of full rainbow
  const hue = Math.round(updateOscillator(oscillator))
  ctx.strokeStyle = `hsla(${hue}, 90%, 55%, 0.02)`
  ctx.lineWidth = 8

  for (let i = 0; i < CONFIG.trails; i++) {
    lines[i].update()
    lines[i].draw()
  }

  ctx.frame = (ctx.frame || 0) + 1
  window.requestAnimationFrame(render)
}

function resizeCanvas() {
  if (!ctx) return
  ctx.canvas.width = window.innerWidth
  ctx.canvas.height = window.innerHeight
}

export function renderCanvas(): () => void {
  const canvasEl = document.getElementById('canvas') as HTMLCanvasElement | null
  if (!canvasEl) return () => {}

  const context = canvasEl.getContext('2d')
  if (!context) return () => {}

  ctx = context as typeof ctx
  ctx.running = true
  ctx.frame = 1
  animationRunning = true

  oscillator = createOscillator({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 15,
    frequency: 0.002,
    offset: 25,
  })

  document.addEventListener('mousemove', onFirstInteraction as EventListener)
  document.addEventListener('touchstart', onFirstInteraction as EventListener)

  const handleOrientationChange = () => resizeCanvas()
  const handleResize = () => resizeCanvas()
  const handleFocus = () => {
    if (ctx && !ctx.running) {
      ctx.running = true
      render()
    }
  }
  const handleBlur = () => {
    if (ctx) ctx.running = false
  }

  document.body.addEventListener('orientationchange', handleOrientationChange)
  window.addEventListener('resize', handleResize)
  window.addEventListener('focus', handleFocus)
  window.addEventListener('blur', handleBlur)

  resizeCanvas()

  // Return cleanup function
  return () => {
    animationRunning = false
    if (ctx) ctx.running = false
    document.removeEventListener('mousemove', onFirstInteraction as EventListener)
    document.removeEventListener('touchstart', onFirstInteraction as EventListener)
    document.removeEventListener('mousemove', onMouseMove as EventListener)
    document.removeEventListener('touchmove', onMouseMove as EventListener)
    document.body.removeEventListener('orientationchange', handleOrientationChange)
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('focus', handleFocus)
    window.removeEventListener('blur', handleBlur)
  }
}
