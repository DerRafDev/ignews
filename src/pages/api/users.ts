import { NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        {id: 1, name: 'Raf' },
        {id: 2, name: 'John' },
        {id: 3, name: 'Johnny' },
    ]

    return response.json(users);
}