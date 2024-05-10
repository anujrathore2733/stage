import { cleanEnv, port, str, bool } from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),

        GRPC_SERVER_PORT: port(),

        // for calculating checksum
        SECRET: str(),
        CHECKSUM_DISABLED: bool(),

        // aws
        AWS_ACCESS_KEY_ID: str(),
        AWS_SECRET_KEY: str(),
        AWS_REGION: str(),
        AWS_S3_BUCKET: str(),
        AWS_S3_UPLOAD_EXPIRY_TIME_SEC: str(),
        AWS_S3_DOWNLOAD_EXPIRY_TIME_SEC: str()
    });
}

export default validateEnv;
