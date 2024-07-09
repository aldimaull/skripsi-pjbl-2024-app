interface Materi {
  namaMateri: string;
  deskripsi: string;
  ringkasan: string;
  link: string;
}

interface Project {
  idProject: string;
  namaProject: string;
  deskripsi: string;
  ringkasan: string;
  link: string;
  tenggat?: Date | number | string;
  content: string;
}

export const ListMateri: Materi[] = [
  {
    namaMateri: "Array",
    deskripsi:
      "Array adalah struktur data yang menyimpan sekumpulan elemen bertipe sama dalam satu variabel yang diakses menggunakan indeks.",
    ringkasan:
      "Array memungkinkan penyimpanan dan pengelolaan data yang efisien melalui operasi traversing, pencarian, pengurutan, penambahan, dan penghapusan elemen, serta mendukung bentuk data kompleks seperti matriks.",
    link: "/materi/array",
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

function tanggal(heum: Date) {
  return heum.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const ListProject: Project[] = [
  {
    idProject: "1",
    namaProject: "Palindrom",
    deskripsi: "Deskripsi Project 1",
    ringkasan: "Ini ringkasan Project",
    link: "/project/palindrom",
    tenggat: tanggal(new Date("2024-05-20")),
    content: "palindrom",
  },
  {
    idProject: "2",
    namaProject: "Reverse",
    deskripsi: "Deskripsi Project 2",
    ringkasan: "Ini ringkasan Project",
    link: "/project/reverse",
    tenggat: tanggal(new Date("2024-05-30")),
    content: "palindrom",
  },
  {
    idProject: "3",
    namaProject: "Antri",
    deskripsi: "Deskripsi Project 3",
    ringkasan: "Ini ringkasan Project",
    link: "/project/array",
    tenggat: tanggal(new Date("2024-6-5")),
    content: "palindrom",
  },
  {
    idProject: "4",
    namaProject: "Cuaca",
    deskripsi: "Deskripsi Project 4",
    ringkasan: "Ini ringkasan Project",
    link: "/project/larik",
    tenggat: tanggal(new Date("2024-6-10")),
    content: "palindrom",
  },
];
