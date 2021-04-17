import Prismic from '@prismicio/client'

//this is to the Prismic API
export function getPrismicClient(req?: unknown) {
    const prismic = Prismic.client(
        process.env.PRISMIC_ENDPOINT,
        {
            req,
            accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        }
    )

    return prismic;
}