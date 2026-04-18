import { toast as sonner } from 'sonner'

const successStyle = {
    background: '#1C2340',
    color: '#8B9DC3',
    border: '1px solid #2F3A67',
    fontFamily: 'var(--font-geist-mono)',
}

const errorStyle = {
    background: '#2D1515',
    color: '#C97B7B',
    border: '1px solid #4A1C1C',
    fontFamily: 'var(--font-geist-mono)',
}

export const toast = {
    success: (message: string) => sonner(message, { style: successStyle }),
    error: (message: string) => sonner.error(message, { style: errorStyle }),
}
