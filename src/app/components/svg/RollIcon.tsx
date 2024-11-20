export function RollIcon({ className }: { className?: string }) {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        className={className}
      >
        <mask
          id="giveways_svg__a"
          width="24"
          height="24"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'alpha' }}
        >
          <path fill="#D9D9D9" d="M0 0h24v24H0z" />
        </mask>
        <g mask="url(#giveways_svg__a)">
          <path
            fill="url(#giveways_svg__b)"
            fillRule="evenodd"
            d="m6.31 2.757.312-1.245A1 1 0 0 1 8.217.973l3.115 2.493a.3.3 0 0 1-.187.534H7.28a1 1 0 0 1-.97-1.243ZM3.5 6A1.5 1.5 0 0 0 2 7.5v2A1.5 1.5 0 0 0 3.5 11H10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3.5Zm17 0A1.5 1.5 0 0 1 22 7.5v2a1.5 1.5 0 0 1-1.5 1.5H14a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6.5ZM3 14.5A1.5 1.5 0 0 1 4.5 13H10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2v-6.5ZM19.5 13a1.5 1.5 0 0 1 1.5 1.5V21a2 2 0 0 1-2 2h-5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h5.5ZM17.378 1.512l.311 1.245A1 1 0 0 1 16.72 4h-3.864a.3.3 0 0 1-.187-.534L15.783.973a1 1 0 0 1 1.595.539Z"
            clipRule="evenodd"
          />
        </g>
        <defs>
          <linearGradient
            id="giveways_svg__b"
            x1="22"
            x2="1.755"
            y1="22"
            y2="2.002"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF9417" />
            <stop offset="1" stopColor="#FFDA1B" />
          </linearGradient>
        </defs>
      </svg>
    )
  }