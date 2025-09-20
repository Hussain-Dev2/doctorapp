"use client"
import Api from '@/app/_utils/Api'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/ui/Loader'
import DoctorCard from '@/app/_componets/DoctorCard'

interface Doctor {
  id: string | number;
  name: string;
  about: string;
  experience: string;
  image: Array<{ url: string }>;
  category: { name: string };
}

function DoctorList2({params}: {params: Promise<{cname: string}>}) {
  const resolvedParams = React.use(params)
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=>{
    const getDoctorByCategory = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const res = await Api.getDoctorByCategory(resolvedParams.cname)
        setDoctors(res.data.data || [])
      } catch (err) {
        setError('Failed to load doctors')
        console.error('Error fetching doctors:', err)
      } finally {
        setIsLoading(false)
      }
    }
    getDoctorByCategory()
  },[resolvedParams.cname])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner size={40} />
          <p className="mt-4 text-muted-foreground">Loading doctors...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {resolvedParams.cname} Specialists
          </h1>
          <p className="text-muted-foreground">
            Find experienced {resolvedParams.cname.toLowerCase()} doctors in your area
          </p>
        </div>

        {doctors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No doctors found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor, index) => (
              <DoctorCard key={doctor.id || index} doctor={doctor} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorList2;