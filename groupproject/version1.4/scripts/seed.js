const mongoose = require('mongoose');
const Haircut = require('../models/haircutModel');

const haircutData = [
  { id: 'h1', salonType: 'Hairdresser', name: 'Sage Beauty Salon', stylist: 'Bobby Grear', location: '2a Jaques Avenue Bondi Beach NSW 2026', postcode: '2026', phone: '(02) 7912 4347', service: 'Haircuts', price: 110.25, duration: '60 min', description: 'Professional haircut service in Bondi Beach.' },
  { id: 'h2', salonType: 'Barber', name: 'Toni & Guy', stylist: 'Henry Parker', location: '70 Hall Street Bondi Beach NSW 2026', postcode: '2026', phone: '(02) 9365 2655', service: 'Haircut & Shave', price: 65.95, duration: '45 min', description: 'Barber haircut and shave service.' },
  { id: 'h3', salonType: 'Hairdresser', name: 'Ana’s On Bondi', stylist: 'Ana Kubric', location: '8 Consett Avenue Bondi Beach NSW 2026', postcode: '2029', phone: '(02) 9365 0054', service: 'Haircut & Dye', price: 159.75, duration: '90 min', description: 'Haircut and colouring service.' },
  { id: 'h4', salonType: 'Barber', name: 'Bondi Barber Lounge', stylist: 'Greg Hunt', location: '124b Roscoe Street Bondi Beach NSW 2026', postcode: '2026', phone: '1300 768 399', service: 'Haircut', price: 49.50, duration: '30 min', description: 'Affordable barber haircut service.' },
  { id: 'h5', salonType: 'Hairdresser', name: 'Kelp Hairdressing', stylist: 'Sarah Neval', location: '18 Campbell Parade Bondi Beach NSW 2026', postcode: '2029', phone: '(02) 9300 0808', service: 'Haircut & Dye', price: 139.45, duration: '90 min', description: 'Haircut and dye service near Bondi Beach.' }
];

const seedDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/haircutDB');
    console.log('Connected to MongoDB');

    await Haircut.deleteMany({});
    console.log('Existing haircuts deleted');

    const inserted = await Haircut.insertMany(haircutData);
    
    console.log(`Successfully seeded ${inserted.length} haircuts!`);

  } catch (error) {
    console.error('Seeding Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('Connection closed');
  }
};

seedDB();