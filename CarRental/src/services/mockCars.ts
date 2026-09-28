type CarType = 'hatchback' | 'sedan' | 'suv' | 'estate' | 'cabrio' | 'coupe' | 'minivan';

export interface Car {
    vehicleId: string;
    brand: string;
    model: string;
    productionYear: number;
    fuelType: 'electric' | 'hybrid' | 'diesel' | 'gasoline';
    carType: CarType;
    doors: number;
    trunkCapacity: number;
    color: string;
    dailyPrice: number;
    deposit: number;
}

export const mockCars: Car[] = [
    {
        vehicleId: '1',
        brand: 'Toyota',
        model: 'Yaris',
        productionYear: 2025,
        fuelType: 'gasoline',
        carType: 'hatchback',
        doors: 5,
        trunkCapacity: 286,
        color: 'white',
        dailyPrice: 450,
        deposit: 1500,
    },
    {
        vehicleId: '2',
        brand: 'Volkswagen',
        model: 'Golf',
        productionYear: 2024,
        fuelType: 'hybrid',
        carType: 'hatchback',
        doors: 5,
        trunkCapacity: 381,
        color: 'silver',
        dailyPrice: 600,
        deposit: 2000,
    },
    {
        vehicleId: '3',
        brand: 'Skoda',
        model: 'Octavia',
        productionYear: 2025,
        fuelType: 'diesel',
        carType: 'estate',
        doors: 5,
        trunkCapacity: 600,
        color: 'black',
        dailyPrice: 650,
        deposit: 2000,
    },
    {
        vehicleId: '4',
        brand: 'Kia',
        model: 'Sportage',
        productionYear: 2025,
        fuelType: 'hybrid',
        carType: 'suv',
        doors: 5,
        trunkCapacity: 587,
        color: 'green',
        dailyPrice: 800,
        deposit: 2500,
    },
    {
        vehicleId: '5',
        brand: 'Tesla',
        model: 'Model 3',
        productionYear: 2026,
        fuelType: 'electric',
        carType: 'sedan',
        doors: 4,
        trunkCapacity: 561,
        color: 'blue',
        dailyPrice: 950,
        deposit: 3000,
    },
    {
        vehicleId: '6',
        brand: 'BMW',
        model: 'Series 3',
        productionYear: 2024,
        fuelType: 'gasoline',
        carType: 'sedan',
        doors: 4,
        trunkCapacity: 480,
        color: 'grey',
        dailyPrice: 1100,
        deposit: 4000,
    },
    {
        vehicleId: '7',
        brand: 'Hyundai',
        model: 'i20',
        productionYear: 2025,
        fuelType: 'gasoline',
        carType: 'hatchback',
        doors: 5,
        trunkCapacity: 352,
        color: 'red',
        dailyPrice: 380,
        deposit: 1200,
    },
    {
        vehicleId: '8',
        brand: 'Volvo',
        model: 'XC60',
        productionYear: 2025,
        fuelType: 'hybrid',
        carType: 'suv',
        doors: 5,
        trunkCapacity: 483,
        color: 'white',
        dailyPrice: 1200,
        deposit: 4500,
    },
    {
        vehicleId: '9',
        brand: 'Audi',
        model: 'A4',
        productionYear: 2024,
        fuelType: 'diesel',
        carType: 'estate',
        doors: 5,
        trunkCapacity: 495,
        color: 'black',
        dailyPrice: 900,
        deposit: 3500,
    },
    {
        vehicleId: '10',
        brand: 'Fiat',
        model: '500C',
        productionYear: 2025,
        fuelType: 'electric',
        carType: 'cabrio',
        doors: 2,
        trunkCapacity: 185,
        color: 'yellow',
        dailyPrice: 420,
        deposit: 1500,
    }

]