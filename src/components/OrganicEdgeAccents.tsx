import React from 'react';

/**
 * Organic Botanical Leaf & Abstract Blobs Edge Accents
 * Inspired by Scandinavian minimalist botanical art (Monstera line-art + organic sage blobs)
 * Specifically placed on edges to frame the layout tastefully without cluttering.
 */

// Top-styled Monstera Leaf Line Art with Fenestrations
export const MonsteraLeafA: React.FC<{ className?: string; strokeColor?: string }> = ({
  className = "w-64 h-64",
  strokeColor = "#223124",
}) => (
  <svg
    viewBox="0 0 320 380"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Central Midrib / Stem */}
    <path
      d="M45 350 C75 280 120 190 235 45"
      stroke={strokeColor}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Primary Leaf Perimeter with Characteristic Monstera Sinuses & Lobes */}
    <path
      d="M45 350
         C38 320 28 290 20 255
         C15 235 25 220 45 228
         C65 235 85 240 102 240
         C88 215 55 190 35 180
         C22 172 26 158 42 160
         C70 162 108 178 128 182
         C112 152 75 125 58 112
         C46 102 55 90 70 94
         C98 102 135 125 155 135
         C145 105 120 75 108 58
         C98 44 112 34 126 40
         C155 52 188 88 202 105
         C202 78 190 42 185 28
         C180 14 195 8 208 16
         C235 34 250 82 255 110
         C268 95 285 75 300 70
         C312 66 318 78 310 90
         C292 118 268 145 258 170
         C275 160 295 150 310 152
         C322 154 322 168 312 178
         C288 202 258 220 240 235
         C252 232 274 230 288 236
         C298 240 298 252 288 260
         C262 280 225 295 190 305
         C198 312 210 322 215 330
         C220 338 212 346 202 344
         C170 336 128 335 90 342
         C68 346 52 352 45 350 Z"
      stroke={strokeColor}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Secondary Veins branching from Midrib to Lobes */}
    <path
      d="M102 240 C125 235 145 228 162 215"
      stroke={strokeColor}
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M128 182 C148 175 170 162 185 145"
      stroke={strokeColor}
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M155 135 C178 128 200 115 212 95"
      stroke={strokeColor}
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M190 230 C208 240 228 252 245 260"
      stroke={strokeColor}
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M205 180 C228 190 248 198 265 202"
      stroke={strokeColor}
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.85"
    />

    {/* Natural Monstera Fenestrations (Interior cutouts / holes) */}
    {/* Fenestration 1: Oval near mid-left */}
    <ellipse
      cx="145"
      cy="205"
      rx="12"
      ry="20"
      transform="rotate(-28 145 205)"
      stroke={strokeColor}
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Fenestration 2: Medium oval */}
    <ellipse
      cx="178"
      cy="158"
      rx="10"
      ry="17"
      transform="rotate(-32 178 158)"
      stroke={strokeColor}
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Fenestration 3: Small circular hole */}
    <circle
      cx="195"
      cy="120"
      r="7.5"
      stroke={strokeColor}
      strokeWidth="2.2"
    />

    {/* Fenestration 4: Slender oval near top */}
    <ellipse
      cx="218"
      cy="82"
      rx="6"
      ry="12"
      transform="rotate(-30 218 82)"
      stroke={strokeColor}
      strokeWidth="2.0"
    />

    {/* Fenestration 5: Right side lower hole */}
    <ellipse
      cx="210"
      cy="208"
      rx="11"
      ry="19"
      transform="rotate(22 210 208)"
      stroke={strokeColor}
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Fenestration 6: Right side circular hole */}
    <circle
      cx="235"
      cy="165"
      r="7"
      stroke={strokeColor}
      strokeWidth="2.0"
    />
  </svg>
);

