import { Stop } from './stops';

export function generateSceneSVG(stop: Stop): string {
  const c = stop.svgColors;
  const svgs: Record<string, string> = {
    'jardins': `<svg viewBox="0 0 800 500" class="svg-scene" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="${c.sky}"/>
      <rect y="280" width="800" height="220" fill="${c.ground}"/>
      <rect y="270" width="800" height="20" fill="#6aad4e" rx="10"/>
      <rect x="80" y="220" width="640" height="60" fill="#c9b99a" rx="4"/>
      <rect x="85" y="225" width="50" height="25" fill="#b8a888" rx="2"/>
      <rect x="140" y="225" width="45" height="25" fill="#bfae92" rx="2"/>
      <rect x="190" y="225" width="55" height="25" fill="#b5a580" rx="2"/>
      <rect x="250" y="225" width="50" height="25" fill="#c0af95" rx="2"/>
      <rect x="85" y="252" width="48" height="25" fill="#baa88c" rx="2"/>
      <rect x="138" y="252" width="52" height="25" fill="#b3a280" rx="2"/>
      <circle cx="200" cy="200" r="12" fill="${c.accent}"/>
      <circle cx="250" cy="210" r="10" fill="#ff6b9d"/>
      <circle cx="310" cy="195" r="13" fill="#ffa07a"/>
      <circle cx="370" cy="208" r="11" fill="${c.accent}"/>
      <circle cx="430" cy="198" r="12" fill="#ff69b4"/>
      <circle cx="490" cy="205" r="10" fill="#ff7f50"/>
      <circle cx="550" cy="195" r="14" fill="${c.accent}"/>
      <circle cx="610" cy="210" r="11" fill="#ff6b9d"/>
      <line x1="200" y1="212" x2="200" y2="270" stroke="#228B22" stroke-width="3"/>
      <line x1="250" y1="220" x2="250" y2="270" stroke="#228B22" stroke-width="3"/>
      <line x1="310" y1="208" x2="310" y2="270" stroke="#228B22" stroke-width="3"/>
      <line x1="370" y1="219" x2="370" y2="270" stroke="#228B22" stroke-width="3"/>
      <line x1="430" y1="210" x2="430" y2="270" stroke="#228B22" stroke-width="3"/>
      <line x1="490" y1="215" x2="490" y2="270" stroke="#228B22" stroke-width="3"/>
      <line x1="550" y1="209" x2="550" y2="270" stroke="#228B22" stroke-width="3"/>
      <line x1="610" y1="221" x2="610" y2="270" stroke="#228B22" stroke-width="3"/>
      <rect x="150" y="310" width="500" height="8" fill="#3a7a22" rx="4"/>
      <rect x="150" y="340" width="500" height="8" fill="#4a8a32" rx="4"/>
      <rect x="150" y="370" width="500" height="8" fill="#3a7a22" rx="4"/>
      <rect x="150" y="400" width="500" height="8" fill="#4a8a32" rx="4"/>
      <ellipse cx="150" cy="80" rx="60" ry="30" fill="white" opacity="0.8"/>
      <ellipse cx="190" cy="75" rx="40" ry="25" fill="white" opacity="0.8"/>
      <ellipse cx="600" cy="60" rx="70" ry="28" fill="white" opacity="0.7"/>
    </svg>`,
    'ateliers': `<svg viewBox="0 0 800 500" class="svg-scene" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="${c.sky}"/>
      <rect y="320" width="800" height="180" fill="${c.ground}"/>
      <rect x="180" y="160" width="440" height="160" fill="#f5e6d0"/>
      <path d="M160 160 Q400 40 640 160 Z" fill="${c.accent}"/>
      <path d="M170 160 Q400 50 630 160 Z" fill="#b8865a"/>
      <rect x="240" y="200" width="100" height="120" fill="#6B4226" rx="8"/>
      <rect x="460" y="200" width="100" height="120" fill="#6B4226" rx="8"/>
      <rect x="250" y="210" width="36" height="100" fill="#8B6914" rx="2"/>
      <rect x="294" y="210" width="36" height="100" fill="#8B6914" rx="2"/>
      <rect x="470" y="210" width="36" height="100" fill="#8B6914" rx="2"/>
      <rect x="514" y="210" width="36" height="100" fill="#8B6914" rx="2"/>
      <circle cx="400" cy="130" r="25" fill="#87CEEB" stroke="#f5e6d0" stroke-width="6"/>
      <line x1="400" y1="105" x2="400" y2="155" stroke="#f5e6d0" stroke-width="3"/>
      <line x1="375" y1="130" x2="425" y2="130" stroke="#f5e6d0" stroke-width="3"/>
      <rect x="360" y="380" width="80" height="10" fill="#555" rx="2"/>
      <rect x="375" y="360" width="50" height="20" fill="#666" rx="4"/>
      <rect x="385" y="345" width="30" height="15" fill="#777" rx="2"/>
      <rect x="330" y="80" width="20" height="80" fill="#c9b99a"/>
      <circle cx="340" cy="70" r="12" fill="#ccc" opacity="0.5"/>
      <circle cx="348" cy="50" r="15" fill="#ccc" opacity="0.4"/>
      <circle cx="335" cy="30" r="18" fill="#ccc" opacity="0.3"/>
    </svg>`,
    'grande-maison': `<svg viewBox="0 0 800 500" class="svg-scene" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="${c.sky}"/>
      <rect y="350" width="800" height="150" fill="${c.ground}"/>
      <rect x="200" y="120" width="400" height="230" fill="#fff4d4"/>
      <polygon points="180,120 400,20 620,120" fill="${c.accent}"/>
      <polygon points="190,120 400,30 610,120" fill="#c02828"/>
      <line x1="400" y1="120" x2="400" y2="350" stroke="#6B4226" stroke-width="6"/>
      <line x1="200" y1="200" x2="600" y2="200" stroke="#6B4226" stroke-width="4"/>
      <line x1="200" y1="280" x2="600" y2="280" stroke="#6B4226" stroke-width="4"/>
      <line x1="200" y1="120" x2="400" y2="200" stroke="#6B4226" stroke-width="4"/>
      <line x1="400" y1="120" x2="200" y2="200" stroke="#6B4226" stroke-width="4"/>
      <line x1="400" y1="120" x2="600" y2="200" stroke="#6B4226" stroke-width="4"/>
      <line x1="600" y1="120" x2="400" y2="200" stroke="#6B4226" stroke-width="4"/>
      <rect x="250" y="140" width="40" height="45" fill="#87CEEB" stroke="#6B4226" stroke-width="3"/>
      <rect x="510" y="140" width="40" height="45" fill="#87CEEB" stroke="#6B4226" stroke-width="3"/>
      <rect x="250" y="220" width="40" height="45" fill="#87CEEB" stroke="#6B4226" stroke-width="3"/>
      <rect x="510" y="220" width="40" height="45" fill="#87CEEB" stroke="#6B4226" stroke-width="3"/>
      <rect x="250" y="295" width="40" height="45" fill="#87CEEB" stroke="#6B4226" stroke-width="3"/>
      <rect x="510" y="295" width="40" height="45" fill="#87CEEB" stroke="#6B4226" stroke-width="3"/>
      <rect x="370" y="290" width="60" height="60" fill="#6B4226" rx="30 30 0 0"/>
      <circle cx="418" cy="325" r="4" fill="#dc6f45"/>
      <circle cx="120" cy="280" r="45" fill="#2E8B57"/>
      <rect x="115" y="325" width="10" height="40" fill="#6B4226"/>
      <circle cx="700" cy="290" r="40" fill="#228B22"/>
      <rect x="695" y="330" width="10" height="35" fill="#6B4226"/>
    </svg>`,
    'tipis': `<svg viewBox="0 0 800 500" class="svg-scene" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="${c.sky}"/>
      <rect y="340" width="800" height="160" fill="${c.ground}"/>
      <circle cx="50" cy="260" r="50" fill="#2E8B57" opacity="0.6"/>
      <circle cx="130" cy="250" r="55" fill="#228B22" opacity="0.5"/>
      <circle cx="700" cy="255" r="52" fill="#2E8B57" opacity="0.6"/>
      <circle cx="770" cy="265" r="45" fill="#228B22" opacity="0.5"/>
      <polygon points="250,340 350,340 300,140" fill="${c.accent}" stroke="#8B7355" stroke-width="3"/>
      <line x1="300" y1="140" x2="300" y2="120" stroke="#8B7355" stroke-width="4"/>
      <line x1="300" y1="120" x2="310" y2="110" stroke="#8B7355" stroke-width="3"/>
      <line x1="300" y1="120" x2="290" y2="108" stroke="#8B7355" stroke-width="3"/>
      <polygon points="275,340 300,280 325,340" fill="#6B4226"/>
      <polygon points="420,340 540,340 480,160" fill="#D2B48C" stroke="#8B7355" stroke-width="3"/>
      <line x1="480" y1="160" x2="480" y2="138" stroke="#8B7355" stroke-width="4"/>
      <line x1="480" y1="138" x2="490" y2="128" stroke="#8B7355" stroke-width="3"/>
      <line x1="480" y1="138" x2="470" y2="126" stroke="#8B7355" stroke-width="3"/>
      <polygon points="455,340 480,275 505,340" fill="#6B4226"/>
      <polygon points="600,340 680,340 640,200" fill="${c.accent}" opacity="0.7" stroke="#8B7355" stroke-width="2"/>
      <line x1="640" y1="200" x2="640" y2="185" stroke="#8B7355" stroke-width="3"/>
      <circle cx="390" cy="400" r="25" fill="#8B4513" opacity="0.3"/>
      <polygon points="385,400 390,370 395,400" fill="#FF6347"/>
      <polygon points="378,400 385,378 392,400" fill="#FFA500"/>
      <polygon points="392,400 397,380 402,400" fill="#FF4500"/>
      <circle cx="680" cy="80" r="40" fill="#FFD700"/>
    </svg>`,
    'mere-mitage': `<svg viewBox="0 0 800 500" class="svg-scene" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="${c.sky}"/>
      <rect y="330" width="800" height="170" fill="${c.ground}"/>
      <rect x="150" y="180" width="200" height="150" fill="#e8dcc8"/>
      <polygon points="140,180 250,100 360,180" fill="#8B7355"/>
      <rect x="150" y="250" width="200" height="80" fill="#c9b99a"/>
      <rect x="155" y="255" width="30" height="18" fill="#b8a888"/>
      <rect x="190" y="255" width="35" height="18" fill="#bfae92"/>
      <rect x="230" y="255" width="30" height="18" fill="#b5a580"/>
      <rect x="350" y="150" width="280" height="180" fill="#f0ddb8"/>
      <polygon points="340,150 490,70 640,150" fill="${c.accent}"/>
      <rect x="340" y="200" width="20" height="130" fill="#d9c9a8"/>
      <rect x="190" y="200" width="30" height="40" fill="#87CEEB" stroke="#6B4226" stroke-width="2"/>
      <circle cx="290" cy="150" r="15" fill="#87CEEB" stroke="#6B4226" stroke-width="2"/>
      <rect x="400" y="180" width="45" height="55" fill="#87CEEB" stroke="#f0ddb8" stroke-width="3" rx="22 22 0 0"/>
      <rect x="500" y="180" width="45" height="55" fill="#87CEEB" stroke="#f0ddb8" stroke-width="3" rx="22 22 0 0"/>
      <rect x="560" y="260" width="50" height="70" fill="#6B4226" rx="25 25 0 0"/>
      <circle cx="160" cy="200" r="10" fill="#228B22" opacity="0.7"/>
      <circle cx="175" cy="190" r="8" fill="#2E8B57" opacity="0.6"/>
      <circle cx="155" cy="185" r="9" fill="#228B22" opacity="0.5"/>
      <circle cx="170" cy="178" r="7" fill="#2E8B57" opacity="0.7"/>
    </svg>`,
    'plateau': `<svg viewBox="0 0 800 500" class="svg-scene" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="${c.sky}"/>
      <path d="M0 350 Q200 250 400 300 Q600 250 800 320 L800 500 L0 500 Z" fill="#8fbc8f" opacity="0.4"/>
      <path d="M0 380 Q150 310 350 340 Q550 300 800 360 L800 500 L0 500 Z" fill="#6aad4e" opacity="0.5"/>
      <path d="M0 400 Q200 350 400 360 Q600 350 800 390 L800 500 L0 500 Z" fill="${c.ground}"/>
      <path d="M0 320 Q400 280 800 310" fill="none" stroke="#228B22" stroke-width="1" opacity="0.3"/>
      <circle cx="100" cy="340" r="20" fill="#2E8B57" opacity="0.5"/>
      <circle cx="130" cy="335" r="22" fill="#228B22" opacity="0.5"/>
      <circle cx="160" cy="340" r="18" fill="#2E8B57" opacity="0.5"/>
      <circle cx="600" cy="330" r="25" fill="#228B22" opacity="0.5"/>
      <circle cx="640" cy="325" r="20" fill="#2E8B57" opacity="0.5"/>
      <circle cx="670" cy="332" r="22" fill="#228B22" opacity="0.5"/>
      <line x1="100" y1="200" x2="250" y2="195" stroke="#4682B4" stroke-width="2" opacity="0.3"/>
      <line x1="300" y1="180" x2="500" y2="175" stroke="#4682B4" stroke-width="2" opacity="0.3"/>
      <line x1="450" y1="210" x2="650" y2="205" stroke="#4682B4" stroke-width="2" opacity="0.3"/>
      <circle cx="400" cy="100" r="50" fill="${c.accent}" opacity="0.2"/>
      <circle cx="400" cy="100" r="35" fill="#FFD700" opacity="0.4"/>
      <circle cx="400" cy="100" r="25" fill="#FFD700" opacity="0.7"/>
      <circle cx="400" cy="345" r="8" fill="#333"/>
      <rect x="396" y="353" width="8" height="20" fill="#333" rx="2"/>
      <path d="M200 420 Q300 430 350 425 Q400 420 450 428" fill="none" stroke="#5a7a3a" stroke-width="3" opacity="0.5" stroke-dasharray="8,4"/>
    </svg>`,
    'maison-foret': `<svg viewBox="0 0 800 500" class="svg-scene" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="${c.sky}"/>
      <rect y="350" width="800" height="150" fill="${c.ground}"/>
      <circle cx="80" cy="230" r="65" fill="#1a5a1a"/>
      <rect x="75" y="295" width="10" height="60" fill="#5a3a1a"/>
      <circle cx="180" cy="200" r="75" fill="#1a6a2a"/>
      <rect x="175" y="275" width="10" height="80" fill="#5a3a1a"/>
      <circle cx="650" cy="210" r="70" fill="#1a5a1a"/>
      <rect x="645" y="280" width="10" height="75" fill="#5a3a1a"/>
      <circle cx="740" cy="240" r="60" fill="#1a6a2a"/>
      <rect x="735" y="300" width="10" height="55" fill="#5a3a1a"/>
      <circle cx="300" cy="180" r="80" fill="#1a7a2a" opacity="0.5"/>
      <circle cx="530" cy="190" r="75" fill="#1a7a2a" opacity="0.5"/>
      <rect x="340" y="250" width="120" height="100" fill="#e8dcc8"/>
      <polygon points="320,250 400,180 480,250" fill="${c.accent}"/>
      <rect x="430" y="195" width="18" height="55" fill="#8B4513"/>
      <rect x="380" y="300" width="40" height="50" fill="#5a3a1a" rx="20 20 0 0"/>
      <rect x="355" y="265" width="25" height="25" fill="#87CEEB" stroke="#5a3a1a" stroke-width="2"/>
      <line x1="367" y1="265" x2="367" y2="290" stroke="#5a3a1a" stroke-width="2"/>
      <line x1="355" y1="277" x2="380" y2="277" stroke="#5a3a1a" stroke-width="2"/>
      <circle cx="345" cy="260" r="8" fill="#228B22" opacity="0.8"/>
      <circle cx="350" cy="275" r="7" fill="#2E8B57" opacity="0.7"/>
      <circle cx="340" cy="290" r="9" fill="#228B22" opacity="0.6"/>
      <circle cx="455" cy="255" r="8" fill="#228B22" opacity="0.7"/>
      <circle cx="460" cy="270" r="7" fill="#2E8B57" opacity="0.8"/>
      <circle cx="360" cy="225" r="6" fill="#556B2F" opacity="0.5"/>
      <circle cx="440" cy="230" r="7" fill="#6B8E23" opacity="0.5"/>
      <path d="M400 350 Q390 380 410 400 Q395 430 400 470" fill="none" stroke="#b8a888" stroke-width="12" stroke-linecap="round" opacity="0.6"/>
      <circle cx="310" cy="365" r="5" fill="#CD853F"/>
      <rect x="309" y="367" width="3" height="6" fill="#DEB887"/>
      <circle cx="500" cy="370" r="4" fill="#D2691E"/>
      <rect x="499" y="372" width="3" height="5" fill="#DEB887"/>
    </svg>`
  };
  return svgs[stop.id] || svgs['jardins'];
}
