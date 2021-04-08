import { GetStaticProps } from 'next';
import Head from 'next/head';
import { stripe } from '../components/services/stripe';

import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';


interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome!</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

//this is for getting the Stripe API in next.js
export const getStaticProps: GetStaticProps = async () => {
  //this is the API Id from the Product we created in Stripe
  const price = await stripe.prices.retrieve('price_1IdidlJ4fxCuj4z4G02MAYdd')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100), //this is because he come in cents;
  };

  return{
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
    //this is for the static HTML to dure 24 hours
  }
}