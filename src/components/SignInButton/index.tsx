/*
    As the button will need to connect with github and he has state
    he will not be in header, but a different component
*/

import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/client'

import styles from './styles.module.scss';

export function SignInButton() {
    const [session] = useSession();

    return session ? (
        //this is for when the user is logged in his github
        <button 
            type="button"
            className={styles.signInButton}
            onClick={() => signOut()}
        >
            <FaGithub color="#04d361" />
            {session.user.name}
            < FiX color="#737380" className={styles.closeIcon} />
        </button>
    ) : (
        //this is if he is not logged
        <button 
            type="button"
            className={styles.signInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417" />
            Sign in with Github
        </button>
    );
}