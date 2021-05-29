import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

export function SubscribeButton() {
    const [session] = useSession();
    const router = useRouter();

    async function handleSubscribe() {
        //this is for see if the user is logged in
        if(!session) {
            signIn('github')
            return;
        }

        //same things as in [slug].tsx, see there to understand
        if (session.activeSubscription) {
            router.push('/posts');
            return;
        }

        // creation of the session checkout
        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await getStripeJs()

            stripe.redirectToCheckout({ sessionId })
        } catch (err) {
            alert(err.message);
        }

    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    );
}