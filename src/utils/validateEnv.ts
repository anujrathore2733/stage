import { cleanEnv, port, str, bool } from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        
    });
}

export default validateEnv;