// Alternative Angle Monstera Leaf (Upward / Corner Oriented)
export const MonsteraLeafB: React.FC<{ className?: string; strokeColor?: string }> = ({
  className = "w-56 h-56",
  strokeColor = "#223124",
}) => (
  <svg
    viewBox="0 0 300 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Stem */}
    <path
      d="M260 290 C220 240 160 170 70 40"
      stroke={strokeColor}
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Leaf Outline */}
    <path
      d="M260 290
         C250 265 242 245 240 220
         C238 200 220 190 205 200
         C190 210 175 220 160 218
         C170 195 195 175 208 160
         C218 148 210 135 195 140
         C170 148 145 165 130 170
         C140 142 165 120 180 102
         C190 90 182 78 168 82
         C145 88 120 110 105 125
         C112 98 128 78 138 60
         C145 48 135 36 122 42
         C98 55 82 85 70 115
         C68 90 75 65 72 45
         C70 30 52 28 42 40
         C28 60 24 100 28 130
         C15 120 0 115 -5 125
         C-10 135 2 148 18 155
         C38 165 60 172 75 190
         C60 192 42 195 32 205
         C22 215 30 228 45 228
         C70 228 92 225 112 240
         C100 248 85 258 82 270
         C80 280 92 288 105 282
         C135 270 170 262 200 268
         C215 272 240 285 260 290 Z"
      stroke={strokeColor}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Veins */}
    <path
      d="M160 218 C140 210 120 198 105 182"
      stroke={strokeColor}
      strokeWidth="1.5"
      opacity="0.8"
    />
    <path
      d="M130 170 C110 162 92 148 78 135"
      stroke={strokeColor}
      strokeWidth="1.5"
      opacity="0.8"
    />
    <path
      d="M105 125 C88 120 72 108 60 95"
      stroke={strokeColor}
      strokeWidth="1.5"
      opacity="0.8"
    />

    {/* Fenestration holes */}
    <ellipse
      cx="140"
      cy="185"
      rx="10"
      ry="18"
      transform="rotate(35 140 185)"
      stroke={strokeColor}
      strokeWidth="2.2"
    />
    <ellipse
      cx="110"
      cy="145"
      rx="9"
      ry="15"
      transform="rotate(35 110 145)"
      stroke={strokeColor}
      strokeWidth="2.0"
    />
    <circle
      cx="88"
      cy="110"
      r="7"
      stroke={strokeColor}
      strokeWidth="2.0"
    />
    <ellipse
      cx="175"
      cy="180"
      rx="8"
      ry="14"
      transform="rotate(-25 175 180)"
      stroke={strokeColor}
      strokeWidth="2.0"
    />
    <circle
      cx="145"
      cy="135"
      r="6.5"
      stroke={strokeColor}
      strokeWidth="2.0"
    />
  </svg>
);

/**
 * Top-Left Edge Accent
 * Placed on the top-left boundary of the page.
 * Features an undulating vertical sage blob hugging the border, an olive amoeba blob,
 * and a downward-reaching Monstera leaf line art.
 */
export const TopLeftEdgeAccent: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={`absolute top-0 -left-6 sm:left-0 pointer-events-none select-none z-0 overflow-visible transition-opacity duration-700 ${className}`}
    aria-hidden="true"
  >
    <div className="relative w-64 sm:w-80 h-96 sm:h-[430px]">
      {/* 1. Muted Grey-Sage Elongated Edge Blob (undulating down the left boundary like in image) */}
      <svg
        viewBox="0 0 160 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-32 sm:w-40 h-80 sm:h-[360px] opacity-85"
      >
        <path
          d="M0 0
             C50 0 85 45 75 95
             C65 145 95 190 100 230
             C106 280 60 340 30 370
             C10 390 0 380 0 380 Z"
          fill="#869B7B"
        />
      </svg>

      {/* 2. Soft Pale Sage/Celadon Blob */}
      <svg
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-28 left-12 sm:left-16 w-36 sm:w-48 h-40 sm:h-52 opacity-80"
      >
        <path
          d="M50 30
             C120 10 185 45 190 105
             C195 165 140 215 75 205
             C15 195 -10 140 10 85
             C20 50 30 35 50 30 Z"
          fill="#C4D5BD"
        />
      </svg>

      {/* 3. Subtle Warm Gold / Olive Brand Accent Pebble */}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-6 left-28 sm:left-36 w-20 sm:w-28 h-20 sm:h-28 opacity-45"
      >
        <path
          d="M30 15
             C70 5 110 30 115 65
             C120 100 85 115 50 110
             C15 105 0 75 10 40
             C15 25 20 18 30 15 Z"
          fill="#C49A45"
        />
      </svg>

      {/* 4. Monstera Leaf Line Art (Angled inward into the page across the blobs) */}
      <div className="absolute -top-4 left-6 sm:left-12 rotate-[-12deg] drop-shadow-xs">
        <MonsteraLeafA className="w-56 sm:w-72 h-64 sm:h-80" strokeColor="#1C2E20" />
      </div>
    </div>
  </div>
);

/**
 * Mid-Right Edge Accent
 * Placed along the right edge of a section (e.g. Products or Why Choose Us).
 * Extends naturally off the right border into the margin.
 */
