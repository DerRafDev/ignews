import { useSession, signIn } from 'next-auth/client';
import { stripe } from '../../services/stripe';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [session] = useSession();

    function handleSubscribe() {
        //this is for see if the user is logged in
        if(!session) {
            signIn('github')
            return;
        }

        // creation of the session checkout
        

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