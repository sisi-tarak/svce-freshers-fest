'use client'

import { Instagram, Youtube, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-default">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-heading font-bold text-xl gradient-text-orange mb-3">
              FRESHERS FEST 2026
            </h3>
            <p className="text-text-muted text-sm mb-1">Precious First</p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Where SVCE Proves It Is Technical. Cultural. Total.
            </p>
            <p className="text-text-muted text-xs mt-3">#PreciousFirstSVCE</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-text-primary mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=SVCE+Tirupati"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-text-secondary text-sm hover:text-text-primary transition-colors"
              >
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                SVCE Campus, Tirupati, Andhra Pradesh
              </a>
              <a
                href="mailto:gdg@svce.ac.in"
                className="flex items-center gap-2 text-text-secondary text-sm hover:text-text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                gdg@svce.ac.in
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-text-secondary text-sm hover:text-text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* Social & Map */}
          <div>
            <h4 className="font-heading font-semibold text-text-primary mb-4">Follow Us</h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://instagram.com/SVCE_GDG"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-bg-tertiary border border-border-default flex items-center justify-center text-text-secondary hover:text-accent-orange hover:border-accent-orange/30 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-bg-tertiary border border-border-default flex items-center justify-center text-text-secondary hover:text-accent-orange hover:border-accent-orange/30 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-bg-tertiary border border-border-default flex items-center justify-center text-text-secondary hover:text-accent-orange hover:border-accent-orange/30 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Mini Map */}
            <div className="rounded-lg overflow-hidden border border-border-default h-32">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.0!2d79.4!3d13.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSVCE+Tirupati!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SVCE Tirupati Location"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border-default flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            © 2026 Freshers Fest — SVCE Tirupati. All rights reserved.
          </p>
          <p className="text-text-muted text-xs flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-accent-orange" /> by GDG Team @ SVCE Tirupati
          </p>
        </div>
      </div>
    </footer>
  )
}
