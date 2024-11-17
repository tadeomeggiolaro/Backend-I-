import { existsSync, readFileSync, writeFileSync } from 'fs';




const readJSON = (fileName) => {
    try {
        const filePath = './src/data/' + fileName
        const data = readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error al leer el archivo ${fileName}:`, error);
        throw error;
    }
};


const writeJSON = (fileName, data) => {
    try {
        const filePath = './src/data/' + fileName
        writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error al escribir en el archivo ${fileName}:`, error);
        throw error;
    }
};

export { readJSON, writeJSON };
