'use client'

import { useState, useEffect, useRef } from 'react'
import { QrCode, Search, CheckCircle, XCircle, AlertTriangle, Camera } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { cn } from '@/lib/utils'

interface CheckInResult {
  status: 'success' | 'already_checked_in' | 'not_found' | 'payment_pending' | 'error'
  message: string
  participant?: {
    full_name: string
    type: string
    ticket_id: string
    email: string
    checked_in: boolean
  }
}

export default function CheckInPage() {
  const [ticketInput, setTicketInput] = useState('')
  const [result, setResult] = useState<CheckInResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [scannerActive, setScannerActive] = useState(false)
  const scannerRef = useRef<HTMLDivElement>(null)
  const html5QrCodeRef = useRef<unknown>(null)

  const handleCheckIn = async (ticketId: string) => {
    if (!ticketId.trim()) return
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/admin/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId: ticketId.trim() }),
      })

      const data = await res.json()

      if (res.ok) {
        setResult({ status: 'success', message: data.message, participant: data.participant })
      } else if (res.status === 409) {
        setResult({ status: 'already_checked_in', message: data.error, participant: data.participant })
      } else if (res.status === 402) {
        setResult({ status: 'payment_pending', message: data.error, participant: data.participant })
      } else if (res.status === 404) {
        setResult({ status: 'not_found', message: 'Ticket not found in the system.', participant: undefined })
      } else {
        setResult({ status: 'error', message: data.error || 'Check-in failed.', participant: undefined })
      }
    } catch {
      setResult({ status: 'error', message: 'Network error. Please try again.', participant: undefined })
    } finally {
      setLoading(false)
      setTicketInput('')
    }
  }

  const startScanner = async () => {
    if (!scannerRef.current) return
    setScannerActive(true)

    try {
      const { Html5Qrcode } = await import('html5-qrcode')
      const scanner = new Html5Qrcode('qr-reader')
      html5QrCodeRef.current = scanner

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText: string) => {
          try {
            // Try parsing as JSON (our ticket format)
            const data = JSON.parse(decodedText)
            handleCheckIn(data.ticketId || decodedText)
          } catch {
            // Plain text ticket ID
            handleCheckIn(decodedText)
          }
          stopScanner()
        },
        () => {} // Ignore scan failures
      )
    } catch (err) {
      console.error('Scanner error:', err)
      setScannerActive(false)
    }
  }

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        await (html5QrCodeRef.current as { stop: () => Promise<void> }).stop()
      } catch {
        // Ignore
      }
    }
    setScannerActive(false)
  }

  useEffect(() => {
    return () => { stopScanner() }
  }, [])

  const resultColors = {
    success: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', icon: CheckCircle },
    already_checked_in: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: AlertTriangle },
    not_found: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', icon: XCircle },
    payment_pending: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: AlertTriangle },
    error: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', icon: XCircle },
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="font-heading font-bold text-2xl text-text-primary flex items-center gap-2">
        <QrCode className="w-7 h-7 text-accent-cyan" />
        Check-In Scanner
      </h1>

      {/* QR Scanner */}
      <div className="rounded-xl bg-bg-secondary border border-border-default p-6">
        <div className="text-center mb-4">
          {!scannerActive ? (
            <Button variant="cyan" size="lg" onClick={startScanner}>
              <Camera className="w-5 h-5" />
              Open Camera Scanner
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={stopScanner}>
              Close Scanner
            </Button>
          )}
        </div>
        <div
          id="qr-reader"
          ref={scannerRef}
          className={cn('mx-auto rounded-lg overflow-hidden', scannerActive ? 'block' : 'hidden')}
          style={{ maxWidth: 400 }}
        />
      </div>

      {/* Manual Entry */}
      <div className="rounded-xl bg-bg-secondary border border-border-default p-6">
        <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Search className="w-5 h-5" />
          Manual Ticket Search
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleCheckIn(ticketInput)
          }}
          className="flex gap-3"
        >
          <Input
            placeholder="Enter ticket ID (e.g., FFEST-EXT-A3B7C9)"
            value={ticketInput}
            onChange={(e) => setTicketInput(e.target.value.toUpperCase())}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !ticketInput.trim()}>
            {loading ? 'Checking...' : 'Check In'}
          </Button>
        </form>
      </div>

      {/* Result Display */}
      {result && (() => {
        const colors = resultColors[result.status]
        const ResultIcon = colors.icon
        return (
          <div className={cn('rounded-xl border p-6', colors.bg, colors.border)}>
            <div className="flex items-start gap-3">
              <ResultIcon className={cn('w-6 h-6 shrink-0', colors.text)} />
              <div>
                <p className={cn('font-heading font-semibold', colors.text)}>{result.message}</p>
                {result.participant && (
                  <div className="mt-3 space-y-1 text-sm">
                    <p className="text-text-primary">Name: <span className="font-medium">{result.participant.full_name}</span></p>
                    <p className="text-text-secondary">Type: {result.participant.type}</p>
                    <p className="text-text-secondary">Ticket: <span className="font-mono">{result.participant.ticket_id}</span></p>
                    <p className="text-text-secondary">Email: {result.participant.email}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
