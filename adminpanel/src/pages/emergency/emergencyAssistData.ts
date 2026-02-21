// src/data/emergencyAssistData.ts
/*
export const buses = [
  { name: "Avadi" },
  { name: "Ambattur" },
  { name: "Adyar" },
  { name: "Anakaputhur" },
  { name: "Chengelpet" },
  
];

export const nearbyBusesData: Record<string, any[]> = {
  Avadi: [
    { bus: "Medavakkam", driver: "R. Raja", phone: "98765 43210", distance: "220 m" },
    { bus: "Ambattur", driver: "M. Murugan", phone: "91234 56789", distance: "350 m" },
  ],
  Ambattur: [
    { bus: "Adyar", driver: "C. Chandran", phone: "99887 76655", distance: "610 m" },
    { bus: "Chengelpet", driver: "P. Paramasivam", phone: "89654 32109", distance: "1.2 km" },
  ],
  Adyar: [
    { bus: "Avadi", driver: "S. Senthil", phone: "95432 19876", distance: "800 m" },
    { bus: "Anakaputhur", driver: "G. Gopal", phone: "90909 10101", distance: "950 m" },
  ],
  Anakaputhur: [
    { bus: "Avadi", driver: "K. Kumar", phone: "99887 55443", distance: "500 m" },
    { bus: "Ambattur", driver: "R. Ravi", phone: "90000 12345", distance: "720 m" },
  ],
  Chengelpet: [
    { bus: "Adyar", driver: "M. Mani", phone: "87654 32100", distance: "1.1 km" },
    { bus: "Avadi", driver: "L. Logan", phone: "93456 87654", distance: "1.3 km" },
  ],
};
*/

//emergencyAssistData.ts

export const buses = [
  { name: "Avadi" },
  { name: "Ambattur" },
  { name: "Adyar" },
  { name: "Anakaputhur" },
  { name: "Chengelpet" },
  { name: "ECR - 1" },
  { name: "ECR - 2" },
  { name: "Kalpakkam" },
  { name: "Koyambedu" },
  { name: "Medavakkam" },
  { name: "Madipakkam-I" },
  { name: "Madipakkam-II" },
  { name: "Madhavaram" },
  { name: "Padappai" },
  { name: "Poonamallee" },
  { name: "Tambaram" },
  { name: "Thiruvottriyur" },
  { name: "West Mambalam" },
  { name: "Velachery" },
];

// Fisher–Yates shuffle
const shuffleArray = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// helper to generate dummy drivers
const getDriver = (bus: string, index: number) => ({
  bus,
  driver: `Driver ${index + 1}`,
  phone: `9${Math.floor(100000000 + Math.random() * 899999999)}`,
  distance: `${200 + index * 100} m`,
});

export const nearbyBusesData: Record<string, any[]> = {};

buses.forEach(busObj => {
  const busName = busObj.name;
  const others = buses.filter(b => b.name !== busName);
  const randomized = shuffleArray(others); // randomize order
  nearbyBusesData[busName] = randomized.map((b, idx) =>
    getDriver(b.name, idx)
  );
});
