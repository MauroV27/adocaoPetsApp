import pkg from 'bcryptjs';

export async function hash( value ) {
    return await pkg.hash(value, 10);
}

export async function compare( value, hash ) {
    return await pkg.compare(value, hash);
}