
import React from 'react'
import DoctorCard from './DoctorCard'

type Doctor = {
  id?: string | number
  name?: string
  image?: Array<{ url?: string }>
  category?: { name?: string }
  experience?: number | string
  about?: string
}

function DoctorsList({ doctors }: { doctors?: Doctor[] }) {
  if (!doctors || doctors.length === 0) {
    return (
      <div className="p-3 flex items-center justify-center text-muted-foreground">
        No doctors found.
      </div>
    );
  }
            
  return (
  <div>
    <h2 className='text-3xl font-bold tracking-tight text-foreground mb-6'>
      <span className="text-primary">Popular</span> Doctors
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor: Doctor, index:number) => (
              <DoctorCard key={doctor.id || index} doctor={doctor} index={index} />
            ))}
                

    </div>
       
  </div>
  )
}

export default DoctorsList