"use client";

import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Project = {
  projectId: number;
  userId: number;
  deadlineFrom: Date;
  deadlineTo: Date;
  submission: string;
  status: string;
  user: {
    name: string;
  };
};

function DialogDemo({ code }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Hasil Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hasil Project</DialogTitle>
          <DialogDescription>
            <pre>{code}</pre>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

async function SubmitPopover({
  status,
  projectId,
  userId,
}: {
  status: string;
  projectId: number;
  userId: number;
}) {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const handleChange = async (newStatus: string) => {
    try {
      const response = await fetch(
        `/api/project?projectId=${projectId}&userId=${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      setSelectedStatus(newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Select
      value={selectedStatus}
      onValueChange={(value) => {
        handleChange(value);
      }}
    >
      <SelectTrigger>{selectedStatus}</SelectTrigger>
      <SelectContent>
        <SelectItem value="SUBMITTED">SUBMITTED</SelectItem>
        <SelectItem value="FINISHED">FINISHED</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default function TableDemo() {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/project/`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setProjects(result.data);
      } catch (error) {
        console.error("gagal");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="mb-4 text-primary font-serif tracking-wide">
        Hasil Project Siswa
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Hasil</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{project.user.name}</TableCell>
              <TableCell>
                {new Date(project.deadlineFrom).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                -{" "}
                {new Date(project.deadlineTo).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <DialogDemo code={project.submission} />
              </TableCell>
              <TableCell>
                <SubmitPopover
                  status={project.status}
                  projectId={project.projectId}
                  userId={project.userId}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
