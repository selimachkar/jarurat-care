import connectToDatabase from "./db";
async function getHospitalLocations() {
    console.log('getHospitalLocations function is being called');
    try {
        const db = await connectToDatabase();
        const hospitalsCollection = db.collection('locations');
        const hospitalsCursor = hospitalsCollection.find({}); // Use a cursor for efficiency
        const hospitals = [];

        for await (const doc of hospitalsCursor) { // Iterate through the cursor
            hospitals.push({
                id: doc._id.toString(), // Convert ObjectId to String
                url: doc.url,
                city: doc.city,
                name: doc.name
            });
        }
        console.log('Fetched hospitals from MongoDB (converted to plain objects):', hospitals.slice(0, 2)); // Log a snippet
        return hospitals;
    } catch (e) {
        console.error("Error fetching hospital locations from MongoDB:", e);
        return [];
    }
}

export default getHospitalLocations;