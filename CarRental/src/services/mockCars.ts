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
    coordinates: {
        latitude: number;
        longitude: number; 
    }
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
        color: 'red',
        dailyPrice: 450,
        deposit: 1500,
        images: [
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/2020_Toyota_Yaris_Design_HEV_CVT_1.5_Front.jpg/960px-2020_Toyota_Yaris_Design_HEV_CVT_1.5_Front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/2020_Toyota_Yaris_Design_HEV_CVT_1.5_Rear.jpg/960px-2020_Toyota_Yaris_Design_HEV_CVT_1.5_Rear.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/The_interior_of_Toyota_YARIS_HYBRID_G_2WD_%286AA-MXPH10-AHXGB%29.jpg/960px-The_interior_of_Toyota_YARIS_HYBRID_G_2WD_%286AA-MXPH10-AHXGB%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
        ],
        coordinates: {
            latitude: 55.4025,
            longitude: 10.3875
        }
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
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/2020_Volkswagen_Golf_Style_1.5_Front.jpg/960px-2020_Volkswagen_Golf_Style_1.5_Front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/2020_Volkswagen_Golf_Style_1.5_Side.jpg/960px-2020_Volkswagen_Golf_Style_1.5_Side.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/2020_Volkswagen_Golf_Style_1.5_Rear.jpg/960px-2020_Volkswagen_Golf_Style_1.5_Rear.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Volkswagen_Golf_VIII_phase_2_%28int%C3%A9rieur%29.jpg/960px-Volkswagen_Golf_VIII_phase_2_%28int%C3%A9rieur%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
        ],
        coordinates: { 
            latitude: 55.3670, 
            longitude: 10.4280 
        }
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
        color: 'blue',
        dailyPrice: 650,
        deposit: 2000,
        images: [
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/2021_Skoda_Octavia_SE_First_Edition_TSi_e-TEC_SA_1.0_Front.jpg/960px-2021_Skoda_Octavia_SE_First_Edition_TSi_e-TEC_SA_1.0_Front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/2021_Skoda_Octavia_SE_First_Edition_TSi_e-TEC_SA_1.0_Rear.jpg/960px-2021_Skoda_Octavia_SE_First_Edition_TSi_e-TEC_SA_1.0_Rear.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Skoda_Octavia_IV_interior.jpg/960px-Skoda_Octavia_IV_interior.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
        ],
        coordinates: { 
            latitude: 55.3980, 
            longitude: 10.3920 
        }
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
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/2023_Kia_Sportage_X-Line_in_Jungle_Green%2C_Front_Right%2C_03-27-2022.jpg/960px-2023_Kia_Sportage_X-Line_in_Jungle_Green%2C_Front_Right%2C_03-27-2022.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Kia_Sportage_nova.jpg/960px-Kia_Sportage_nova.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/2023_Kia_Sportage_X-Line_in_Jungle_Green%2C_Rear_Right%2C_03-27-2022.jpg/960px-2023_Kia_Sportage_X-Line_in_Jungle_Green%2C_Rear_Right%2C_03-27-2022.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Kia_Sportage_Signature_NQ5_PE_Black_%282%29.jpg/960px-Kia_Sportage_Signature_NQ5_PE_Black_%282%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
        ],
        coordinates: { 
            latitude: 55.3820, 
            longitude: 10.4190 
        }
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
        color: 'white',
        dailyPrice: 950,
        deposit: 3000,
        images: [
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/2021_Tesla_Model_3%2C_front_11.10.21.jpg/960px-2021_Tesla_Model_3%2C_front_11.10.21.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/White_Tesla_Model_3_%28side%29.jpg/960px-White_Tesla_Model_3_%28side%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/2021_Tesla_Model_3%2C_rear_11.10.21.jpg/960px-2021_Tesla_Model_3%2C_rear_11.10.21.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Tesla_Model_3_interior.jpg/960px-Tesla_Model_3_interior.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
        ],
        coordinates: { 
            latitude: 55.3813, 
            longitude: 10.3725 
        }
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
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/2019_BMW_320d_xDrive_M_Sport_2.0_Front.jpg/960px-2019_BMW_320d_xDrive_M_Sport_2.0_Front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/2019_BMW_320d_xDrive_M_Sport_2.0_Rear.jpg/960px-2019_BMW_320d_xDrive_M_Sport_2.0_Rear.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/2019_BMW_320d_xDrive_M_Sport_2.0_Interior.jpg/960px-2019_BMW_320d_xDrive_M_Sport_2.0_Interior.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
        ],
        coordinates: { 
            latitude: 55.4038, 
            longitude: 10.3886 
        }
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
        color: 'white',
        dailyPrice: 380,
        deposit: 1200,
        images: [
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Hyundai_i20_%28BC3%29_IMG_3552.jpg/960px-Hyundai_i20_%28BC3%29_IMG_3552.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/Hyundai_i20_%28BC3%29_IMG_3542.jpg/960px-Hyundai_i20_%28BC3%29_IMG_3542.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Hyundai_i20_%28BC3%29_IMG_3541.jpg/960px-Hyundai_i20_%28BC3%29_IMG_3541.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/2020_Hyundai_i20_1.5_Asta_%28O%29_Diesel_%28India%29_interior.png/960px-2020_Hyundai_i20_1.5_Asta_%28O%29_Diesel_%28India%29_interior.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
        ],
        coordinates: {
            latitude: 55.4025,
            longitude: 10.3875
        }
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
        color: 'silver',
        dailyPrice: 1200,
        deposit: 4500,
        images: [
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/2018_Volvo_XC60_R-Design_D5_P-Pulse_2.0_Front.jpg/960px-2018_Volvo_XC60_R-Design_D5_P-Pulse_2.0_Front.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/2018_Volvo_XC60_R-Design_D5_P-Pulse_2.0_Rear.jpg/960px-2018_Volvo_XC60_R-Design_D5_P-Pulse_2.0_Rear.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/2017_Volvo_XC60_D4_R-Design_Automatic_2.0_Interior.jpg/960px-2017_Volvo_XC60_D4_R-Design_Automatic_2.0_Interior.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
        ],
        coordinates: { 
            latitude: 55.3813, 
            longitude: 10.3725 
        }
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
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/2023_Audi_A4_B9_Avant_Allroad_left_front_exterior_view.jpg/960px-2023_Audi_A4_B9_Avant_Allroad_left_front_exterior_view.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/2023_Audi_A4_B9_Avant_Allroad_-_left_side_view.jpg/960px-2023_Audi_A4_B9_Avant_Allroad_-_left_side_view.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/2023_Audi_A4_B9_Avant_Allroad_-_back_view.jpg/960px-2023_Audi_A4_B9_Avant_Allroad_-_back_view.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/2023_Audi_A4_B9_Avant_Allroad_-_Front_interior_view.jpg/960px-2023_Audi_A4_B9_Avant_Allroad_-_Front_interior_view.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
        ],
        coordinates: {
            latitude: 55.4025,
            longitude: 10.3875
        }
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
        color: 'grey',
        dailyPrice: 420,
        deposit: 1500,
        images: [
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/2018_Fiat_500c_Pop_in_Granito_Grey%2C_front_right%2C_2026-08-08.jpg/960px-2018_Fiat_500c_Pop_in_Granito_Grey%2C_front_right%2C_2026-08-08.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/2018_Fiat_500c_Pop_in_Granito_Grey%2C_rear_right%2C_2026-08-08.jpg/960px-2018_Fiat_500c_Pop_in_Granito_Grey%2C_rear_right%2C_2026-08-08.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
            'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Fiat_500C_-_Flickr_-_David_Villarreal_Fern%C3%A1ndez_%286%29.jpg/960px-Fiat_500C_-_Flickr_-_David_Villarreal_Fern%C3%A1ndez_%286%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
        ],
        coordinates: { 
            latitude: 55.3670, 
            longitude: 10.4280 
        }
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