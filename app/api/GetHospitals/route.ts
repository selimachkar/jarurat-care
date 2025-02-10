import { NextResponse } from 'next/server';
import getHospitalLocations from '@/Lib/GetLocationData';
export async function GET() {
    try {
        const hospitals = await getHospitalLocations();
        return NextResponse.json(hospitals); // Return JSON response
    } catch (error) {
        console.error("API Error fetching hospitals:", error);
        return NextResponse.json({ error: "Failed to fetch hospital data" }, { status: 500 });
    }
}