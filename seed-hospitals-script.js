// seed-hospitals-script.js
const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables from .env.local if you have them

async function seedDatabase() {
    const locationData = [
        {
            url: "https://www.google.com/maps/search/Sir+Ganga+Ram+Hospital/@28.638134,77.18936,25z",
            city: "Delhi",
            name: "Sir Ganga Ram Hospital"
        },
        {
            url: "https://www.google.com/maps/search/BLK-Max+Super+Speciality+Hospital/@28.64363,77.17953,25z",
            city: "Delhi",
            name: "BLK-Max Super Speciality Hospital"
        },
        {
            url: "https://www.google.com/maps/search/Max+Super+Speciality+Hospital+-+Saket+East+Wing/@28.52774,77.21141,25z",
            city: "Delhi",
            name: "Max Super Speciality Hospital - Saket East Wing"
        },
        {
            url: "https://www.google.com/maps/search/Max+Super+Speciality+Hospital/@28.63317,77.30993,25z",
            city: "Delhi",
            name: "Max Super Speciality Hospital (East Delhi)"
        },
        {
            url: "https://www.google.com/maps/search/Max+Super+Speciality+Hospital/@28.72789,77.15278,25z",
            city: "Delhi",
            name: "Max Super Speciality Hospital (North West Delhi)"
        },
        {
            url: "https://www.google.com/maps/search/Aashlok+Hospital/@28.566555,77.19855,25z",
            city: "Delhi",
            name: "Aashlok Hospital"
        },
        {
            url: "https://www.google.com/maps/search/Ayushman+Hospital+&amp;+Health+Services/@28.59755,77.06795,25z",
            city: "Delhi",
            name: "Ayushman Hospital & Health Services"
        },
        {
            url: "https://www.google.com/maps/search/Manipal+Hospital/@28.593605,77.07052,25z",
            city: "Delhi",
            name: "Manipal Hospital"
        },
        {
            url: "https://www.google.com/maps/search/Max+Smart+Superspeciality+Hospital/@28.52745,77.2139,25z",
            city: "Delhi",
            name: "Max Smart Superspeciality Hospital"
        },
        {
            url: "https://www.google.com/maps/search/CK+Birla+Hospital/@28.667227,77.13206,25z",
            city: "Delhi",
            name: "CK Birla Hospital"
        },
        {
            url: "https://www.google.com/maps/search/Dharamshila+Hospital/@28.613121,77.20827,25z",
            city: "Delhi",
            name: "Dharamshila Hospital"
        },
        {
            url: "https://www.google.com/maps/search/Metro+Hospital+and+Cancer+Institute/@28.638304,77.29521,25z",
            city: "Delhi",
            name: "Metro Hospital and Cancer Institute"
        },
        {
            url: "https://www.google.com/maps/search/Aakash+Health+Care/@28.60496,77.05461,25z",
            city: "Delhi",
            name: "Aakash Health Care"
        },
        {
            url: "https://www.google.com/maps/search/Kalpavriksh+Super+Speciality+Center/@28.597918,77.035126,25z",
            city: "Delhi",
            name: "Kalpavriksh Super Speciality Center"
        },
        {
            url: "https://www.google.com/maps/search/Artemis+Hospitals/@28.568287,77.06276,25z",
            city: "Delhi",
            name: "Artemis Hospitals"
        },
        {
            url: "https://www.google.com/maps/search/Indraprastha+Apollo+Hospitals/@28.54092,77.28346,25z",
            city: "Delhi",
            name: "Indraprastha Apollo Hospitals"
        },
        {
            url: "https://www.google.com/maps/search/Fortis+Hospital/@28.70971,77.16998,25z",
            city: "Delhi",
            name: "Fortis Hospital (North Delhi)"
        },
        {
            url: "https://www.google.com/maps/search/Pushpawati+Singhania+Research+Institute+(PSRI+Hospital)/@28.533442,77.22538,25z",
            city: "Delhi",
            name: "Pushpawati Singhania Research Institute (PSRI Hospital)"
        },
        {
            url: "https://www.google.com/maps/search/Batra+Hospital+&amp;+Medical+Research+Centre/@28.513548,77.24582,25z",
            city: "Delhi",
            name: "Batra Hospital & Medical Research Centre"
        },
        {
            url: "https://www.google.com/maps/search/Delhi+Heart+&amp;+Lung+Institute/@28.641478,77.20489,25z",
            city: "Delhi",
            name: "Delhi Heart & Lung Institute"
        },
        {
            url: "https://www.google.com/maps/search/Max+Super+Speciality+Hospital/@28.63475,77.33286,25z",
            city: "Uttar Pradesh",
            name: "Max Super Speciality Hospital (Ghaziabad)"
        },
        {
            url: "https://www.google.com/maps/search/Regency+Hospital/@26.480335,80.29954,25z",
            city: "Uttar Pradesh",
            name: "Regency Hospital"
        },
        {
            url: "https://www.google.com/maps/search/Apollomedics+Super+Speciality+Hospital/@26.798061,80.90151,25z",
            city: "Uttar Pradesh",
            name: "Apollomedics Super Speciality Hospital"
        },
        {
            url: "https://www.google.com/maps/search/Cosmos+Hospital/@28.894056,78.72906,25z",
            city: "Uttar Pradesh",
            name: "Cosmos Hospital"
        },
        {
            url: "https://www.google.com/maps/search/Max+Multi+Speciality+Centre/@28.57437,77.32293,25z",
            city: "Uttar Pradesh",
            name: "Max Multi Speciality Centre"
        },
        {
            url: "https://www.google.com/maps/search/Fortis+Hospital+Noida/@28.618372,77.3727,25z",
            city: "Uttar Pradesh",
            name: "Fortis Hospital Noida"
        },
        {
            url: "https://www.google.com/maps/search/Surbhi+Hospital/@28.579132,77.36124,25z",
            city: "Uttar Pradesh",
            name: "Surbhi Hospital"
        },
        {
            url: "https://www.google.com/maps/search/Metro+Multispeciality+Hospital/@28.59737,77.33596,25z",
            city: "Uttar Pradesh",
            name: "Metro Multispeciality Hospital"
        },
        {
            url: "https://www.google.com/maps/search/Apollo+Hospitals/@28.579113,77.33434,25z",
            city: "Uttar Pradesh",
            name: "Apollo Hospitals (Noida)"
        },
        {
            url: "https://www.google.com/maps/search/Hospital+NCC/@28.5778,77.3593,25z",
            city: "Uttar Pradesh",
            name: "Hospital NCC"
        }
    ];

    const uri = process.env.MONGODB_URI; // Make sure MONGODB_URI is in your .env.local file
    const dbName = process.env.MONGODB_DB_NAME; // Make sure MONGODB_DB is in your .env.local file
    const collectionName = 'locations'; // Choose your collection name

    if (!uri) {
        throw new Error('MONGODB_URI environment variable is not defined. Please set it in your .env.local file.');
    }
    if (!dbName) {
        throw new Error('MONGODB_DB environment variable is not defined. Please set it in your .env.local file.');
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const hospitalsCollection = db.collection(collectionName);

        // Check if the collection is already seeded (optional)
        const existingHospital = await hospitalsCollection.findOne({});
        if (existingHospital) {
            console.log('Database already seeded. Skipping insertion.');
            return;
        }

        const result = await hospitalsCollection.insertMany(locationData);
        console.log(`Inserted ${result.insertedCount} documents into the '${collectionName}' collection`);
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await client.close();
    }
}

seedDatabase();