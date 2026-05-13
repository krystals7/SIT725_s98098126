const mongoose = require('mongoose');
// Updated to look for the haircutModel
const Haircut = require('../models/haircutModel'); 

const haircutData = [
  {
    id: "h1",
    salonType: "Hairdresser",
    name: "Sage Beauty Salon",
    stylist: "Bobby Grear",
    location: "2a Jaques Avenue Bondi Beach NSW 2026",
    phone: "(02) 7912 4347",
    service: "Haircuts",
    price: 110.25
  },
  {
    id: "h2",
    salonType: "Barber",
    name: "Toni & Guy",
    stylist: "Henry Parker",
    location: "70 Hall Street Bondi Beach NSW 2026",
    phone: "(02) 9365 2655",
    service: "Haircut & Shave",
    price: 65.95
  },
  {
    id: "h3",
    salonType: "Hairdresser",
    name: "Ana’s On Bondi",
    stylist: "Ana Kubric",
    location: "8 Consett Avenue Bondi Beach NSW 2026",
    phone: "(02) 9365 0054",
    service: "Haircut & Dye",
    price: 159.75
  },
  {
    id: "h4",
    salonType: "Barber",
    name: "Bondi Barber Lounge",
    stylist: "Greg Hunt",
    location: "124b Roscoe Street Bondi Beach NSW 2026",
    phone: "1300 768 399",
    service: "Haircut",
    price: 49.50
  },
  {
    id: "h5",
    salonType: "Hairdresser",
    name: "Kelp Hairdressing",
    stylist: "Sarah Neval",
    location: "18 Campbell Parade Bondi Beach NSW 2026",
    phone: "(02) 9300 0808",
    service: "Haircut & Dye",
    price: 139.45
  }
];

const seedDB = async () => {
  try {
    // Clears old haircuts and adds the new list
    await Haircut.deleteMany({});
    await Haircut.insertMany(haircutData);
    console.log("Database Seeded Successfully with Haircuts!");
    process.exit();
  } catch (error) {
    console.log("Error seeding database:", error);
    process.exit(1);
  }
};