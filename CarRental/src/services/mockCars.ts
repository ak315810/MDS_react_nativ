import AsyncStorage from '@react-native-async-storage/async-storage';

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
    images: string[];
}

const defaultImages = [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3',
    'https://picsum.photos/400/300?random=4',
    'https://picsum.photos/400/300?random=5'
];

export const mockCars: Car[] = [
    {
        vehicleId: '1',
        brand: 'Toyota',
        model: 'Yaris',
        productionYear: 2025,
        fuelType: 'gasoline',
        carType: 'hatchback',
        doors: 4,
        trunkCapacity: 286,
        color: 'white',
        dailyPrice: 450,
        deposit: 1500,
        images: [
            'https://images.unsplash.com/photo-1749058983232-59b967855b18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG95b3RhJTIweWFyaXN8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1749058983469-11eaef8d7bc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dG95b3RhJTIweWFyaXN8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1749058983925-0cb49aec5d9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRveW90YSUyMHlhcmlzfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1693324199178-eb6414b0a688?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG95b3RhJTIweWFyaXMlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1597817229717-86b45ecac81a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRveW90YSUyMHlhcmlzJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D'
        ],
    },
    {
        vehicleId: '2',
        brand: 'Volkswagen',
        model: 'Golf',
        productionYear: 2024,
        fuelType: 'hybrid',
        carType: 'hatchback',
        doors: 4,
        trunkCapacity: 381,
        color: 'silver',
        dailyPrice: 600,
        deposit: 2000,
        images: [
            'https://images.unsplash.com/photo-1605475300127-0a31e8273bc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dm9sa3N3YWdlbiUyMGdvbGZ8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1563456162079-bdcab0fe5f2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHZvbGtzd2FnZW4lMjBnb2xmfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1624105310151-b84995c652cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dm9sa3N3YWdlbiUyMGdvbGYlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1714225417142-dbdad535071b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dm9sa3N3YWdlbiUyMGdvbGYlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1710956943069-86dce29496f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHZvbGtzd2FnZW4lMjBnb2xmJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D'
        ],
    },
    {
        vehicleId: '3',
        brand: 'Skoda',
        model: 'Octavia',
        productionYear: 2025,
        fuelType: 'diesel',
        carType: 'estate',
        doors: 4,
        trunkCapacity: 600,
        color: 'black',
        dailyPrice: 650,
        deposit: 2000,
        images: [
            'https://images.unsplash.com/photo-1635872179414-dde808df29c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2tvZGElMjBvY3RhdmlhJTIwYmxhY2t8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1629280433017-d84767d01eb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNrb2RhJTIwb2N0YXZpYXxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1606750957664-896c163bed2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNrb2RhJTIwb2N0YXZpYXxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1597770024370-6c23288ac2ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNrb2RhJTIwb2N0YXZpYXxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1630957403391-bb41bc4ad1fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHNrb2RhJTIwb2N0YXZpYXxlbnwwfHwwfHx8MA%3D%3D'
        ],
    },
    {
        vehicleId: '4',
        brand: 'Kia',
        model: 'Sportage',
        productionYear: 2025,
        fuelType: 'hybrid',
        carType: 'suv',
        doors: 4,
        trunkCapacity: 587,
        color: 'green',
        dailyPrice: 800,
        deposit: 2500,
        images: [
            'https://images.unsplash.com/photo-1738805569031-79d99addcecc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2lhJTIwc3BvcnRhZ2UlMjBncmVlbnxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1740377868668-12e8c8750402?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lhJTIwc3BvcnRhZ2UlMjBncmVlbnxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1654689289571-07f69459ae35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2lhJTIwc3BvcnRhZ2V8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1647292785376-7f326012a160?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGtpYSUyMHNwb3J0YWdlfGVufDB8fDB8fHww',
            'https://plus.unsplash.com/premium_photo-1694207208432-50a351ff6ae6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2lhJTIwaW50ZXJpb3J8ZW58MHx8MHx8fDA%3D'
        ],
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
        images: [
            'https://images.unsplash.com/photo-1788874266808-9fe11cf493e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRlc2xhJTIwbW9kZWwlMjAzJTIwYmx1ZXxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1767949374443-eb15e8895e20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVzbGElMjBtb2RlbCUyMDMlMjBibHVlfGVufDB8fDB8fHww',
            'https://plus.unsplash.com/premium_photo-1715726070346-2500ef1e0e63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVzbGElMjBtb2RlbCUyMDMlMjBibHVlfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1683617845344-d4714be2c305?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVzbGElMjBtb2RlbCUyMDMlMjBibHVlfGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1562178235-7ba56b202338?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVzbGElMjBtb2RlbCUyMDMlMjBibHVlfGVufDB8fDB8fHww'
        ],
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
        images: [
            'https://images.unsplash.com/photo-1734554275379-9600817f5655?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym13JTIwc2VyaWVzJTIwMyUyMGdyZXl8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1734554231314-5e999640b0fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym13JTIwc2VyaWVzJTIwMyUyMGdyZXl8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1734554268207-eda38a135bc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJtdyUyMHNlcmllcyUyMDMlMjBncmV5fGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1734554258108-63f09694fe88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJtdyUyMHNlcmllcyUyMDMlMjBncmV5fGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1734554238845-3665b2ce945a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJtdyUyMHNlcmllcyUyMDMlMjBncmV5fGVufDB8fDB8fHww'
        ],
    },
    {
        vehicleId: '7',
        brand: 'Hyundai',
        model: 'i20',
        productionYear: 2025,
        fuelType: 'gasoline',
        carType: 'hatchback',
        doors: 4,
        trunkCapacity: 352,
        color: 'red',
        dailyPrice: 380,
        deposit: 1200,
        images: [
            'https://images.unsplash.com/photo-1629709274075-daed63a1a642?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHl1bmRhaSUyMGkyMCUyMHJlZHxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1584126996504-1ab0026f42d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aHl1bmRhaSUyMGkyMCUyMHJlZHxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1713265774020-ab67ceef2d51?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGh5dW5kYWklMjBpMjB8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1644907961094-8852aca773d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGh5dW5kYWklMjBpMjB8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1576877873979-98028853cd9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGh5dW5kYWklMjBpMjB8ZW58MHx8MHx8fDA%3D'
        ],
    },
    {
        vehicleId: '8',
        brand: 'Volvo',
        model: 'XC60',
        productionYear: 2025,
        fuelType: 'hybrid',
        carType: 'suv',
        doors: 4,
        trunkCapacity: 483,
        color: 'white',
        dailyPrice: 1200,
        deposit: 4500,
        images: [
            'https://images.unsplash.com/photo-1597220457711-ba9917ed6c59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZvbHZvJTIweGM2MHxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1662128364478-e89fd638ad80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHZvbHZvJTIweGM2MHxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1644004481911-9746e5a73284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHZvbHZvJTIweGM2MHxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1601026968687-64ea4ba3c36f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHZvbHZvJTIweGM2MHxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1707290990298-7b5a4c85dc55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHZvbHZvJTIweGM2MHxlbnwwfHwwfHx8MA%3D%3D'
        ],
    },
    {
        vehicleId: '9',
        brand: 'Audi',
        model: 'A4',
        productionYear: 2024,
        fuelType: 'diesel',
        carType: 'estate',
        doors: 4,
        trunkCapacity: 495,
        color: 'black',
        dailyPrice: 900,
        deposit: 3500,
        images: [
            'https://images.unsplash.com/photo-1716167949676-2ad6f7c8365c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGF1ZGklMjBhNHxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1659031981099-00ecc60adf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGF1ZGklMjBhNHxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1668624711827-4f62b29dfb26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXVkaSUyMGE0fGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1710011115876-301113e1bb61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXVkaSUyMGE0fGVufDB8fDB8fHww',
            'https://images.unsplash.com/photo-1652509563476-99f7aa259b1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGF1ZGklMjBhNHxlbnwwfHwwfHx8MA%3D%3D'
        ],
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
        images: [
            'https://images.unsplash.com/photo-1553027578-a8a2b2b13329?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZpYXQlMjA1MDAlMjBjYWJyaW8lMjB5ZWxsb3d8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1779043507559-d3efd57e0da8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZpYXQlMjA1MDAlMjBjYWJyaW8lMjB5ZWxsb3d8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1672737936853-e47e1641ac40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZpYXQlMjA1MDAlMjBjYWJyaW8lMjB5ZWxsb3d8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1657713453481-52998321e771?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmlhdCUyMDUwMCUyMGNhYnJpbyUyMHllbGxvd3xlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1690413971712-56f30b01c2cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlhdCUyMDUwMCUyMGludGVyaW9yfGVufDB8fDB8fHww'
        ],
    }
];

const CACHE_KEY = '@cars_cache';

export const saveCarsToCache = async (cars: Car[]): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(cars);
        await AsyncStorage.setItem(CACHE_KEY, jsonValue);
    } catch (e) {
        console.error('Błąd zapisu bazy aut', e);
    }
};

export const getCarsFromCache = async (): Promise<Car[] | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem(CACHE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error('Błąd odczytu bazy aut', e);
        return null;
    }
};