import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'

type Row = {
  topic: string
  unit: string
  qos: string
  samples: string[]
  payload: string
}

const ROWS: Row[] = [
  {
    topic: 'meters/EM-0117/power_sum',
    unit: 'W',
    qos: 'Q1',
    samples: ['-1320', '-1318', '-1326', '-1321'],
    payload: '{"p":-1321,"t":88}',
  },
  {
    topic: 'meters/EM-0117/voltage_l1',
    unit: 'V',
    qos: 'Q1',
    samples: ['230.4', '230.2', '230.6', '230.5'],
    payload: '{"v":230.5,"hz":50.02}',
  },
  {
    topic: 'meters/EM-0117/energy_total',
    unit: 'kWh',
    qos: 'Q1 R',
    samples: ['1204.88', '1204.92', '1205.01', '1205.06'],
    payload: '{"e":1205.06,"t":17683}',
  },
  {
    topic: 'meters/EM-0117/frequency',
    unit: 'Hz',
    qos: 'Q0',
    samples: ['50.02', '50.00', '50.03', '49.99'],
    payload: '{"hz":49.99}',
  },
  {
    topic: 'modbus/err/crc',
    unit: 'IDX',
    qos: 'Q1',
    samples: ['0042', '0042', '0043'],
    payload: '{"idx":43,"fn":"0x83"}',
  },
  {
    topic: 'gw/lte/uplink',
    unit: 'B/S',
    qos: 'Q0',
    samples: ['1883', '2114', '672', '1331'],
    payload: '{"b":1331,"rssi":-71}',
  },
]

const PULSE_MS = 1800

const LAYOUT = {
  header: 52,
  rowHeight: 24,
  topicX: 14,
  valueX: 296,
  qosX: 216,
}

export function MqttLog() {
  const { t } = useI18n()
  const [active, setActive] = useState<number | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setTick((current) => current + 1), PULSE_MS)
    return () => window.clearInterval(id)
  }, [])

  const rows = ROWS
  const cursor = tick % rows.length
  const cursorSample = Math.floor(tick / rows.length)

  const move = (step: number) => {
    setActive((current) => ((current ?? (step > 0 ? -1 : 0)) + step + rows.length) % rows.length)
  }

  const rowY = (index: number) => LAYOUT.header + index * LAYOUT.rowHeight

  return (
    <div className="mqtt">
      <svg
        className="mqtt__svg"
        viewBox="0 0 320 240"
        role="img"
        aria-label={t('mqtt_aria')}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            move(1)
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault()
            move(-1)
          } else if (event.key === 'Escape') {
            setActive(null)
          }
        }}
        onBlur={() => setActive(null)}
      >
        <text className="mqtt__title" x={LAYOUT.topicX} y={20}>MQTT · TELEMETRY LOG</text>
        <text className="mqtt__broker" x={LAYOUT.valueX} y={20} textAnchor="end">EMQX :8883</text>

        <text className="mqtt__head" x={LAYOUT.topicX} y={LAYOUT.header - 8}>TOPIC / VALUE / QOS</text>
        <rect className="mqtt__rule" x={12} y={LAYOUT.header - 3} width={296} height={1} />

        {rows.map((row, index) => {
          const bodyY = rowY(index) + LAYOUT.rowHeight / 2 + 3
          const samples = row.samples
          const value = row.unit === 'IDX' ? samples[cursorSample % samples.length] : samples[(tick + index) % samples.length]
          const isPulse = index === cursor && active === null
          const isActive = active === index
          return (
            <g key={row.topic}>
              <rect
                className={`mqtt__row${isActive ? ' is-active' : ''}${isPulse ? ' is-pulse' : ''}`}
                x={12}
                y={rowY(index)}
                width={296}
                height={LAYOUT.rowHeight}
              />
              <rect className={`mqtt__tick-bar${isPulse ? ' is-pulse' : ''}`} x={12} y={rowY(index)} width={2} height={LAYOUT.rowHeight} />
              <text className={`mqtt__topic${isActive ? ' is-active' : ''}`} x={LAYOUT.topicX} y={bodyY}>{row.topic}</text>
              <text className={`mqtt__value${isPulse ? ' is-pulse' : ''}`} x={LAYOUT.valueX} y={bodyY} textAnchor="end">
                {`${value} ${row.unit}`}
              </text>
              <text className={`mqtt__qos${isActive ? ' is-active' : ''}`} x={LAYOUT.qosX} y={bodyY} textAnchor="end">{row.qos}</text>
              <rect
                className="mqtt__hit"
                x={12}
                y={rowY(index)}
                width={296}
                height={LAYOUT.rowHeight}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive((current) => (current === index ? null : current))}
                onClick={() => setActive((current) => (current === index ? null : index))}
              />
            </g>
          )
        })}

        <text className="mqtt__caption" x={12} y={230}>
          {active === null ? `LIVE · ${rows[cursor].topic}` : rows[active].payload}
        </text>
      </svg>
    </div>
  )
}
