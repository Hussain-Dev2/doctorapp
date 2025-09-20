"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Api from "../_utils/Api";

type Doctor = {
  id?: string | number;
  name?: string;
  image?: Array<{ url?: string }>;
  category?: { name?: string };
  experience?: number | string;
  about?: string;
};

interface DoctorCardProps {
  doctor: Doctor;
  index?: number;
}

function DoctorCard({ doctor, index = 0 }: DoctorCardProps) {
  const d = doctor;
  const [date, setdate] = useState(new Date());
  const [TimeSlot, settimeSlot] = useState<{ time: string }[]>([]);
  const [selectedtime, setselectedtime] = useState<string | null>(null);
  const { user } = useKindeBrowserClient();
  const booking = () => {
    const payload = {
      data: {
        doctor: d.id ? Number(d.id) : d.id,
        username: user
          ? `${user.given_name ?? ""} ${user.family_name ?? ""}`
          : "",
        email: user?.email ?? "",
        date: date ? date.toISOString() : null,
        time: selectedtime,
      },
    };
   
    
    Api.BookAppointment(payload)
      .then((res) => {
        if (res) {
          console.log("appo", res.data);
          toast("Appointment booked successfully");
        }
      })
      .catch((err) => {
        // Prefer server-provided validation details when present
        console.error(
          "booking error",
          err.response?.data?.error || err.response?.data || err.message || err
        );
        // show server message if present
        const serverMsg =
          err.response?.data?.error?.message || err.response?.data?.message;
        if (serverMsg) toast.error?.(String(serverMsg));
        else toast.error?.("Failed to book appointment");
      });
  };
  const passday = (day: Date): boolean => {
    return day < new Date();
  };
  const getTime = () => {
    const SetTime = [];
    for (let i = 8; i < 2; i++) {
      SetTime.push({
        time: i + ":00AM",
      });
      SetTime.push({
        time: i + ":30AM",
      });
    }
    for (let i = 4; i < 12; i++) {
      SetTime.push({
        time: i + ":00PM",
      });
      SetTime.push({
        time: i + ":30PM",
      });
    }
    settimeSlot(SetTime);
  };
  useEffect(() => {
    getTime();
  }, []);

  return (
    <div
      key={d.id || index}
      className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5">
        {d.image?.[0]?.url ? (
          <Image
            src={`http://localhost:1337${d.image[0].url}`}
            alt={d.name || "doctor"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {d.name?.charAt(0) || "D"}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            {d.category?.name || "General"}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          Dr. {d.name}
        </h2>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {d.about ||
            "Experienced medical professional dedicated to providing quality healthcare."}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-muted-foreground">
            {d.experience || "N/A"} years experience
          </span>
        </div>

        <div className="flex gap-2 w-full">
          <Button className="flex-1" size="sm">
            View Profile
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="flex-1 cursor-pointer"
                variant="outline"
                size="sm"
              >
                Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle> Book Appointment </DialogTitle>
                <DialogDescription>
                  <div className="grid md:grid-cols-2 gap-6 grid-cols-1 mt-3">
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setdate}
                        required
                        className="rounded-lg border shadow-sm"
                        disabled={passday}
                      />
                    </div>

                    <div>
                      <div className="grid grid-cols-3 gap-2 border shadow-sm p-3 rounded-lg overflow-hidden">
                        {TimeSlot.map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setselectedtime(item.time)}
                            className={`cursor-pointer border border-border bg-card hover:border-primary hover:bg-primary/5 px-2 py-2 rounded-lg text-[10px] sm:text-xs font-medium transition-all duration-200 whitespace-nowrap overflow-hidden text-ellipsis text-center min-w-0 ${
                              selectedtime === item.time ? "bg-primary/30" : ""
                            }`}
                          >
                            {item.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <Button onClick={booking} disabled={!(date && selectedtime)}>
                Book Now
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
