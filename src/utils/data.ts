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

export const ListProject: Project[] = [
  {
    namaProject: "Project 1",
    deskripsi: "Deskripsi Project 1",
    ringkasan: "Ini ringkasan Project",
    link: "/project/coba",
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
