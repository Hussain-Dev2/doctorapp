"use client";


import React, { useEffect, useState } from 'react'
import Hero from './_componets/Hero'
import CategorySearch from './_componets/CategorySearch'
import DoctorsList from './_componets/DoctorsList'
import Api from './_utils/Api';
import { PageLoader } from '@/components/ui/Loader';

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getDoctorsList = () => {
    setIsLoading(true);
    Api.getDoctorsList()
      .then((res) => {
        setDoctors(res.data.data);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getDoctorsList();
  }, []);

  if (isLoading) return <PageLoader />

  return (
    <div>
      <Hero />
      <CategorySearch />
      <DoctorsList doctors={doctors} />
    </div>
  )
}

export default Home