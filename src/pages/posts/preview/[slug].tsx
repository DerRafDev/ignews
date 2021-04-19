import { GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";

import { getPrismicClient } from "../../../services/prismic";

import styles from '../post.module.scss';

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    const [session] = useSession();
    const router = useRouter();

    //this is to show this page just when the user didn't pay subscription
    useEffect(() => {
        if(session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session])


    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div 
                        className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{__html: post.content}} />
                </article>

                <div className={styles.continueReading}>
                    Wanna continue reading?
                    <Link href="/">
                        <a>Subscribe now 🤗</a>
                    </Link>
                </div>
            </main>
        </>
    );
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

//this is to get the content of the post
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params;

    const prismic = getPrismicClient()

    const response = await prismic.getByUID('publication', String(slug), {})

    //this is to format the post
    const post = {
        slug,
        title: RichText.asText(response.data.title),
        //this is to get only the 3 first items of the content
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long', 
            year: 'numeric'
        })
    };

    return {
        props: {
            post,
        },
        redirect: 60 * 30, // 30 minutes
    }
}