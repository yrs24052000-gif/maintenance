import { Home } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#275BFC] to-[#4A90FF] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* First Line: Logo and Contact Us */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-[#275BFC]" />
            </div>
            <span className="text-lg">Dormity</span>
          </div>
          
          <div>
            <a href="mailto:hello@dormity.tech" className="text-sm text-white/90 hover:text-white">
              hello@dormity.tech
            </a>
          </div>
        </div>

        {/* Second Line: Copyright and Legal Links */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/80">
              © 2025 Dormity Inc. All rights reserved.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
