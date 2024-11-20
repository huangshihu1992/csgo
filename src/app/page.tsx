'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AppLayout from './components/app-layout'

// 武器箱数据
const WEAPON_CASES = [
  {
    id: 1,
    name: '奥术神器',
    price: 0.66,
    image: '/images/logo.png',
    effect: 'fire'
  },
  {
    id: 2,
    name: '魔术之火',
    price: 1.11,
    image: '/images/logo.png',
    effect: 'red'
  },
  {
    id: 3,
    name: '东方神起',
    price: 1.88,
    image: '/images/logo.png',
    effect: 'purple'
  },
  {
    id: 4,
    name: '神秘的魔杖',
    price: 2.60,
    image: '/images/logo.png',
    effect: 'blue'
  },
  {
    id: 5,
    name: '网霸至尊',
    price: 4.68,
    image: '/images/logo.png',
    effect: 'green'
  }
]



export default function Home() {
  const [isMobile, setIsMobile] = useState(false)


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <AppLayout>
      {/* 武器箱展示区域 */}
      <section className="mt-8 container mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {WEAPON_CASES.map(weaponCase => (
            <Link
              href={`/activity/${weaponCase.id}`}
              key={weaponCase.id}
              className="relative bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition group"
            >
              <div className={`absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30 rounded-lg ${weaponCase.effect === 'fire' ? 'bg-orange-500' :
                weaponCase.effect === 'red' ? 'bg-red-500' :
                  weaponCase.effect === 'purple' ? 'bg-purple-500' :
                    weaponCase.effect === 'blue' ? 'bg-blue-500' :
                      'bg-green-500'
                }`} />
              <Image
                src={weaponCase.image}
                alt={weaponCase.name}
                width={200}
                height={150}
                className="w-full h-auto relative z-10"
              />
              <div className="mt-2 relative z-10">
                <h3 className="font-medium">{weaponCase.name}</h3>
                <span className="text-yellow-500">￥ {weaponCase.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </AppLayout>
  )
}