import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    console.log('received event')

    res.status(200).json({ ok: true })
}

//to start the event in stripe, go on cmd and write:
// stripe login
// stripe listen --forward-to localhost:3000/api/webhooks