export const MidRightEdgeAccent: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={`absolute -right-8 sm:-right-4 pointer-events-none select-none z-0 overflow-visible transition-opacity duration-700 ${className}`}
    aria-hidden="true"
  >
    <div className="relative w-64 sm:w-80 h-80 sm:h-96">
      {/* Primary Olive/Sage Blob extending from right border */}
      <svg
        viewBox="0 0 220 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-4 right-0 w-44 sm:w-56 h-56 sm:h-72 opacity-85"
      >
        <path
          d="M220 0
             C160 10 90 50 70 110
             C50 170 110 230 160 250
             C190 260 220 240 220 240 Z"
          fill="#94A887"
        />
      </svg>

      {/* Secondary Light Celadon Blob */}
      <svg
        viewBox="0 0 160 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-28 right-24 sm:right-32 w-32 sm:w-44 h-36 sm:h-48 opacity-75"
      >
        <path
          d="M140 20
             C80 0 20 40 10 95
             C0 150 50 180 100 170
             C145 160 170 110 160 60
             C155 35 148 25 140 20 Z"
          fill="#C8D8C0"
        />
      </svg>

      {/* Monstera Leaf Line Art pointing inward from the right */}
      <div className="absolute top-2 right-4 rotate-[145deg] scale-x-[-1] drop-shadow-xs">
        <MonsteraLeafB className="w-52 sm:w-64 h-56 sm:h-72" strokeColor="#1C2E20" />
      </div>
    </div>
  </div>
);

/**
 * Lower-Left Edge Accent
 * Placed along the lower left edge (e.g., near Why Choose Us or About section).
 * Recreates the bottom portion of the reference image.
 */
export const LowerLeftEdgeAccent: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={`absolute -left-6 sm:-left-2 pointer-events-none select-none z-0 overflow-visible transition-opacity duration-700 ${className}`}
    aria-hidden="true"
  >
    <div className="relative w-64 sm:w-80 h-80 sm:h-96">
      {/* Light Mint/Sage Rounded Organic Base Blob */}
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-4 left-0 w-44 sm:w-56 h-44 sm:h-56 opacity-85"
      >
        <path
          d="M0 80
             C0 80 40 20 110 30
             C180 40 230 110 210 175
             C190 235 110 240 50 220
             C10 205 0 170 0 170 Z"
          fill="#C8DAC1"
        />
      </svg>

      {/* Medium Olive-Moss Organic Overlay Blob */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-16 left-20 sm:left-28 w-36 sm:w-48 h-36 sm:h-48 opacity-80"
      >
        <path
          d="M30 30
             C90 10 160 40 180 95
             C200 150 160 195 100 190
             C40 185 10 140 10 90
             C10 50 15 35 30 30 Z"
          fill="#8CA180"
        />
      </svg>

      {/* Upward Reaching Monstera Leaf (bottom left composition from image) */}
      <div className="absolute bottom-0 left-2 rotate-[25deg] drop-shadow-xs">
        <MonsteraLeafB className="w-56 sm:w-72 h-60 sm:h-76" strokeColor="#1E3122" />
      </div>
    </div>
  </div>
);

/**
 * Pre-Footer / Bottom-Right Edge Accent
 * Tasteful subtle touch on the right margin before the footer.
 */
export const BottomRightEdgeAccent: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={`absolute -right-8 sm:-right-4 pointer-events-none select-none z-0 overflow-visible transition-opacity duration-700 ${className}`}
    aria-hidden="true"
  >
    <div className="relative w-60 sm:w-72 h-72 sm:h-84">
      {/* Fluid Sage Blob */}
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-0 w-40 sm:w-52 h-48 sm:h-60 opacity-80"
      >
        <path
          d="M200 20
             C140 10 80 50 60 110
             C40 170 90 230 150 240
             C185 245 200 230 200 230 Z"
          fill="#869B7B"
        />
      </svg>

      {/* Pale mint accent */}
      <svg
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-20 right-24 sm:right-32 w-28 sm:w-36 h-28 sm:h-36 opacity-75"
      >
        <path
          d="M20 30
             C65 10 120 25 130 70
             C140 115 100 135 60 130
             C20 125 0 95 5 60
             C8 40 12 33 20 30 Z"
          fill="#CFDEC7"
        />
      </svg>

      {/* Monstera leaf pointing gently inward */}
      <div className="absolute bottom-2 right-4 rotate-[-30deg] scale-x-[-1] drop-shadow-xs">
        <MonsteraLeafA className="w-52 sm:w-64 h-56 sm:h-68" strokeColor="#1C2E20" />
      </div>
    </div>
  </div>
);

/**
 * Layout-Level Edge Accents Wrapper
 * Provides subtle edge anchors at key margin spots without cluttering the page.
 */
export const LayoutEdgeAccents: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {/* Top Left Accent */}
      <TopLeftEdgeAccent className="opacity-90" />
      {/* Bottom Right Accent */}
      <BottomRightEdgeAccent className="bottom-0 opacity-85" />
    </div>
  );
};
