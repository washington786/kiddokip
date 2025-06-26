export type CrecheFormData = {
    // Step 1: Basic Info
    name: string;
    registrationNumber: string;
    facilityType: 'Home-based' | 'Center-based' | 'School-affiliated';

    // Step 2: Location
    province: string;
    district: string;
    address: string;
    gpsCoordinates?: { lat: number; lng: number };

    // Step 3: Contact
    contactPerson: string;
    phone: string;
    email?: string;

    // Step 4: Operational
    operatingHours: { open: string; close: string };
    capacity: number;
    ageGroups: string[];

    // Step 5: Compliance
    complianceStatus: 'Pending' | 'Approved' | 'Probation';
    socialWorkerId?: string;
};