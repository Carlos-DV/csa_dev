export const validStatus = (req: string) => {
    if (req === 'Abierto' || req === '4') {
        return '4'
    } else if (req === 'Cerrado' || req === '3') {
        return '3'
    } else if (req === 'Escalado' || req === '2') {
        return '2'
    } else if (req === 'Pausado' || req === '1') {
        return '1'
    }
}

export const validOrigin = (req: string) => {
    if (req === 'Email' || req === '2') {
        return '2'
    } else if (req === 'Computadora' || req === '2') {
        return '2'
    } else {
        return '1'
    }
}

export const validPriority = (req: string) => {
    if (req === 'Alta' || req === '3') {
        return '3'
    } else if (req === 'Media' || req === '2') {
        return '2'
    } else if (req === 'Baja' || req === '3') {
        return '1'
    } else {
        return '3'
    }
}