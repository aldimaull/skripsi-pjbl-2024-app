interface Materi {
  namaMateri: string;
  deskripsi: string;
  ringkasan: string;
  link: string;
}

interface Project {
  namaProject: string;
  deskripsi: string;
  ringkasan: string;
  link: string;
  tenggat?: Date | number | string;
}

export const ListMateri: Materi[] = [
  {
    namaMateri: "Materi 1",
    deskripsi: "Deskripsi Materi 1",
    ringkasan: "Ini ringkasan materi",
    link: "/materi",
  },
  {
    namaMateri: "Materi 2",
    deskripsi: "Deskripsi Materi 1",
    ringkasan: "Ini ringkasan materi",
    link: "/materi/coba",
  },
  {
    namaMateri: "Materi 1",
    deskripsi: "Deskripsi Materi 1",
    ringkasan: "Ini ringkasan materi",
    link: "/materi/coba",
  },
  {
    namaMateri: "Materi 1",
    deskripsi: "Deskripsi Materi 1",
    ringkasan: "Ini ringkasan materi",
    link: "/materi/coba",
  },
];

let date = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const ListProject: Project[] = [
  {
    namaProject: "Project 1",
    deskripsi: "Deskripsi Project 1",
    ringkasan: "Ini ringkasan Project",
    link: "/project/coba",
    tenggat: date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  },
  {
    namaProject: "Project 2",
    deskripsi: "Deskripsi Project 1",
    ringkasan: "Ini ringkasan Project",
    link: "/project/coba",
  },
  {
    namaProject: "Project 1",
    deskripsi: "Deskripsi Project 1",
    ringkasan: "Ini ringkasan Project",
    link: "/project/coba",
  },
  {
    namaProject: "Project 1",
    deskripsi: "Deskripsi Project 1",
    ringkasan: "Ini ringkasan Project",
    link: "/project/coba",
  },
];
