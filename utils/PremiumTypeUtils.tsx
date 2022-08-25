export enum PREMIUM_RANK {
    STARTER = 1,
    PREMIUM = 2,
    PREMIUM_PLUS = 3
}

export const PREMIUM_TYPES: PremiumType[] = [
    {
        productId: 'premium',
        label: 'Premium',
        price: 1800,
        durationString: 'month',
        priority: PREMIUM_RANK.PREMIUM,
        options: generateNumberArray(1, 12)
    },
    {
        productId: 'premium_plus',
        label: 'Premium+',
        price: 1800,
        durationString: 'week',
        priority: PREMIUM_RANK.PREMIUM_PLUS,
        options: generateNumberArray(1, 4)
    },
    {
        productId: 'starter_premium-day',
        label: 'Starter Premium (day)',
        price: 24,
        durationString: 'day',
        priority: PREMIUM_RANK.STARTER,
        options: generateNumberArray(1, 30)
    },
    {
        productId: 'starter_premium-week',
        label: 'Starter Premium (week)',
        price: 120,
        durationString: 'week',
        priority: PREMIUM_RANK.STARTER,
        options: generateNumberArray(1, 12)
    },
    {
        productId: 'starter_premium',
        label: 'Starter Premium (half year)',
        price: 1800,
        durationString: 'month',
        priority: PREMIUM_RANK.STARTER,
        options: [
            { value: 1, label: '6' },
            { value: 2, label: '12' }
        ]
    }
]

/**
 * Generates an array containing the numbers from (and including) start and end
 */
function generateNumberArray(start: number, end: number): number[] {
    return (Array(end - start + 1) as any).fill().map((_, idx) => start + idx)
}

export function getHighestPriorityPremiumProduct(premiumProducts: PremiumProduct[]) {
    let results = premiumProducts.map(product => {
        let type = getPremiumType(product)
        return {
            productSlug: product.productSlug,
            productId: type.productId,
            priority: type.priority
        }
    })

    let result = results.sort((a, b) => b.priority - a.priority)[0]
    return premiumProducts.find(product => product.productSlug === result.productSlug)
}

export function getPremiumType(product: PremiumProduct) {
    return [...PREMIUM_TYPES].sort((a, b) => b.productId.localeCompare(a.productId)).find(type => product.productSlug.startsWith(type.productId))
}

export function getPremiumTypeOptionValue(option: number | { label: string; value: number }) {
    return typeof option === 'number' ? option : option.value
}

export function getPremiumTypeOptionLabel(option: number | { label: string; value: number }) {
    return typeof option === 'number' ? option : option.label
}

export function hasHighEnoughPremium(products: PremiumProduct[], minPremiumType: PREMIUM_RANK) {
    let hasHighEnoughPremium = false
    products.forEach(product => {
        let type = getPremiumType(product)
        if (type.priority >= minPremiumType && product.expires > new Date()) {
            hasHighEnoughPremium = true
        }
    })
    return hasHighEnoughPremium
}
