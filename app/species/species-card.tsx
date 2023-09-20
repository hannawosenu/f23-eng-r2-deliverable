"use client";

import { Icons } from "@/components/icons"; // Import the Icons component
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useState } from "react";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesCard(species: Species) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="min-w-72 m-4 w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.common_name}</h3>
      <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      {/* Replace with detailed view */}
      <Button className="mt-3 w-full" onClick={openDialog}>
        Learn More
      </Button>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
          <DialogTrigger asChild>
            <Button variant="secondary" onClick={() => setIsDialogOpen(true)}>
              <Icons.add className="mr-3 h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Species Details</DialogTitle>
              <DialogDescription>Details about the species.</DialogDescription>
            </DialogHeader>
            <div>
              <p>Scientific Name: {species.scientific_name}</p>
              <p>Common Name: {species.common_name}</p>
              <p>Total Population: {species.total_population}</p>
              <p>Kingdom: {species.kingdom}</p>
              <p>Description: {species.description}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
